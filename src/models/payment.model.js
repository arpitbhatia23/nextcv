import mongoose, { Schema, Types } from "mongoose";

const paymentSchema = new Schema(
  {
    transcationId: {
      type: String,
      required: true,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    paymentMode: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    couponCode: {
      type: String,
      required: false,
    },
    discountAmount: {
      type: Number,
      required: false,
    },
    status: {
      type: String,
      default: "complete",
    },
  },
  { timestamps: true },
);
paymentSchema.index({ couponCode: 1, userId: 1 });
const Payment =
  mongoose.models.payments || mongoose.model("payments", paymentSchema);
export default Payment;
