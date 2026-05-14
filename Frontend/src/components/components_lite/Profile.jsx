import React, { useState } from "react";
import Navbar from "./Navbar";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "../ui/badge";
import { Label } from "../ui/label";
import AppliedJobs from "./AppliedJobs";
import EditProfileModal from "./EditProfileModal.jsx";
import { useSelector } from "react-redux";
import useGetAllAppliedJobs from "../../hooks/useGetAllAppliedJobs.jsx";

const Profile = () => {
  useGetAllAppliedJobs();
  const isResume = true;
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white rounded-2xl my-5 p-8 shadow-lg">
        <div className="flex justify-between">
          <div className="flex items-center gap-5">
            <Avatar className="cursor-pointer h-24 w-24 ring-4 ring-purple-200">
              <AvatarImage src  ={user?.profile?.profilePhoto} alt="@shadcn" />
            </Avatar>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                {user?.fullname}
              </h1>
              <p className="text-sm text-gray-600 mt-1">{user?.profile?.bio}</p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-purple-600 hover:to-blue-600"
          >
            <Pen />
          </Button>
        </div>

        <div className="mt-4">
          <div className="flex gap-3 items-center my-2">
            <Mail className="text-blue-600" />
            <a
              href={`mailto:${user?.email}`}
              className="text-gray-700 hover:underline"
            >
              {user?.email}
            </a>
          </div>
          <div className="flex gap-3 items-center my-2">
            <Contact className="text-purple-600" />
            <a
              href={`tel:${user?.phoneNumber}`}
              className="text-gray-700 hover:underline"
            >
              {user?.phoneNumber}
            </a>
          </div>
        </div>

        <div className="my-5">
          <h1 className="font-bold text-lg bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Skills
          </h1>
          <div className="flex flex-wrap items-center gap-2 my-3">
            {user?.profile?.skills.length !== 0 ? (
              user?.profile?.skills.map((item, index) => (
                <Badge
                  key={index}
                  className="text-gray-700 font-bold bg-gradient-to-r from-indigo-100 to-purple-100"
                  variant={"ghost"}
                >
                  {item}
                </Badge>
              ))
            ) : (
              <span className="text-gray-400">NA</span>
            )}
          </div>
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-md font-semibold text-gray-700">
            Upload Resume
          </Label>
          <div>
            {isResume ? (
              <a
                target="_blank"
                href={user?.profile?.resume}
                className="text-blue-600 hover:underline cursor-pointer"
              >
                Download
              </a>
            ) : (
              <span className="text-gray-400">No Resume Found</span>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-2xl p-6 shadow-lg">
        <h1 className="text-md font-bold text-gray-700 mb-4">Applied Jobs</h1>
        <AppliedJobs />
      </div>

      <EditProfileModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
