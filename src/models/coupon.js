import mongoose, { Schema } from "mongoose";
const couponSchema = new Schema(
  {
    couponCode: {
      type: String,
      reqrired: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    expiry: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Coupon =
  mongoose.models.coupons || mongoose.model("coupons", couponSchema);

export default Coupon;
