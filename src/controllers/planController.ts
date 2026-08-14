import { Request, Response } from "express";
import Plan from "../models/Plan";

export const getPlans = async (
  req: Request,
  res: Response
) => {
  try {
    const plans = await Plan.find()
      .sort({ createdAt: -1 });

    res.json(plans);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch insurance plans",
    });
  }
};

export const getActivePlans = async (
  req: Request,
  res: Response
) => {
  try {
    const plans = await Plan.find({
      active: true,
    }).sort({ premium: 1 });

    res.json(plans);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch active plans",
    });
  }
};

export const getPlanById = async (
  req: Request,
  res: Response
) => {
  try {
    const plan = await Plan.findById(
      req.params.id
    );

    if (!plan) {
      return res.status(404).json({
        message: "Plan not found",
      });
    }

    res.json(plan);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch plan",
    });
  }
};

export const createPlan = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      name,
      description,
      benefits,
      eligibility,
      premium,
      policyTerm,
      active,
    } = req.body;

    if (
      !name ||
      !description ||
      !benefits ||
      !eligibility ||
      !premium ||
      !policyTerm
    ) {
      return res.status(400).json({
        message:
          "All required plan fields must be provided",
      });
    }

    const existingPlan = await Plan.findOne({
      name,
    });

    if (existingPlan) {
      return res.status(409).json({
        message: "A plan with this name already exists",
      });
    }

    const plan = await Plan.create({
      name,
      description,
      benefits,
      eligibility,
      premium,
      policyTerm,
      active:
        active !== undefined ? active : true,
    });

    res.status(201).json(plan);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create insurance plan",
    });
  }
};

export const updatePlan = async (
  req: Request,
  res: Response
) => {
  try {
    const plan = await Plan.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!plan) {
      return res.status(404).json({
        message: "Plan not found",
      });
    }

    res.json(plan);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update insurance plan",
    });
  }
};

export const deletePlan = async (
  req: Request,
  res: Response
) => {
  try {
    const plan = await Plan.findByIdAndDelete(
      req.params.id
    );

    if (!plan) {
      return res.status(404).json({
        message: "Plan not found",
      });
    }

    res.json({
      message: "Plan deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete insurance plan",
    });
  }
};