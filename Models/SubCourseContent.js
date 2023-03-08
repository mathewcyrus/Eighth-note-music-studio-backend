import mongoose from "mongoose";

const SubCourseContentsSchema = new mongoose.Schema(
  {
    contenttitle: {
      type: String,
      required: true,
    },
    videourl: {
      type: String,
      required: true,
    },
    captions: {
      type: String,
    },
  },
  { timestamps: true }
);
export default mongoose.model("SubCoursecontent", SubCourseContentsSchema);
