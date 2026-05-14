import React, { useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";
import axios from "axios";
import { COMPANY_API_ENDPOINT } from "../../../utils/data";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "../../redux/companySlice";
import { toast } from "sonner";

const CompanyCreate = () => {
  const [companyName, setCompanyName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const registerNewCompany = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_API_ENDPOINT}/register`,
        {
          companyName,
          description,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to create company");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-indigo-50 to-purple-50">
      <Navbar />
      <div className="max-w-4xl mx-auto p-8">
        <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-xl p-8">
          <div className="mb-10 text-center">
            <h1 className="font-bold text-3xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Register New Company
            </h1>
            <p className="text-gray-600 mt-2">
              Fill in the details below to add your company
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <Label className="text-gray-700 font-semibold">
                Company Name
              </Label>
              <Input
                type="text"
                placeholder="Enter company name"
                className="my-2 border-gray-300 focus:ring-2 focus:ring-blue-400"
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>

            <div>
              <Label className="text-gray-700 font-semibold">Description</Label>
              <Input
                type="text"
                placeholder="Short description about the company"
                className="my-2 border-gray-300 focus:ring-2 focus:ring-purple-400"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-4 items-center mt-10 justify-end">
            <Button
              variant={"outline"}
              className="px-6 py-2 border-gray-400 text-gray-700 hover:bg-gray-100"
              onClick={() => navigate("/admin/companies")}
            >
              Cancel
            </Button>
            <Button
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md hover:opacity-90"
              onClick={registerNewCompany}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;
