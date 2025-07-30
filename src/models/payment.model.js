import mongoose, { Schema } from "mongoose";

const paymentSchema = new Schema(
  {
    transcationId: {
      type: String,
      required: true,
    },

    paymentMode: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: String,
    },
    status: {
      type: String,
      default: "complete",
    },
  },
  { timestamps: true }
);

const Payment =
  mongoose.models.payments || mongoose.model("payments", paymentSchema);
export default Payment;
