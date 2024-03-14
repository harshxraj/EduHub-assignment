import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "student",
      enum: ["admin", "student"],
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    student_code: {
      type: String,
    },
    courses: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Course",
      default: [],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
