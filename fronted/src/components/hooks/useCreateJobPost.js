import { useState } from "react";
import toast from "react-hot-toast";
import { useJobPostContext } from "../../context/JobPostContext";

const useCreateJobPost = () => {
  const { setJobPostData } = useJobPostContext();

  const createJobPost = async ({
    title,
    location,
    salary,
    responsibilities,
    r1Check,
  }) => {
    const succcess = handleInputErrors({
      title,
      location,
      salary,
      responsibilities,
      r1Check,
    });
    if (!succcess) return;

    const token = JSON.parse(localStorage.getItem("ATS-user"))?.token;

    try {
      const res = await fetch("/api/jobpost/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          location,
          salary,
          responsibilities,
          r1Check,
        }),
        credentials: "include", // Ensure cookies are sent ...
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      console.log(data);
      //local storage
      localStorage.setItem("ATS-jobpost", JSON.stringify(data));
      // context
      setJobPostData(data);
    } catch (error) {
      toast.error(error.message);
    }
  };
  return { createJobPost };
};

export default useCreateJobPost;

function handleInputErrors({
  title,
  location,
  salary,
  responsibilities,
  r1Check,
}) {
  if (!title || !location || !salary || !responsibilities || !r1Check) {
    toast.error("Please fill in all fields");
    return false;
  }

  // if(password !== confirmPassword){
  //     toast.error('Password do not match');
  //     return false;
  // }

  // if(password.length < 6){
  //     toast.error("Password must be at least 6 characters");
  //     return false;
  // }

  return true;
}
