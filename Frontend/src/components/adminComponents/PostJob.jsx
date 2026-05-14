import React, { useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectGroup,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectLabel,
} from "../ui/select";
import { useSelector } from "react-redux";
import axios from "axios";
import { JOB_API_ENDPOINT } from "../../../utils/data";
import { toast } from "sonner";
import { useNavigate } from "react-router";

const PostJob = () => {
  const navigate = useNavigate();
  const companyArray = [1];
  const { companies } = useSelector((store) => store.company);
  const [input, setInput] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    companyId: "",
    position: "",
    requirements: "",
    experiance: "",
    jobType: "",
  });
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );
    setInput({ ...input, companyId: selectedCompany._id });
  };
  const [loading, setLoading] = useState(false);
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(`${JOB_API_ENDPOINT}/post`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/admin/jobs");
      } else {
        toast.error(response.data.message);
          navigate("/admin/jobs");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "Something went Wrong");
      } else {
        toast.error("An unexpected Error Occured");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-xl my-10 mx-auto p-10 shadow-[0px_4px_17px_0px_rgba(0,_0,_0,_0.1)]">
        <form onSubmit={submitHandler} action="">
          <div className="text-2xl text-center pb-5 font-bold">
            <h1>Post A Job</h1>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                placeholder="Enter Job Title"
                className={
                  "focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                }
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                placeholder="Enter Job description"
                className={
                  "focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                }
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                placeholder="Enter Job location"
                className={
                  "focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                }
              />
            </div>
            <div>
              <Label>Salary</Label>
              <Input
                type="text"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
                placeholder="Enter Job salary"
                className={
                  "focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                }
              />
            </div>
            <div>
              <Label>Position</Label>
              <Input
                type="text"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
                placeholder="Enter position"
                className={
                  "focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                }
              />
            </div>
            <div>
              <Label>Requirements</Label>
              <Input
                type="text"
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
                placeholder="Enter Job requirements"
                className={
                  "focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                }
              />
            </div>
            <div>
              <Label>Experience</Label>
              <Input
                type="text"
                name="experiance"
                value={input.experiance}
                onChange={changeEventHandler}
                placeholder="Enter Job experience"
                className={
                  "focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                }
              />
            </div>
            <div>
              <Label>Job Type</Label>
              <Input
                type="text"
                name="jobType"
                value={input.jobType}
                onChange={changeEventHandler}
                placeholder="Enter Job Type"
                className={
                  "focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                }
              />
            </div>
          </div>
          <div>
            {companies.length > 0 && (
              <Select onValueChange={selectChangeHandler}>
                <SelectTrigger className={"w-[180px] mt-4"}>
                  <SelectValue placeholder="Select a company"></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {companies.map((company) => {
                      return (
                        <SelectItem
                          key={company._id}
                          value={company.name.toLowerCase()}
                        >
                          {company.name}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          </div>
          <div className="flex items-center justify-center">
            <Button className={" w-full my-5"}>Post Job</Button>
          </div>
          {companyArray.length === 0 && (
            <p className="text-sm text-center text-red-600">
              Please register a company to post jobs
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostJob;
