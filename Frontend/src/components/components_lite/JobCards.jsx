import React from "react";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router";

const JobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="p-6 rounded-xl bg-gradient-to-br from-white to-indigo-50 shadow-md cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
    >
      {/* Company Info */}
      <div>
        <h1 className="text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          {job.company.name}
        </h1>
        <p className="text-sm text-gray-600">{job.location}</p>
      </div>

      {/* Job Info */}
      <div className="mt-3">
        <h2 className="font-bold text-xl mb-2 text-gray-800">{job.title}</h2>
        <p className="text-sm text-gray-600 line-clamp-2">{job.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-4 items-center">
          <Badge className="font-semibold text-gray-700 bg-gradient-to-r from-blue-100 to-purple-100">
            {job.position}
          </Badge>
          <Badge className="font-semibold text-gray-700 bg-gradient-to-r from-blue-100 to-purple-100">
            {job.salary} LPA
          </Badge>
          <Badge className="font-semibold text-gray-700 bg-gradient-to-r from-blue-100 to-purple-100">
            {job.location}
          </Badge>
          <Badge className="font-semibold text-gray-700 bg-gradient-to-r from-blue-100 to-purple-100">
            {job.jobType}
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default JobCards;
