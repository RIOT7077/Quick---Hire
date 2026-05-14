import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import FilterJobs from "./FilterJobs";
import Job from "./Job";
import { useSelector } from "react-redux";
const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);
  useEffect(() => {
    if (!searchedQuery || searchedQuery.trim === "") {
      setFilterJobs(allJobs);
      return;
    }
    const filteredJobs = allJobs.filter((job) => {
      const query = searchedQuery.toLowerCase();
      return (
        job.title?.toLowerCase().includes(query) ||
        job.description?.toLowerCase().includes(query) ||
        job.location?.toLowerCase().includes(query) ||
        job.experiance?.toLowerCase().includes(query) ||
        job.salary?.toLowerCase().includes(query)
      );
    });
    setFilterJobs(filteredJobs);
  }, [allJobs, searchedQuery]);
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-20%">
            <FilterJobs />
          </div>
          {filterJobs.length <= 0 ? (
            <span>Job not Found</span>
          ) : (
            <div className=" flex-1 h-[150vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-6">
                {filterJobs.map((job, index) => (
                  <div key={job.id}>
                    <Job job={job} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
