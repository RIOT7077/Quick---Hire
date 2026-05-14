import React, { useState, useEffect } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useParams } from "react-router";
import axios from "axios";
import {
  APPLICATION_API_ENDPOINT,
  JOB_API_ENDPOINT,
} from "../../../utils/data";
import { setSingleJob } from "../../redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import Navbar from "./Navbar";

const Description = () => {
  const dispatch = useDispatch();
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const params = useParams();
  const jobId = params.id;

  const isInitiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;

  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const applyJobHandler = async () => {
    try {
      const response = await axios.get(
        `${APPLICATION_API_ENDPOINT}/apply/${jobId}`,
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    const fetchSingleJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJobs();
  }, [jobId, dispatch, user?._id]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-6 py-10">
        <div className="max-w-5xl mx-auto bg-white/70 backdrop-blur-sm shadow-lg rounded-xl p-8">
          {/* Header Row */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="font-bold text-3xl bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                {singleJob?.title}
              </h1>
              <div className="flex gap-2 flex-wrap mt-4 items-center">
                <Badge className="bg-gradient-to-r from-blue-100 to-purple-100 text-gray-700 font-semibold">
                  {singleJob?.position}
                </Badge>
                <Badge className="bg-gradient-to-r from-blue-100 to-purple-100 text-gray-700 font-semibold">
                  {singleJob?.salary} LPA
                </Badge>
                <Badge className="bg-gradient-to-r from-blue-100 to-purple-100 text-gray-700 font-semibold">
                  {singleJob?.location}
                </Badge>
                <Badge className="bg-gradient-to-r from-blue-100 to-purple-100 text-gray-700 font-semibold">
                  {singleJob?.jobType}
                </Badge>
              </div>
            </div>

            {/* Apply Button */}
            <div>
              <Button
                onClick={!isApplied ? applyJobHandler : null}
                disabled={isApplied}
                className={`px-6 py-2 rounded-full transition ${
                  isApplied
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-purple-600 hover:to-blue-600"
                }`}
              >
                {isApplied ? "Already Applied" : "Apply"}
              </Button>
            </div>
          </div>

          {/* Description */}
          <div className="mt-8">
            <p className="text-gray-700 leading-relaxed mb-6">
              {singleJob?.description}
            </p>
            <hr className="mb-6" />

            <div className="space-y-3">
              <h1 className="font-bold">
                Role:{" "}
                <span className="font-normal text-gray-800">
                  {singleJob?.title}
                </span>
              </h1>
              <h1 className="font-bold">
                Location:{" "}
                <span className="font-normal text-gray-800">
                  {singleJob?.location}
                </span>
              </h1>
              <h1 className="font-bold">
                Salary:{" "}
                <span className="font-normal text-gray-800">
                  {singleJob?.salary}
                </span>
              </h1>
              <h1 className="font-bold">
                Experience:{" "}
                <span className="font-normal text-gray-800">
                  {singleJob?.experiance}
                </span>
              </h1>
              <h1 className="font-bold">
                Job Type:{" "}
                <span className="font-normal text-gray-800">
                  {singleJob?.jobType}
                </span>
              </h1>
              <h1 className="font-bold">
                Total Applicants:{" "}
                <span className="font-normal text-gray-800">
                  {singleJob?.applications?.length}
                </span>
              </h1>
              <h1 className="font-bold">
                Post Date:{" "}
                <span className="font-normal text-gray-800">
                  {singleJob?.updatedAt?.split("T")[0]}
                </span>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Description;
