import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema(
  {
    coursename: {
      type: String,
      required: true,
    },
    enrolledstudents: {
      type: Number,
      required: true,
    },
    courseprice: {
      type: Number,
      required: true,
    },
    courseimage: {
      type: Number,
      required: true,
    },
    subcourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subcourse",
      },
    ],
  },
  { timestamps: true }
);
export default mongoose.model("Course", CourseSchema);
