import { Request, Response } from "express";
import Advisor from "../models/Advisor";
import Lead from "../models/Lead";

export const getAdvisors = async (
  req: Request,
  res: Response
) => {
  try {
    const advisors = await Advisor.find()
      .sort({ createdAt: -1 });

    res.json(advisors);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch advisors",
    });
  }
};

export const getActiveAdvisors = async (
  req: Request,
  res: Response
) => {
  try {
    const advisors = await Advisor.find({
      active: true,
    }).sort({
      currentLeadCount: 1,
    });

    res.json(advisors);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch active advisors",
    });
  }
};

export const getAdvisorById = async (
  req: Request,
  res: Response
) => {
  try {
    const advisor = await Advisor.findById(
      req.params.id
    );

    if (!advisor) {
      return res.status(404).json({
        message: "Advisor not found",
      });
    }

    res.json(advisor);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch advisor",
    });
  }
};

export const createAdvisor = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      name,
      email,
      phone,
      employeeId,
      specialization,
      maxLeads,
      active,
    } = req.body;

    if (
      !name ||
      !email ||
      !phone ||
      !employeeId
    ) {
      return res.status(400).json({
        message:
          "Name, email, phone and employee ID are required",
      });
    }

    const existingAdvisor =
      await Advisor.findOne({
        $or: [
          { email },
          { employeeId },
        ],
      });

    if (existingAdvisor) {
      return res.status(409).json({
        message:
          "Advisor email or employee ID already exists",
      });
    }

    const advisor =
      await Advisor.create({
        name,
        email,
        phone,
        employeeId,
        specialization,
        maxLeads:
          maxLeads !== undefined
            ? Number(maxLeads)
            : 20,
        active:
          active !== undefined
            ? active
            : true,
        currentLeadCount: 0,
      });

    res.status(201).json(advisor);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create advisor",
    });
  }
};

export const updateAdvisor = async (
  req: Request,
  res: Response
) => {
  try {
    const advisor =
      await Advisor.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!advisor) {
      return res.status(404).json({
        message: "Advisor not found",
      });
    }

    res.json(advisor);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update advisor",
    });
  }
};

export const deleteAdvisor = async (
  req: Request,
  res: Response
) => {
  try {
    const advisor =
      await Advisor.findById(
        req.params.id
      );

    if (!advisor) {
      return res.status(404).json({
        message: "Advisor not found",
      });
    }

    const assignedLeads =
      await Lead.countDocuments({
        "assignedAdvisor.advisorId":
          advisor._id,
      });

    if (assignedLeads > 0) {
      return res.status(400).json({
        message:
          "Cannot delete advisor with assigned leads. Deactivate the advisor instead.",
      });
    }

    await advisor.deleteOne();

    res.json({
      message:
        "Advisor deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete advisor",
    });
  }
};