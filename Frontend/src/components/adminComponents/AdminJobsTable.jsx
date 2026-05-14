import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal, Store } from "lucide-react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const AdminJobsTable = () => {
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const navigate = useNavigate();
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);

  useEffect(() => {
    const filterJobs =
      allAdminJobs.length > 0 &&
      allAdminJobs.filter((job) => {
        if (!searchJobByText) {
          return true;
        }
        return job?.title
          ?.toLowerCase()
          .includes(searchJobByText.toLowerCase());
      });
    setFilterJobs(filterJobs);
  }, [allAdminJobs, searchJobByText]);
  return (
    <div className="my-10">
      <Table>
        <TableCaption>Your Recently Posted Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className={"text-right"}>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs.length === 0 ? (
            <span>No Companies Added</span>
          ) : (
            filterJobs?.map((job) => (
              <TableRow key={job.id}>
                <TableCell>{job.company.name}</TableCell>
                <TableCell>{job.title}</TableCell>
                <TableCell>{job.company.createdAt.split("T")[0]}</TableCell>
                <TableCell className={"text-right"}>
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className={"w-32"}>
                      <div
                        onClick={() => navigate(`/admin/companies/${job._id}`)}
                        className="flex items-center mb-1 cursor-pointer"
                      >
                        <Edit2 className="w-4" />
                        <span className="ml-2">Edit</span>
                      </div>
                      <hr />
                      <div
                        onClick={() =>
                          navigate(`/admin/jobs/${job._id}/applicants`)
                        }
                        className="flex items-center gap-1 w-fit mt-1 ml-0 cursor-pointer"
                      >
                        <Eye className="w-4.5"></Eye>
                        <span>Appicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
