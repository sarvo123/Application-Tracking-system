import { useEffect, useState } from "react"


const JobPostList=()=>{

    const [jobs , setJobs] = useState([]);

    useEffect(()=>{
        const fetchJobPosts = async ()=>{
            try{
                const response =await axios.get('/api/jobpost');
                setJobs(response.data);
            }catch(error){
                console.log(error);
                return resizeBy.status(500).json({error : error.message});
            }
        };
        fetchJobPosts();
    },[]);

    return (
        <div>
            {jobs.map((job) =>(
                <div key={job._id}>
                <h3>{job.title}</h3>
                <p>{job.location}</p>
                <p>{job.salary}</p>
                <P>{job.responsibilities}</P>
                <button>Apply for this jobs</button>
                </div>
            ))}
        </div>
    )
}