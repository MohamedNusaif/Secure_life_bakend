import { Request, Response } from "express";
import Plan from "../models/Plan";

export const recommendPlans = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      age,
      annualIncome,
      desiredCoverage,
      policyTerm,
    } = req.body;

    if (
      age === undefined ||
      annualIncome === undefined ||
      desiredCoverage === undefined ||
      policyTerm === undefined
    ) {
      return res.status(400).json({
        message:
          "Age, annual income, desired coverage and policy term are required",
      });
    }

    const plans = await Plan.find({
      active: true,
    });

    const eligiblePlans = plans.filter((plan) => {
      const eligibility =
        plan.eligibility;

      const ageEligible =
        age >= eligibility.minAge &&
        age <= eligibility.maxAge;

      const incomeEligible =
        annualIncome >=
        eligibility.minAnnualIncome &&
        (eligibility.maxAnnualIncome ===
          undefined ||
          annualIncome <=
            eligibility.maxAnnualIncome);

      const coverageEligible =
        desiredCoverage >=
          eligibility.minCoverage &&
        desiredCoverage <=
          eligibility.maxCoverage;

      const termEligible =
        policyTerm >=
          plan.policyTerm.min &&
        policyTerm <=
          plan.policyTerm.max;

      return (
        ageEligible &&
        incomeEligible &&
        coverageEligible &&
        termEligible
      );
    });

    res.json({
      customer: {
        age,
        annualIncome,
        desiredCoverage,
        policyTerm,
      },

      count: eligiblePlans.length,

      recommendations: eligiblePlans,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message:
        "Failed to recommend insurance plans",
    });
  }
};