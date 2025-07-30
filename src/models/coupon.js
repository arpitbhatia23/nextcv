import mongoose, { Schema } from "mongoose";
const couponSchema = new Schema(
  {
    couponCode: {
      type: String,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    expiry: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Coupon = mongoose.models.Coupon || mongoose.model("Coupon", couponSchema);
export default Coupon;
