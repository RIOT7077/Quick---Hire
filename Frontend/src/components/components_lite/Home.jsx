import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Header from "./Header";
import Categories from "./Categories";
import LatestJobs from "./LatestJobs";
import Footer from "./Footer";
import useGetAllJobs from "../../hooks/useGetAllJobs";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);

  useEffect(() => {
    if (user && user.role === "Recruiter") {
      navigate("/admin/companies");
    }
  }, []);

  useGetAllJobs();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <main className="flex-grow space-y-20">
      <Navbar />
        <Header />
        <Categories />
        <LatestJobs />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
