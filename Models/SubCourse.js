import mongoose from "mongoose";

const SubCourseSchema = new mongoose.Schema(
  {
    subcoursetitle: {
      type: String,
      required: true,
    },
    subcoursenumber: {
      type: Number,
      required: true,
    },
    subcoursedescription: {
      type: String,
    },
    maincourseID: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export default mongoose.model("SubCourse", SubCourseSchema);
