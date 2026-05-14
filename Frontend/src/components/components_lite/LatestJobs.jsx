import React from "react";
import JobCards from "./Jobcards";
import { useSelector } from "react-redux";

const LatestJobs = () => {
  const allJobs = useSelector((state) => state.job?.allJobs || []);

  return (
    <div className="max-w-7xl my-20 mx-auto px-4">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
        Latest & Top Job Openings
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 my-8">
        {!allJobs || allJobs.length === 0 ? (
          <span className="text-gray-600">No Jobs Available</span>
        ) : (
          allJobs.slice(0, 6).map((job) => <JobCards key={job._id} job={job} />)
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
