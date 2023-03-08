import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema(
  {
    sessiontype: {
      type: String,
      required: true,
    },
    startTime: {
      type: Number,
      required: true,
    },
    endTime: {
      type: Number,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    subscriber: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  { timestamps: true }
);
export default mongoose.model("session", SessionSchema);
