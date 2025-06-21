import mongoose, { Schema } from "mongoose";
const couponSchema = new Schema(
  {
    coupounCode: {
      type: String,
      reqrired: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    expriy: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Coupon =
  mongoose.models.coupons || mongoose.model("coupons", couponSchema);

export default Coupon;
