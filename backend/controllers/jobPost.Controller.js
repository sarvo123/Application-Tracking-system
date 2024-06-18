import JobPost from "../models/Jobpost.model.js";

// creating the jobpost ...
export const createJobPost = async (req, res) => {
  try {
    const { title, location, salary, responsibilities, r1Check } = req.body;
    if (!title || !location || !salary || !responsibilities || !r1Check) {
      return res.status(400).json({ error: "Please fill all the fields ." });
    }
    const jobPost = new JobPost({
      title,
      location,
      salary,
      responsibilities,
      r1Check,
      coordinatorId: req.user._id,
    });
    await jobPost.save();

    // response json payload ...
    return res.status(201).json({
      _id: jobPost._id,
      title: jobPost.title,
      location: jobPost.location,
      salary: jobPost.salary,
      responsibilities: jobPost.responsibilities,
      coordinatorId: jobPost.coordinatorId,
    });
  } catch (error) {
    console.log("Error in createJobPost controller ", error.message);
    return res.status(500).json({ error: error.message });
  }
};

// fetch all jobPost ...
export const getJobPosts = async (req, res) => {
  try {
    const jobPosts = await JobPost.find({ posted: true });
    if (jobPosts) {
      res.json(jobPosts);
    } else {
      return res.status(400).json({ error: "there is no any jobposting !" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// approve jobpost ...
export const approveJobPost = async (req, res) => {
  try {
    const jobPost = await JobPost.findById(req.params.id);
    if (jobPost) {
      jobPost.posted = true;
      await jobPost.save();
      res.json({ message: "Job post approved and live ." });
    } else {
      res.status(404).json({ message: "Job post not found !" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// assignRecruiter ...
export const assignRecruiters = async (req, res) => {
  try {
    const jobPost = await JobPost.findById(req.params.id);
    if (jobPost) {
      jobPost.recruiterIds = req.body.recruiterIds;
      await jobPost.save();
      res.json({ message: "Recruiters assigned " });
    } else {
      res.status(404).json({ message: "Job post not found !" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
