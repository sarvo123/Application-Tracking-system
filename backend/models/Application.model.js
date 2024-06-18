import mongoose from "mongoose";

const applicationSchema = mongoose.Schema({
  candidateId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "JobPost" },
  resume: { type: String, required: true },
  r1Responses: [{ question: String, answer: Boolean }],
  r2Responses: [{ question: String, answer: Boolean }],
  shortlisted: { type: Boolean, default: false },
},{timestamp : true});

const Application = mongoose.model("Application" , applicationSchema);
export default Application ; 
