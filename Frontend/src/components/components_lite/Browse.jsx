import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "../../redux/jobSlice";
import useGetAllJobs from "../../hooks/useGetAllJobs";

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-center font-bold text-3xl my-10 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Search Results : {allJobs.length}
        </h1>

        <div className="flex flex-col gap-6">
          {allJobs.map((job) => (
            <Job key={job.id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Browse;
