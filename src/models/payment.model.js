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
  },
  { timestamps: true }
);

const Payment =
  mongoose.models.Payments || mongoose.model("payments", paymentSchema);
export default Payment;
