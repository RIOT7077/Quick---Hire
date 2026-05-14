import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { USER_API_ENDPOINT } from "../../../utils/data.js";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { setUser } from "../../redux/authSlice.js";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const response = await axios.post(`${USER_API_ENDPOINT}/logout`);
      if (response.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success("Logged Out Successfully");
      } else {
        toast.error("Failed to log out");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
      <div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Quick{" "}
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Hire
          </span>
        </h1>
      </div>
      <div className="flex items-center gap-8">
        <ul className="flex font-medium items-center gap-6 text-gray-700">
          {user && user.role === "Recruiter" ? (
            <>
              <Link to={"/admin/companies"}>
                <li className="hover:text-purple-600 transition">Companies</li>
              </Link>
              <Link to={"/admin/jobs"}>
                <li className="hover:text-purple-600 transition">Jobs</li>
              </Link>
            </>
          ) : (
            <>
              <Link to={"/Home"}>
                <li className="hover:text-purple-600 transition">Home</li>
              </Link>
              <Link to={"/Browse"}>
                <li className="hover:text-purple-600 transition">Browse</li>
              </Link>
              <Link to={"/Jobs"}>
                <li className="hover:text-purple-600 transition">Jobs</li>
              </Link>
            </>
          )}
        </ul>
        {!user ? (
          <div className="flex gap-3">
            <Link to={"/login"}>
              <Button
                variant="outline"
                className="hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white"
              >
                Log in
              </Button>
            </Link>
            <Link to={"/register"}>
              <Button
                variant="primary"
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-purple-600 hover:to-blue-600"
              >
                Register
              </Button>
            </Link>
          </div>
        ) : (
          <Popover>
            <PopoverTrigger asChild>
              <Avatar className="cursor-pointer ring-2 ring-purple-300">
                <AvatarImage src={user?.profile?.profilePhoto} alt="User Pfp" />
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-80 bg-gradient-to-b from-grey-100 via-white to-purple-100 border-none shadow-xl rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="@shadcn"
                  />
                </Avatar>
                <div>
                  <h3 className="font-medium text-gray-800">
                    {user?.fullname}
                  </h3>
                  <p className="text-sm text-gray-500">{user?.profile?.bio}</p>
                </div>
              </div>
              <div className="flex flex-col text-gray-700">
                {user && user.role === "Student" && (
                  <div className="flex items-center">
                    <User2 />
                    <Button variant="link">
                      <Link to={"/Profile"}>Profile</Link>
                    </Button>
                  </div>
                )}
                <div className="flex items-center">
                  <LogOut />
                  <Button
                    onClick={logoutHandler}
                    variant="link"
                    className="text-red-500"
                  >
                    Logout
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
};

export default Navbar;
