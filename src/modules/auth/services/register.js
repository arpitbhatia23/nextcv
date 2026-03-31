import bcrypt from "bcryptjs";
import User from "../models/user.model";
import { apiError } from "@/shared";

export const register = async data => {
  const { name, email, password, role } = data;
  if ([name, email, password].some(field => field.trim() === "")) {
    throw new apiError(400, "all fields are required");
  }

  const existeduser = await User.findOne({ email: email });
  if (existeduser) {
    throw new apiError(400, "user is already exits");
  }
  const hashpassword = await bcrypt.hash(password, 10);
  const newuser = await User.create({
    name: name,
    email: email,
    password: hashpassword,
    role: role || "user",
  });
  if (!newuser) {
    throw new apiError(500, "something went wrong while registering user");
  }
  return;
};
