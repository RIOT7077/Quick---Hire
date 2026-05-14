import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { COMPANY_API_ENDPOINT } from "../../../utils/data";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetCompanyById from "../../hooks/useGetCompanyById";

const CompanySetup = () => {
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });
  const { singleCompany } = useSelector((store) => store.company);
  const [loading, setLoading] = useState();
  const params = useParams();
  const companyId = params.id;
  useGetCompanyById(companyId);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true);
      const res = await axios.put(
        `${COMPANY_API_ENDPOINT}/update/${companyId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update company");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (singleCompany) {
      setInput({
        name: singleCompany.name || "",
        description: singleCompany.description || "",
        website: singleCompany.website || "",
        location: singleCompany.location || "",
        file: null,
      });
    }
  }, [singleCompany]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-indigo-50 to-purple-50">
      <Navbar />
      <div className="max-w-3xl mx-auto p-8">
        <form
          onSubmit={submitHandler}
          className="bg-white/80 backdrop-blur-md shadow-lg rounded-xl p-8"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Button
              className="flex items-center gap-2 text-gray-600 font-semibold hover:bg-gray-100"
              variant="outline"
              type="button"
              onClick={() => navigate("/admin/companies")}
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Company Setup
            </h1>
          </div>

          {/* Inputs */}
          <div className="space-y-5">
            <div>
              <Label className="text-gray-700 font-semibold">
                Company Name
              </Label>
              <Input
                type="text"
                placeholder="Enter company name"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
                className="mt-2 border-gray-300 focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <Label className="text-gray-700 font-semibold">Description</Label>
              <Input
                type="text"
                placeholder="Enter description"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                className="mt-2 border-gray-300 focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <div>
              <Label className="text-gray-700 font-semibold">Website</Label>
              <Input
                type="text"
                placeholder="Enter website"
                name="website"
                value={input.website}
                onChange={changeEventHandler}
                className="mt-2 border-gray-300 focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <Label className="text-gray-700 font-semibold">Location</Label>
              <Input
                type="text"
                placeholder="Enter location"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                className="mt-2 border-gray-300 focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <div>
              <Label className="text-gray-700 font-semibold">Logo</Label>
              <Input
                type="file"
                placeholder="Upload Logo"
                name="file"
                onChange={changeFileHandler}
                className="mt-2 border-gray-300 cursor-pointer"
              />
            </div>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full mt-10 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md hover:opacity-90"
          >
            {loading ? "Updating..." : "Update"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
