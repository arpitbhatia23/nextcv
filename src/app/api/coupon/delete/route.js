import { getServerSession } from "next-auth";
import authOptions from "../../auth/options";
import apiError from "@/utils/apiError";
import Coupon from "@/models/coupon";
import { NextResponse } from "next/server";
import { apiResponse } from "@/utils/apiResponse";
import { asyncHandler } from "@/utils/asyncHandler";
import dbConnect from "@/utils/dbConnect";
const handler = async (req,{params})=>{
    await dbConnect();
    const { id } = await params;
    const session = await getServerSession(authOptions) 
    if(!session && !session.user){
        throw new apiError(401,"unauthorized request")
    }
    if(session.user.role!=="admin"){
        throw new apiError(401,"only admin can delete the coupon")
    }
const couponId = await Coupon.findById(id)
if(!couponId){
    throw new apiError(404,"coupon not found")
}
const deletedCoupon = await Coupon.findByIdAndDelete(id)
if(!deletedCoupon){
    throw new apiError(500,"failed to delete coupon")
}
 return NextResponse.json(new apiResponse(200,
    "coupon deleted successfully"
 ),{ status:200,})

}
export const DELETE = asyncHandler(handler)