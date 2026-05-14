import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../../redux/jobSlice";

const filterData = [
  {
    filterType: "Location",
    array: [
      "Pune",
      "Delhi",
      "Mumbai",
      "Kolkata",
      "Chennai",
      "Bangalore",
      "Hyderabad",
      "Bhopal",
      "Thane",
    ],
  },
  {
    filterType: "Technology",
    array: [
      "Mern",
      "React",
      "Node",
      "Python",
      "Java",
      "C++",
      "C#",
      "Go",
      "Rust",
      "Kotlin",
      "Swift",
      "frontend",
      "backend",
      "mobile",
      "desktop",
      "database",
      "cloud",
    ],
  },
  {
    filterType: "Experience",
    array: ["0-3 Years", "3-5 Years", "5-7 Years", "7+ Years"],
  },
  {
    filterType: "Salary",
    array: ["0-50k", "50k-100k", "100k-200k", "200k+"],
  },
];

const FilterJobs = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const handleChange = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);

  return (
    <div className="w-full rounded-2xl  p-6">
      <h1 className="font-bold text-2xl mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
        Filter Jobs
      </h1>
      <RadioGroup value={selectedValue} onValueChange={handleChange}>
        {filterData.map((data, index) => (
          <div key={index} className="mb-6">
            <h2 className="font-semibold text-lg text-gray-700 mb-2">
              {data.filterType}
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {data.array.map((item, indx) => {
                const itemId = `Id${index}-${indx}`;
                return (
                  <label
                    key={itemId}
                    htmlFor={itemId}
                    className="flex items-center gap-2 cursor-pointer rounded-md px-2 py-1 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition"
                  >
                    <RadioGroupItem
                      value={item}
                      id={itemId}
                      className="text-purple-600 focus:ring-purple-400"
                    />
                    <span className="text-gray-700">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterJobs;
