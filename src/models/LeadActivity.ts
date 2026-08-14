import mongoose, { Schema, Document } from "mongoose";

export type ActivityType =
  | "CALL"
  | "EMAIL"
  | "MEETING"
  | "NOTE"
  | "STATUS_CHANGE";

export interface ILeadActivity extends Document {
  lead: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  type: ActivityType;
  description: string;
  createdAt: Date;
}

const leadActivitySchema = new Schema<ILeadActivity>(
  {
    lead: {
      type: Schema.Types.ObjectId,
      ref: "Lead",
      required: true,
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    type: {
      type: String,
      enum: ["CALL", "EMAIL", "MEETING", "NOTE", "STATUS_CHANGE"],
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ILeadActivity>(
  "LeadActivity",
  leadActivitySchema
);