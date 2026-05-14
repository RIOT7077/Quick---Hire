import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router";
import useGetAllCompanies from "../../hooks/useGetAllCompanies";
import { useDispatch } from "react-redux";
import { searchCompanyByText } from "../../redux/companySlice";

const Companies = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useGetAllCompanies();
  const [input, setInput] = useState("");

  useEffect(() => {
    dispatch(searchCompanyByText(input));
  }, [input, dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-indigo-50 to-purple-50">
      <Navbar />

      <div className="max-w-6xl my-10 mx-auto">
        <div className="flex items-center justify-between p-4 rounded-xl bg-transparent shadow-none">
          <Input
            className="w-fit bg-white/20 placeholder-gray-700 border border-gray-300 focus:border-blue-400"
            placeholder="Filter by Name"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            onClick={() => navigate("/admin/companies/create")}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md hover:opacity-90"
          >
            Add Company
          </Button>
        </div>

        {/* Table directly on gradient */}
        <div className="mt-6">
          <CompaniesTable />
        </div>
      </div>
    </div>
  );
};

export default Companies;
