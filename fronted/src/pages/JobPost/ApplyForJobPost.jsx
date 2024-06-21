import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

const ApplyForm = () => {
  const { jobId } = useParams();
  const { formData, setFormData } = useState({
    name: "",
    email: "",
    resume: null,
    r1Responses: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, resume: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("resume", formData.resume);
    data.append("r1Responses", formData.r1Responses);
    data.append("jobId", jobId);
  };

  return (
    <form onSubmit={handleSubmit}>
    {error && <div>{error}</div>}
    <input type="text" name="name" placeholder="Your Name"  value={formData.name} onChange={handleChange}/>
    <input  type="email" name="email"  placeholder="Your EmailId " value={formData.email} onChange={handleChange}/>
    <textarea name="r1Responses" placeholder="Response" value={formData.r1Responses} onChange={handleChange} />
    <input type="file" name="resume" onChange={handleFileChange} />
    <button type="submit">Submit your form</button>
    </form>
  )
};

export default ApplyForm ; 