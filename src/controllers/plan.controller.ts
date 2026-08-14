import { Request, Response } from "express";
import InsurancePlan from "../models/InsurancePlan";


export const getPlans = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const plans = await InsurancePlan.find({
      active: true,
    }).sort({ minCoverage: 1 });

    res.json(plans);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch plans",
    });
  }
};

export const createPlan = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const plan = await InsurancePlan.create(req.body);

    res.status(201).json(plan);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create plan",
    });
  }
};

export const deletePlan = async (
  req: Request,
  res: Response
) => {
  try {
    const plan = await InsurancePlan.findByIdAndDelete(
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