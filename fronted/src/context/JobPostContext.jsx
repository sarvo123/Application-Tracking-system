import { createContext , useContext , useState } from "react";

export const JobPostContext = createContext();

export const useJobPostContext = ()=>{
    return useContext(JobPostContext);
};

export const JobPostContextProvider = ({children})=>{
    const [JobPostData , setJobPostData] = useState(JSON.parse(localStorage.getItem("ATS-jobpost")));

    return <JobPostContext.Provider value={{JobPostData , setJobPostData}}>{children}</JobPostContext.Provider>
};