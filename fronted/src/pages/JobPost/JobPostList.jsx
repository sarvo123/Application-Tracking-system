import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../../context/AuthContext";

const JobPostList = () => {
  // getting the authorizations ...
  const { authUser } = useAuthContext();

  const [jobPosts, setJobPosts] = useState([]);
  const [error, setError] = useState("");
  const [recruiterId, setRecruiterId] = useState('');

  useEffect(() => {
    const fetchJobPosts = async () => {
      try {
        const res = await axios.get("/api/jobposts");
        setJobPosts(res.data);
      } catch (err) {
        console.log(err);
        setError(err.response?.data?.error || "Error fetching job Posts");
      }
    };
    fetchJobPosts();
  }, []);

  const approveAndAssign = async (jobId) => {
    try {
      await axios.put(`/api/jobposts/${jobId}/approve`, );
      // Update the UI or notify the user
      await axios.put(`/api/jobposts/${jobId}assign-recruiters`,{ recruiterId })
    } catch (error) {
      console.error(error);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>JOB POSTS</h2>
      {jobPosts.length === 0 ? (
        <p>No Job Posts Available.</p>
      ) : (
        jobPosts.map((jobPost) => (
          <div key={jobPost._id} className="job-post">
            <h2>{jobPost.title}</h2>
            <p>Location: {jobPost.location}</p>
            <p>Salary: {jobPost.salary}</p>
            <p>Responsibilities: {jobPost.responsibilities}</p>
            {authUser.role !== "Candidate" && (
              <p>Coordinator ID: {jobPost.coordinatorId}</p>
            )}
            {authUser.role !== "Candidate" && authUser.role !== "Employer" && (
              <p>Recruiter IDs: {jobPost.recruiterIds?.join(", ")}</p>
            )}
            {authUser.role === "Coordinator" && (
              <>
                <button onClick={() => approveAndAssign(jobPost._id)}>Approve and Assign</button>
                <input
                  type="text"
                  value={recruiterId}
                  onChange={(e) => setRecruiterId(e.target.value)}
                  placeholder="Enter Recruiter ID"
                />
              </>
            )}
          </div>
        ))
      )}
      {applyingJobId && <JobApplicationForm jobId={applyingJobId} />}
    </div>
  );
};

export default JobPostList;
