import mongoose from "mongoose";

const SubCourseSchema = new mongoose.Schema(
  {
    subcoursetitle: {
      type: String,
      required: true,
    },
    subcoursenumber: {
      type: String,
      required: true,
    },
    subcourseContents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubcourseContent",
      },
    ],
  },
  { timestamps: true }
);
export default mongoose.model("SubCourse", SubCourseSchema);
