import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "../../hooks/useGetAllAdminJobs";
import { setSearchJobByText } from "../../redux/jobSlice";

const AdminJobs = () => {
  useGetAllAdminJobs();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input, dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-indigo-50 to-purple-50">
      <Navbar />

      <div className="max-w-6xl my-10 mx-auto px-4">
        {/* Filter + Button Row */}
        <div className="flex items-center justify-between mb-6 bg-white/70 backdrop-blur-md shadow-md rounded-xl p-4">
          <Input
            className="w-1/2 border-gray-300 focus:ring-2 focus:ring-blue-400"
            placeholder="Filter by Name / Job"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            onClick={() => navigate("/admin/jobs/create")}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md hover:opacity-90"
          >
            Post new Job
          </Button>
        </div>

        {/* Jobs Table */}
        <div className="bg-white/70 backdrop-blur-md shadow-lg rounded-xl p-6">
          <AdminJobsTable />
        </div>
      </div>
    </div>
  );
};

export default AdminJobs;
