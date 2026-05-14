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
import { Edit2, MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );
  const navigate = useNavigate();
  const [filteredCompany, setFilteredCompany] = useState(companies);

  useEffect(() => {
    const filtered =
      companies.length > 0 &&
      companies.filter((company) => {
        if (!searchCompanyByText) return true;
        return company?.name
          ?.toLowerCase()
          .includes(searchCompanyByText.toLowerCase());
      });
    setFilteredCompany(filtered);
  }, [companies, searchCompanyByText]);

  return (
    <div className="">
      <Table className="backdrop-blur-sm ">
        <TableCaption className="text-gray-800 font-medium">
          Your Recently Added Companies
        </TableCaption>
        <TableHeader>
          <TableRow className="">
            <TableHead>Logo</TableHead>
            <TableHead>Company Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCompany.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-gray-600 py-6">
                No Companies Added
              </TableCell>
            </TableRow>
          ) : (
            filteredCompany.map((company) => (
              <TableRow
                key={company.id}
                className="hover:bg-white/20 transition-colors"
              >
                <TableCell>
                  <Avatar>
                    <AvatarImage src={company.logo} alt="Company Logo" />
                  </Avatar>
                </TableCell>
                <TableCell className="text-gray-900 font-medium">
                  {company.name}
                </TableCell>
                <TableCell className="text-gray-700">
                  {company.createdAt.split("T")[0]}
                </TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="cursor-pointer" />
                    </PopoverTrigger>
                    <PopoverContent className="w-32 bg-white/90 shadow-md rounded-md">
                      <div
                        onClick={() =>
                          navigate(`/admin/companies/${company._id}`)
                        }
                        className="flex items-center cursor-pointer hover:text-blue-600"
                      >
                        <Edit2 className="w-4" />
                        <span className="ml-2">Edit</span>
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

export default CompaniesTable;
