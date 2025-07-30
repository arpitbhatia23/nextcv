import mongoose, { Schema } from "mongoose";
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    resume: [
      {
        type: Schema.Types.ObjectId,
        ref: "resumes",
      },
    ],
    payments: [
      {
        type: Schema.Types.ObjectId,
        ref: "payments",
      },
    ],
    lastActive: {
      type: Date,
      default: Date.now,
    },
  },

  {
    timestamps: true,
  }
);

const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;
