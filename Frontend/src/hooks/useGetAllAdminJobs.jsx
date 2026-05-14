import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { JOB_API_ENDPOINT } from "../../utils/data";
import { useDispatch } from "react-redux";
import { setAllAdminJobs } from "../redux/jobSlice";

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/get`, {
          withCredentials: true,
        });
        console.log(res.data);
        if (res.data.success) {
          dispatch(setAllAdminJobs(res.data.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllAdminJobs();
  }, [dispatch]);
};
export default useGetAllAdminJobs;
