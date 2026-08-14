import mongoose, { Document, Schema } from "mongoose";

export interface IAdvisor extends Document {
  name: string;
  email: string;
  phone: string;

  employeeId: string;

  specialization?: string;

  active: boolean;

  maxLeads: number;

  currentLeadCount: number;

  createdAt: Date;
  updatedAt: Date;
}

const advisorSchema = new Schema<IAdvisor>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    employeeId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    specialization: {
      type: String,
      trim: true,
    },

    active: {
      type: Boolean,
      default: true,
    },

    maxLeads: {
      type: Number,
      default: 20,
    },

    currentLeadCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Advisor = mongoose.model<IAdvisor>(
  "Advisor",
  advisorSchema
);

export default Advisor;