import mongoose, { Document, Schema } from "mongoose";

export type LeadStatus =
  | "NEW"
  | "CONTACTED"
  | "QUALIFIED"
  | "PROPOSAL"
  | "CONVERTED"
  | "LOST";

export interface ILead extends Document {
  name: string;
  email: string;
  phone: string;

  dateOfBirth?: Date;
  occupation?: string;
  annualIncome?: number;

  desiredCoverage: number;
  policyTerm: number;

  status: LeadStatus;
  source: string;

  assignedAdvisor?: mongoose.Types.ObjectId;
  selectedPlan?: mongoose.Types.ObjectId;
  recommendedPlan?: mongoose.Types.ObjectId;

  createdAt: Date;
  updatedAt: Date;
}

const leadSchema = new Schema<ILead>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    dateOfBirth: Date,

    occupation: String,

    annualIncome: Number,

    desiredCoverage: {
      type: Number,
      required: true,
    },

    policyTerm: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "NEW",
        "CONTACTED",
        "QUALIFIED",
        "PROPOSAL",
        "CONVERTED",
        "LOST",
      ],
      default: "NEW",
    },

    source: {
      type: String,
      default: "WEBSITE",
    },

    assignedAdvisor: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    selectedPlan: {
      type: Schema.Types.ObjectId,
      ref: "InsurancePlan",
    },

    recommendedPlan: {
      type: Schema.Types.ObjectId,
      ref: "InsurancePlan",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ILead>("Lead", leadSchema);