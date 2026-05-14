import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { USER_API_ENDPOINT } from "../../../utils/data.js";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/authSlice.js";
import { Button } from "../ui/button.jsx";
import { Loader2 } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "",
    file: "",
    phoneNumber: "",
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("role", input.role);
    formData.append("phoneNumber", input.phoneNumber);
    if (input.file) formData.append("file", input.file);

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      const errorMessage = error.response
        ? error.response.data.message
        : "Unexpected error occurred";
      toast.error(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Navbar />

      <div className="flex items-center justify-center max-w-7xl mx-auto px-4">
        <form
          onSubmit={submitHandler}
          className="w-full sm:w-2/3 md:w-1/2 bg-gradient-to-br from-white to-indigo-50 rounded-2xl p-8 my-10 shadow-xl"
        >
          <h1 className="font-bold text-3xl text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-6">
            Register
          </h1>

          {/* Full Name */}
          <div className="my-4">
            <Label className="mb-2 block">Name</Label>
            <Input
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="Karan Kale"
              className="border-gray-300 focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Email */}
          <div className="my-4">
            <Label className="mb-2 block">Email</Label>
            <Input
              type="text"
              placeholder="karankale@gmail.com"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              className="border-gray-300 focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Password */}
          <div className="my-4">
            <Label className="mb-2 block">Password</Label>
            <Input
              type="password"
              placeholder="*******"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              className="border-gray-300 focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Phone Number */}
          <div className="my-4">
            <Label className="mb-2 block">Phone Number</Label>
            <Input
              type="tel"
              placeholder="+91 9699060960"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              className="border-gray-300 focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Role Selection */}
          <div className="flex gap-6 my-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <Input
                type="radio"
                name="role"
                value="Student"
                checked={input.role === "Student"}
                onChange={changeEventHandler}
              />
              <span>Student</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Input
                type="radio"
                name="role"
                value="Recruiter"
                checked={input.role === "Recruiter"}
                onChange={changeEventHandler}
              />
              <span>Recruiter</span>
            </label>
          </div>

          {/* Profile Picture Upload */}
          <div className="flex flex-col my-4">
            <Label className="mb-2">Profile Picture</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={changeFileHandler}
              className="cursor-pointer border-gray-300 focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Submit Button */}
          {loading ? (
            <Button className="w-full my-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Account...
            </Button>
          ) : (
            <Button
              type="submit"
              className="block w-3/4 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-600 hover:to-blue-600 text-white px-4 py-2 my-6 rounded-full transition-all"
            >
              Register
            </Button>
          )}

          {/* Redirect to Login */}
          <p className="text-gray-600 text-sm text-center">
            Already have an account?
            <Link
              to="/login"
              className="text-purple-600 font-medium pl-1 hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
