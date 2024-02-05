import React from "react";
import Navbar from "./Navbar";
import DashboardSidebar from "./DashboardSidebar";
// const SearchBar = lazy(() => import("./DashboardSidebar"));
import Footer from "./Footer";
import { Outlet, Routes, useParams } from "react-router-dom";
import ErrorBoundary from "../Settings/ErrorBoundary";

const Dashboard = () => {
  return (
    <div className="flex flex-grow">
      <DashboardSidebar />
      <div className="flex flex-col w-full h-screen">
        <Navbar />
        <div className="lg:p-2 main flex-grow max-h-screen overflow-auto" id="pageContent">
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
