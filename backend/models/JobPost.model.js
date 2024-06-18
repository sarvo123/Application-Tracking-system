import mongoose from "mongoose";

const jobPostSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    location: { type: String, required: true },
    salary: { type: String, required: true },
    responsibilities: { type: String, required: true },
    r1Check: [{ question: String, answer: Boolean }],
    coordinatorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    recruiterIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    posted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const JobPost = mongoose.model("JobPost", jobPostSchema);
export default JobPost;
