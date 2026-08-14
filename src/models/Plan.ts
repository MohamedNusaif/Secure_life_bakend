import mongoose, { Document, Schema } from "mongoose";

export interface IPlan extends Document {
  name: string;
  description: string;

  benefits: string[];

  eligibility: {
    minAge: number;
    maxAge: number;
    minCoverage: number;
    maxCoverage: number;
    minAnnualIncome: number;
    maxAnnualIncome?: number;
  };

  premium: {
    monthly: number;
    yearly: number;
  };

  policyTerm: {
    min: number;
    max: number;
  };

  active: boolean;

  createdAt: Date;
  updatedAt: Date;
}

const planSchema = new Schema<IPlan>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    benefits: {
      type: [String],
      required: true,
      default: [],
    },

    eligibility: {
      minAge: {
        type: Number,
        required: true,
        min: 18,
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

      minAnnualIncome: {
        type: Number,
        required: true,
      },

      maxAnnualIncome: {
        type: Number,
      },
    },

    premium: {
      monthly: {
        type: Number,
        required: true,
      },

      yearly: {
        type: Number,
        required: true,
      },
    },

    policyTerm: {
      min: {
        type: Number,
        required: true,
      },

      max: {
        type: Number,
        required: true,
      },
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

const Plan = mongoose.model<IPlan>(
  "Plan",
  planSchema
);

export default Plan;