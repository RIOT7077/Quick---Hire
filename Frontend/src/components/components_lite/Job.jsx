import React from "react";
import { Button } from "../ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router";

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgo = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDiff = currentTime - createdAt;
    return Math.floor(timeDiff / (1000 * 60 * 60 * 24)); // fixed: 24h * 60m * 60s * 1000ms
  };

  return (
    <div className="p-6 rounded-xl bg-gradient-to-br from-white to-indigo-50 shadow-md cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
      {/* Top row: Date + Bookmark */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {daysAgo(job?.createdAt) === 0
            ? "Today"
            : `${daysAgo(job?.createdAt)} Days ago`}
        </p>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100"
        >
          <Bookmark className="text-purple-600" />
        </Button>
      </div>

      {/* Company Info */}
      <div className="flex items-center gap-3 my-4">
        <div className="p-3 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 shadow">
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </div>
        <div>
          <h1 className="text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            {job?.company?.name}
          </h1>
          <p className="text-sm text-gray-600">{job?.location}</p>
        </div>
      </div>

      {/* Job Info */}
      <div>
        <h2 className="font-bold text-xl my-2 text-gray-800">{job?.title}</h2>
        <p className="text-sm text-gray-600 line-clamp-2">{job?.description}</p>

        {/* Tags */}
        <div className="flex gap-2 flex-wrap mt-4 items-center">
          <Badge className="font-semibold text-gray-700 bg-gradient-to-r from-blue-100 to-purple-100">
            {job?.position}
          </Badge>
          <Badge className="font-semibold text-gray-700 bg-gradient-to-r from-blue-100 to-purple-100">
            {job?.salary} LPA
          </Badge>
          <Badge className="font-semibold text-gray-700 bg-gradient-to-r from-blue-100 to-purple-100">
            {job?.location}
          </Badge>
          <Badge className="font-semibold text-gray-700 bg-gradient-to-r from-blue-100 to-purple-100">
            {job?.jobType}
          </Badge>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4 mt-5">
          <Button
            onClick={() => navigate(`/description/${job?._id}`)}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-5 py-2 rounded-full hover:from-purple-600 hover:to-blue-600"
          >
            Details
          </Button>
          <Button className="bg-gradient-to-r from-purple-400 to-blue-400 text-white px-5 py-2 rounded-full hover:from-blue-500 hover:to-purple-600">
            Save For Later
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Job;
