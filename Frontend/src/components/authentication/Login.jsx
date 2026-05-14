import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_ENDPOINT } from "../../../utils/data";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../../redux/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const { loading, user } = useSelector((store) => store.auth);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
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
            Login
          </h1>

          {/* Email */}
          <div className="my-4">
            <Label className="mb-2 block">Email</Label>
            <Input
              type="text"
              placeholder="karankale@gmail.com"
              name="email"
              value={input.email}
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
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              className="border-gray-300 focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Role Selection */}
          <div className="flex justify-between items-center my-4">
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <Input
                  type="radio"
                  name="role"
                  checked={input.role === "Student"}
                  onChange={changeEventHandler}
                  value="Student"
                  className="cursor-pointer"
                />
                <span>Student</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <Input
                  type="radio"
                  name="role"
                  checked={input.role === "Recruiter"}
                  onChange={changeEventHandler}
                  value="Recruiter"
                  className="cursor-pointer"
                />
                <span>Recruiter</span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          {loading ? (
            <div className="flex items-center justify-center my-4">
              <div className="spinner-border text-blue-600" role="status">
                <span className="sr-only">Loading..</span>
              </div>
            </div>
          ) : (
            <button className="block w-3/4 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-600 hover:to-blue-600 text-white font-medium px-4 py-2 my-6 rounded-full transition-all">
              Login
            </button>
          )}

          {/* Register Redirect */}
          <p className="text-gray-600 text-sm text-center">
            Don’t have an account?
            <Link
              to="/register"
              className="text-purple-600 font-medium pl-1 hover:underline"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
