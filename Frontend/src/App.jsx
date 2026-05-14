import { Button } from "@/components/ui/button";
import Navbar from "./components/components_lite/Navbar";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./components/components_lite/Home";
import PrivacyPolicy from "./components/components_lite/PrivacyPolicy";
import Jobs from "./components/components_lite/Jobs.jsx";
import Browse from "./components/components_lite/Browse.jsx";
import Profile from "./components/components_lite/Profile.jsx";
import Description from "./components/components_lite/Description.jsx";
import Companies from "./components/adminComponents/Companies.jsx";
import CompanyCreate from "./components/adminComponents/CompanyCreate.jsx";
import CompanySetup from "./components/adminComponents/CompanySetup.jsx";
import AdminJobs from "./components/adminComponents/AdminJobs.jsx";
import PostJob from "./components/adminComponents/PostJob.jsx";
import Applicants from "./components/adminComponents/Applicants.jsx";
import ProtectedRoute from "./components/adminComponents/ProtectedRoute.jsx";
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/PrivacyPolicy",
    element: <PrivacyPolicy />,
  },
  {
    path: "/Jobs",
    element: <Jobs />,
  },
  {
    path: "/Home",
    element: <Home />,
  },
  {
    path: "/Browse",
    element: <Browse />,
  },
  {
    path: "/Profile",
    element: <Profile />,
  },
  {
    path: "/description/:id",
    element: <Description />,
  },

  //admin
  {
    path: "/admin/companies",
    element: (
      <ProtectedRoute>
        <Companies />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/companies/create",
    element: (
      <ProtectedRoute>
        {" "}
        <CompanyCreate />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/create",
    element: (
      <ProtectedRoute>
        {" "}
        <PostJob />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/companies/:id",
    element: (
      <ProtectedRoute>
        {" "}
        <CompanySetup />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs",
    element: (
      <ProtectedRoute>
        <AdminJobs />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: (
      <ProtectedRoute>
        <Applicants />
      </ProtectedRoute>
    ),
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={appRouter}></RouterProvider>
    </>
  );
}

export default App;
