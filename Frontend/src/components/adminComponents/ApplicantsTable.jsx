import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import axios from "axios";
import { APPLICATION_API_ENDPOINT } from "../../../utils/data";
import { toast } from "sonner";

const ApplicantsTable = () => {
  const shortListingStatus = ["Accepted", "Rejected"];
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${APPLICATION_API_ENDPOINT}/status/${id}/update`,
        { status }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update status");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-indigo-50 to-purple-50 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white/70 backdrop-blur-md shadow-md rounded-xl p-6">
        <Table className={"rounded-full"}>
          <TableCaption className="text-gray-600 font-medium">
            List of Recently Applied Users
          </TableCaption>

          {/* Table Head */}
          <TableHeader className={"bg-gray-100"}>
            <TableRow>
              <TableHead>Fullname</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Resume</TableHead>
              <TableHead>Applied On</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody>
            {applicants && applicants?.applications?.length > 0 ? (
              applicants.applications.map((item) => (
                <TableRow key={item._id} className="hover:bg-indigo-50/40">
                  <TableCell>{item?.applicant?.fullname}</TableCell>
                  <TableCell>{item?.applicant?.email}</TableCell>
                  <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                  <TableCell>
                    {item.applicant?.profile?.resume ? (
                      <a
                        href={item.applicant?.profile?.resume}
                        className="text-blue-600 font-semibold hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Download
                      </a>
                    ) : (
                      <span className="text-gray-400">NA</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {item?.applicant?.createdAt?.split("T")[0]}
                  </TableCell>
                  <TableCell className="text-right">
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal className="cursor-pointer text-gray-600 hover:text-gray-900" />
                      </PopoverTrigger>
                      <PopoverContent className="w-32 bg-white/90 backdrop-blur-md shadow-md rounded-md">
                        {shortListingStatus.map((status, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 cursor-pointer hover:text-blue-600"
                            onClick={() => statusHandler(status, item._id)}
                          >
                            <input
                              type="radio"
                              name={`shortStatus-${item._id}`}
                              value={status}
                            />
                            {status}
                          </div>
                        ))}
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-gray-500">
                  No applicants found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ApplicantsTable;
