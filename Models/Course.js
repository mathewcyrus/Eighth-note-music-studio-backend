import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema(
  {
    coursename: {
      type: String,
      required: true,
    },
    enrolledstudents: {
      type: Number,
    },
    courseprice: {
      type: Number,
      required: true,
    },
    courseimage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export default mongoose.model("Course", CourseSchema);
