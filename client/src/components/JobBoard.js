import JobList from "./JobList";
import { getJobs } from "../graphql/querys";
import { useState, useEffect } from "react";

function JobBoard() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    getJobs()
      .then(setJobs)
      .catch((err) => {
        setError(true);
      });
  }, []);

  console.log("[JobBoard] jobs:", jobs);
  if (error) {
    return <p>Something went wrong</p>;
  }

  return (
    <div>
      <h1 className="title">Job Board</h1>
      <JobList jobs={jobs} />
    </div>
  );
}

export default JobBoard;
