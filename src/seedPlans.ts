import mongoose from "mongoose";
import dotenv from "dotenv";
import Plan from "./models/Plan";

dotenv.config();

const plans = [
  {
    name: "Basic",
    description:
      "Affordable life protection for individuals and young families.",

    benefits: [
      "Life coverage",
      "Affordable monthly premium",
      "Basic critical illness protection",
      "Flexible policy term",
    ],

    eligibility: {
      minAge: 18,
      maxAge: 55,
      minCoverage: 1000000,
      maxCoverage: 5000000,
      minAnnualIncome: 300000,
      maxAnnualIncome: 5000000,
    },

    premium: {
      monthly: 5000,
      yearly: 60000,
    },

    policyTerm: {
      min: 5,
      max: 20,
    },

    active: true,
  },

  {
    name: "Gold",
    description:
      "Enhanced life protection with higher coverage and additional benefits.",

    benefits: [
      "Higher life coverage",
      "Critical illness protection",
      "Family protection",
      "Premium flexibility",
      "Accidental death benefit",
    ],

    eligibility: {
      minAge: 21,
      maxAge: 60,
      minCoverage: 5000000,
      maxCoverage: 15000000,
      minAnnualIncome: 600000,
      maxAnnualIncome: 15000000,
    },

    premium: {
      monthly: 12000,
      yearly: 144000,
    },

    policyTerm: {
      min: 10,
      max: 30,
    },

    active: true,
  },

  {
    name: "Premium",
    description:
      "Comprehensive protection for customers seeking maximum coverage and benefits.",

    benefits: [
      "Maximum life coverage",
      "Comprehensive critical illness protection",
      "Family income protection",
      "Premium waiver options",
      "Accidental death benefit",
      "Long-term financial protection",
    ],

    eligibility: {
      minAge: 25,
      maxAge: 65,
      minCoverage: 15000000,
      maxCoverage: 50000000,
      minAnnualIncome: 1500000,
      maxAnnualIncome: 100000000,
    },

    premium: {
      monthly: 30000,
      yearly: 360000,
    },

    policyTerm: {
      min: 15,
      max: 40,
    },

    active: true,
  },
];

async function seed() {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI!
    );

    console.log("MongoDB connected");

    await Plan.deleteMany({});

    await Plan.insertMany(plans);

    console.log(
      "Insurance plans inserted successfully"
    );

    await mongoose.disconnect();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seed();