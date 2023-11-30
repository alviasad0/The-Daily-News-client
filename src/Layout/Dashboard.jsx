import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import { IoPersonAdd } from "react-icons/io5";
import { RiArticleFill, RiMenu2Fill } from "react-icons/ri";
import { Helmet } from "react-helmet";
import Navbar from "../Pages/Shared/Navbar";
import Footer from "../Pages/Shared/Footer";
import { useEffect } from "react";


const Dashboard = () => {
     const navigate = useNavigate();

     // This will navigate to "adminHome" when the Dashboard component is mounted
     useEffect(() => {
       navigate("/dashboard/adminHome");
     }, []);
    return (
      <div>
        <Helmet>
          <title>The Daily News | Dashboard</title>
        </Helmet>
        <Navbar></Navbar>
        <div className="flex h-auto md:gap-10">
          <div className="contents md:hidden dropdown">
            <div tabIndex={0} role="button" className="btn m-1">
              <RiMenu2Fill />
            </div>
            <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <NavLink className=" font-bold " to="/dashboard/adminHome">
                  {/* <IoMdHome /> */}
                  Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink className=" font-bold " to="/dashboard/allArticles">
                  <RiArticleFill />
                  All Articles
                </NavLink>
              </li>

              <li>
                <NavLink className=" font-bold " to="/dashboard/allUsers">
                  <FaUsers />
                  All Users
                </NavLink>
              </li>
              <li>
                <NavLink className=" font-bold " to="/dashboard/addPublisher">
                  <IoPersonAdd />
                  Add Publisher
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="hidden md:contents md:w-64 min-h-full bg-green-100 rounded-xl text-main-blue-50">
            <ul className="menu text-xl  mb-5 p-4">
              <li>
                <NavLink className=" font-bold " to="/dashboard/adminHome">
                  {/* <IoMdHome /> */}
                  Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink className=" font-bold " to="/dashboard/allArticles">
                  <RiArticleFill />
                  All Articles
                </NavLink>
              </li>

              <li>
                <NavLink className=" font-bold " to="/dashboard/allUsers">
                  <FaUsers />
                  All Users
                </NavLink>
              </li>
              <li>
                <NavLink className=" font-bold " to="/dashboard/addPublisher">
                  <IoPersonAdd />
                  Add Publisher
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="flex-1 bg-main-blue-100">
            <Outlet></Outlet>
          </div>
        </div>
        <Footer></Footer>
      </div>
    );
};

export default Dashboard;
