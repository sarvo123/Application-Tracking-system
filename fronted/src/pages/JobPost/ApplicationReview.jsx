import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ApplicationReview = ()=>{
    const {applicationId} = useParams();
    const [application, setApplication] = useState(null);
    const [error , setError] = useState("");
    const [r2Responses , setR2Responses] = useState("");

    useEffect(() => {
        const fetchApplication = async ()=>{
            try{
                const res = await axios.get(`/api/application/${applicationId}`);
                setApplication(res.data);
            }catch(err){
                setError(err.response?.data?.error || "Error fetching application ");
            }
        };
        fetchApplication();
    } , [applicationId]);

    const handleShortlist = async () => {
        try {
          await axios.put(`/api/applications/${applicationId}/shortlist`);
          alert("Candidate shortlisted");
        } catch (err) {
          setError(err.response?.data?.error || "Error shortlisting candidate");
        }
      };

      const handleReviewSubmit = async (e) => {
        e.preventDefault();
        try {
          await axios.put(`/api/applications/${applicationId}/review`, { r2Responses });
          alert("Review submitted");
        } catch (err) {
          setError(err.response?.data?.error || "Error submitting review");
        }
      };

      if (error) {
        return <div>{error}</div>;
      }
    
      if (!application) {
        return <div>Loading...</div>;
      }

      return (
        <div>
          <h2>Application Review</h2>
          <p>Name: {application.name}</p>
          <p>Email: {application.email}</p>
          <p>Job ID: {application.jobId}</p>
          <p>R1 Responses: {application.r1Responses}</p>
          <form onSubmit={handleReviewSubmit}>
            <textarea
              name="r2Responses"
              placeholder="R2 Responses"
              value={r2Responses}
              onChange={(e) => setR2Responses(e.target.value)}
            />
            <button type="submit">Submit Review</button>
          </form>
          <button onClick={handleShortlist}>Shortlist Candidate</button>
        </div>
      );
}

export 