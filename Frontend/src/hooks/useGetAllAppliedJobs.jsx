import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { APPLICATION_API_ENDPOINT } from "../../utils/data";
import { setAllAppliedJobs } from "../redux/jobSlice";
import axios from "axios";

const useGetAppliedJobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_ENDPOINT}/get`, {
          withCredentials: true,
        });
        console.log("API Response:", res.data);
        console.log(res.data.applications);
        if (res.data.success) {
          dispatch(setAllAppliedJobs(res.data.applications));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchAppliedJobs();
  }, [dispatch]);
  return null;
};

export default useGetAppliedJobs;
