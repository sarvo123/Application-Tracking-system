import React, { useState } from "react";
import axios from "axios";
import useCreateJobPost from "../../components/hooks/useCreateJobPost";

const JobPostForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    salary: "",
    responsibilities: "",
    r1Check: [],
  });
const {createJobPost} = useCreateJobPost();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
         
    //   const token = localStorage.getItem("token");
    //   await axios.post("/api/jobposts", formData, {
    //     headers: { Authorization: `Bearer ${token}` },
    //   });
      // Redirect or notify user of successful job post creation
      await createJobPost(title , location , salary , responsibilities , r1Check)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Job Title"
        onChange={(e)=>setFormData({...formData , title : e.target.value})}
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        onChange={(e)=>setFormData({...formData , title : e.target.value})}
      />
      <input
        type="text"
        name="salary"
        placeholder="Salary"
        onChange={(e)=>setFormData({...formData , title : e.target.value})}
      />
      <textarea
        name="responsibilities"
        placeholder="Responsibilities"
        onChange={(e)=>setFormData({...formData , Responsibili : e.target.value})}
      />
      {/* Add inputs for r1Check questions */}
      <button type="submit">Create Job Post</button>
    </form>
  );
};

export default JobPostForm;
