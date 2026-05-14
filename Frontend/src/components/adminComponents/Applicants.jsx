import React, { useEffect } from "react";
import Navbar from "../components_lite/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { APPLICATION_API_ENDPOINT } from "../../../utils/data";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "../../redux/applicationSlice";

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_ENDPOINT}/${params.id}/applicants`,
          {
            withCredentials: true,
          }
        );
        dispatch(setAllApplicants(res.data.job));
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllApplicants();
  }, [params.id, dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-indigo-50 to-purple-50">
      <Navbar />
      <div className="max-w-7xl mx-auto py-10 px-4">
        <h1 className="font-bold text-2xl mb-6 text-gray-800">
          Applicants{" "}
          <span className="text-blue-600">
            {applicants?.applications?.length || 0}
          </span>
        </h1>
        <ApplicantsTable />
      </div>
    </div>
  );
};

export default Applicants;
