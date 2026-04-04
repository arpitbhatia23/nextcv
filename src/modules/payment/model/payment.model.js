import mongoose, { Schema } from "mongoose";

const paymentSchema = new Schema(
  {
    merchantOrderID: {
      type: String,
      unique: true,
      sprase: true,
    },
    transcationId: {
      type: String,
      unique: true,
      sprase: true,
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
      enum: ["PENDING", "SUCCESS", "FAILED"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);
paymentSchema.index({ couponCode: 1, userId: 1 });
const Payment = mongoose.models.payments || mongoose.model("payments", paymentSchema);
export default Payment;
