import Application from "../models/Application.model.js";
import JobPost from "../models/Jobpost.model.js";

// apply for job ...
export const applyJob = async (req, res) => {
  try {
    const { jobId, name, email, r1Responses } = req.body;
    const resume = req.file;

    // Ensure that all required fields are present
    if (!jobId || !name || !email || !r1Responses || !resume) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Create a new application instance
    const application = new Application({
      candidateId: req.user._id,
      jobId,
      name,
      email,
      resumePath: resume.path, // Save the file path
      r1Responses,
    });

    // Save the application to the database
    await application.save();

    // Return the created application data
    return res.status(201).json({
      _id: application._id,
      jobId: application.jobId,
      resumePath: application.resumePath,
      r1Responses: application.r1Responses,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


// get appliicattion ...
export const getApplications = async (req, res) => {
  try {
    // Check if the user has the Recruiter role
    if (req.user.role !== 'Recruiter') {
      return res.status(403).json({ error: "Access denied. Recruiter role required." });
    }

    // Fetch applications assigned to the recruiter
    const applications = await Application.find({ recruiterId: req.user._id });

    // Return the applications
    return res.json(applications);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Review Applications ...
export const reviewApplication = async (req, res) => {
  try {
    const { r2Responses } = req.body;

    // Check if the user has the Recruiter or Coordinator role
    if (req.user.role !== 'Recruiter' && req.user.role !== 'Coordinator') {
      return res.status(403).json({ error: "Access denied. Recruiter or Coordinator role required." });
    }

    // Validate r2Responses
    if (!Array.isArray(r2Responses) || r2Responses.length === 0) {
      return res.status(400).json({ error: "Invalid r2Responses. It must be a non-empty array." });
    }

    // Find the application by ID
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }

    // Update the application with r2Responses
    application.r2Responses = r2Responses;
    await application.save();

    // Return the updated application
    return res.json(application);
  } catch (error) {
    console.error("Error reviewing application: ", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};


// shortlist candidate  ...

export const shortlistCandidate = async (req, res) => {
  try {
    // Check if the user has the Recruiter or Coordinator role
    if (req.user.role !== 'Recruiter' && req.user.role !== 'Coordinator') {
      return res.status(403).json({ error: "Access denied. Recruiter or Coordinator role required." });
    }

    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ error: 'Application not found!' });
    }

    application.shortlisted = true;
    await application.save();
    return res.status(200).json({ message: "Candidate shortlisted!" });

  } catch (error) {
    console.error("Error shortlisting candidate: ", error.message);
    return res.status(500).json({ error: error.message });
  }
};