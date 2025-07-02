import { asyncHandler } from "@/utils/asyncHandler";
import Coupon from "@/models/coupon";
import apiError from "@/utils/apiError";
import { getServerSession } from "next-auth";
import authOptions from "../../auth/options";
import { NextResponse } from "next/server";
import { apiResponse } from "@/utils/apiResponse";
import dbConnect from "@/utils/dbConnect";


const handler = async(req)=>{
    await dbConnect();
     const {couponCode , discount,expiry} =await req.json();
     if([couponCode,discount,expiry].some((field)=> field?.trim()==="")){
        throw new apiError(400,"all fields are required");
     }
const existingcouponcode = await Coupon.findOne({
    couponCode:couponCode
});
if(existingcouponcode){
    throw new apiError(400,"coupon code already exist")
}

const session = getServerSession(authOptions);
if(!session && !session.user){
throw new apiError(401,"unauthorised user")
}

if(session.user.role!=="admin"){
    throw new apiError(401,"only admin can perform this action")
}

const newcoupon  = await Coupon.create({
    couponCode:couponCode,
    discount:discount,
    expiry:expiry
})
if (!newcoupon){
    throw new apiError(500,"failed to create coupon")
}

return NextResponse.json(new apiResponse(201,"coupon added sucessfully"),{
    status:201
})
}
export const POST = asyncHandler(handler);