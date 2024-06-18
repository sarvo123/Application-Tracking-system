import Application from "../models/Application.model.js";
import JobPost from "../models/Jobpost.model.js";

// apply for job ...
export const applyJob = async (req, res) => {
  const { jobId, resume, r1Responses } = req.body;
  const application = new Application({
    candidateId: req.user._id,
    jobId,
    resume,
    r1Responses,
  });
  await application.save();
  return res.status(201).json({
    _id: application._id,
    jobId: application.jobId,
    resume: application.resume,
    r1Responses: application.r1Responses,
  });
};

// get appliicattion ...
export const getApplications = async (req, res) => {
  try {
    const applications = await Application.find({ recruiterId: req.user._id });
    return res.json(applications);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Review Applications ...
export const reviewApplication = async (req, res) => {
  try {
    const { r2Responses } = req.body;
    const application = await Application.findById(req.params.id);
    if (application) {
      application.r2Responses = r2Responses;
      await application.save();
      return res.json(application);
    } else {
      return res.status(404).json({ message: "Application not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


// shortlist candidate  ...

export const shortlistCandidate = async(req , res)=>{
    try{
        const application = await Application.findById(req.params.id);
        if(application){
            application.shortlisted = true;
            await application.save();
            return res.status(400).json({message : "Candidate shortlisted !"});
        }else{
             return res.status(404).json({message : 'Application not found !'});
        }
    }catch(error){
        return res.status(500).json({error : error.message});
    }
};