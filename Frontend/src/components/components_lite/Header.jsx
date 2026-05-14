import React, { useState } from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { RiHomeOfficeFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../../redux/jobSlice";
import { useNavigate } from "react-router";

const Header = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/Browse");
  };

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-8">
        {/* LEFT SIDE CONTENT */}
        <div className="flex flex-col gap-6">
          <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-100 to-purple-100 text-red-600 font-medium shadow w-fit">
            <RiHomeOfficeFill className="text-black" /> No.1 Quick Hiring
            website
          </span>

          <h2 className="text-5xl font-bold leading-snug bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Search, Apply & <br /> Get Your Dream Job
          </h2>

          <p className="text-gray-600">
            Start your hunt for the best, life-changing career opportunities
            from here in your selected areas conveniently and get hired quickly.
          </p>

          <div className="flex w-full max-w-md shadow-lg bg-white border border-gray-200 pl-5 rounded-full items-center gap-4">
            <input
              type="text"
              placeholder="Find Your Dream Job"
              onChange={(e) => setQuery(e.target.value)}
              className="outline-none border-none w-full p-3 bg-transparent"
            />
            <Button
              onClick={searchJobHandler}
              className="rounded-r-full h-12 w-12 bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-purple-600 hover:to-blue-600"
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
