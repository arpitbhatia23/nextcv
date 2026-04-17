import mongoose, { Schema } from "mongoose";

const paymentSchema = new Schema(
  {
    merchantOrderId: {
      type: String,
      unique: true,
      required: true,
    },
    transcationId: {
      type: String,
    },

    resumeId: {
      type: Schema.Types.ObjectId,
      ref: "resumes",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    resumeId: {
      type: Schema.Types.ObjectId,
      ref: "resumes",
      required: true,
    },
    paymentMode: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
    },
    couponCode: {
      type: String,
      required: false,
      lowercase: true,
    },
    discountAmount: {
      type: Number,
      required: false,
    },
    status: {
      type: String,
      enum: ["PENDING", "FAILED", "SUCCESS"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);
paymentSchema.index({ couponCode: 1, userId: 1 });
const Payment = mongoose.models.payments || mongoose.model("payments", paymentSchema);
export default Payment;
