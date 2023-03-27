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
    videocaptions: {
      type: String,
    },
    subcourseID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCourse",
    },
  },
  { timestamps: true }
);
export default mongoose.model("SubCoursecontent", SubCourseContentsSchema);
