import { Request, Response } from "express";
import Lead from "../models/Lead";
import InsurancePlan from "../models/InsurancePlan";
import User from "../models/User";
import LeadActivity from "../models/LeadActivity";
import { AuthRequest } from "../middleware/auth.middleware";

export const createLead = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      name,
      email,
      phone,
      dateOfBirth,
      occupation,
      annualIncome,
      desiredCoverage,
      policyTerm,
    } = req.body;

    if (
      !name ||
      !email ||
      !phone ||
      !desiredCoverage ||
      !policyTerm
    ) {
      res.status(400).json({
        message: "Required fields are missing",
      });
      return;
    }

    const plans = await InsurancePlan.find({
      active: true,
    });

    let recommendedPlan = null;

    let age: number | null = null;

    if (dateOfBirth) {
      const birthDate = new Date(dateOfBirth);
      const today = new Date();

      age = today.getFullYear() - birthDate.getFullYear();

      const monthDifference =
        today.getMonth() - birthDate.getMonth();

      if (
        monthDifference < 0 ||
        (monthDifference === 0 &&
          today.getDate() < birthDate.getDate())
      ) {
        age--;
      }
    }

    if (age !== null) {
      recommendedPlan =
        plans.find(
          (plan) =>
            age! >= plan.minAge &&
            age! <= plan.maxAge &&
            desiredCoverage >= plan.minCoverage &&
            desiredCoverage <= plan.maxCoverage &&
            policyTerm >= plan.minTerm &&
            policyTerm <= plan.maxTerm
        ) || null;
    }

    const lead = await Lead.create({
      name,
      email,
      phone,
      dateOfBirth,
      occupation,
      annualIncome,
      desiredCoverage,
      policyTerm,
      source: "WEBSITE",
      recommendedPlan: recommendedPlan?._id,
    });

    res.status(201).json({
      message: "Lead created successfully",
      lead: {
        id: lead._id,
        name: lead.name,
        status: lead.status,
      },
      recommendedPlan: recommendedPlan
        ? {
            id: recommendedPlan._id,
            name: recommendedPlan.name,
          }
        : null,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create lead",
    });
  }
};

export const getLeads = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const leads = await Lead.find()
      .populate("assignedAdvisor", "name email")
      .populate("recommendedPlan", "name")
      .sort({ createdAt: -1 });

    res.json(leads);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch leads",
    });
  }
};

export const getLeadById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const lead = await Lead.findById(req.params.id)
      .populate("assignedAdvisor", "name email")
      .populate("recommendedPlan")
      .populate("selectedPlan");

    if (!lead) {
      res.status(404).json({
        message: "Lead not found",
      });
      return;
    }

    res.json(lead);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch lead",
    });
  }
};

//get all advisors
export const getAdvisors = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const advisors = await User.find({
      role: "ADVISOR",
    }).select("-password");

    res.json(advisors);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch advisors",
    });
  }
};

//assing advisor
export const assignAdvisor = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { advisorId } = req.body;

    if (!advisorId) {
      res.status(400).json({
        message: "Advisor ID is required",
      });
      return;
    }

    const advisor = await User.findOne({
      _id: advisorId,
      role: "ADVISOR",
    });

    if (!advisor) {
      res.status(404).json({
        message: "Advisor not found",
      });
      return;
    }

    const lead = await Lead.findById(id);

    if (!lead) {
      res.status(404).json({
        message: "Lead not found",
      });
      return;
    }

    lead.assignedAdvisor = advisor._id;

    await lead.save();

    if (req.user) {
      await LeadActivity.create({
        lead: lead._id,
        user: req.user.userId,
        type: "NOTE",
        description: `Lead assigned to advisor ${advisor.name}`,
      });
    }

    const updatedLead = await Lead.findById(lead._id)
      .populate("assignedAdvisor", "name email role")
      .populate("recommendedPlan", "name");

    res.json({
      message: "Advisor assigned successfully",
      lead: updatedLead,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to assign advisor",
    });
  }
};

//update lead status
export const updateLeadStatus = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = [
      "NEW",
      "CONTACTED",
      "QUALIFIED",
      "PROPOSAL",
      "CONVERTED",
      "LOST",
    ];

    if (!validStatuses.includes(status)) {
      res.status(400).json({
        message: "Invalid lead status",
      });
      return;
    }

    const lead = await Lead.findById(id);

    if (!lead) {
      res.status(404).json({
        message: "Lead not found",
      });
      return;
    }

    const oldStatus = lead.status;

    lead.status = status;

    await lead.save();

    if (req.user) {
      await LeadActivity.create({
        lead: lead._id,
        user: req.user.userId,
        type: "STATUS_CHANGE",
        description: `Lead status changed from ${oldStatus} to ${status}`,
      });
    }

    const updatedLead = await Lead.findById(lead._id)
      .populate("assignedAdvisor", "name email")
      .populate("recommendedPlan", "name");

    res.json({
      message: "Lead status updated successfully",
      lead: updatedLead,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update lead status",
    });
  }
};

//add lead activity
export const addLeadActivity = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { type, description } = req.body;

    const validTypes = [
      "CALL",
      "EMAIL",
      "MEETING",
      "NOTE",
      "STATUS_CHANGE",
    ];

    if (!validTypes.includes(type)) {
      res.status(400).json({
        message: "Invalid activity type",
      });
      return;
    }

    if (!description) {
      res.status(400).json({
        message: "Activity description is required",
      });
      return;
    }

    const lead = await Lead.findById(id);

    if (!lead) {
      res.status(404).json({
        message: "Lead not found",
      });
      return;
    }

    if (!req.user) {
      res.status(401).json({
        message: "Authentication required",
      });
      return;
    }

    const activity = await LeadActivity.create({
      lead: lead._id,
      user: req.user.userId,
      type,
      description,
    });

    const populatedActivity =
      await LeadActivity.findById(activity._id)
        .populate("user", "name email role");

    res.status(201).json({
      message: "Activity added successfully",
      activity: populatedActivity,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to add activity",
    });
  }
};

//get lead acivity
export const getLeadActivities = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const lead = await Lead.findById(id);

    if (!lead) {
      res.status(404).json({
        message: "Lead not found",
      });
      return;
    }

    const activities = await LeadActivity.find({
      lead: id,
    })
      .populate("user", "name email role")
      .sort({ createdAt: -1 });

    res.json(activities);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch activities",
    });
  }
};