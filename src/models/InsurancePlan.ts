import mongoose, { Document, Schema } from "mongoose";

export interface IInsurancePlan extends Document {
  name: string;
  description: string;
  benefits: string[];

  minAge: number;
  maxAge: number;

  minCoverage: number;
  maxCoverage: number;

  minPremium: number;
  maxPremium: number;

  minTerm: number;
  maxTerm: number;

  active: boolean;

  createdAt: Date;
  updatedAt: Date;
}

const insurancePlanSchema = new Schema<IInsurancePlan>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    benefits: {
      type: [String],
      default: [],
    },

    minAge: {
      type: Number,
      required: true,
    },

    maxAge: {
      type: Number,
      required: true,
    },

    minCoverage: {
      type: Number,
      required: true,
    },

    maxCoverage: {
      type: Number,
      required: true,
    },

    minPremium: {
      type: Number,
      required: true,
    },

    maxPremium: {
      type: Number,
      required: true,
    },

    minTerm: {
      type: Number,
      required: true,
    },

    maxTerm: {
      type: Number,
      required: true,
    },

    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IInsurancePlan>(
  "InsurancePlan",
  insurancePlanSchema
);