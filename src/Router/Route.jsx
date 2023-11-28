import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
// import AddArticles from "../Pages/AddArticles";
import AllArticles from "../Pages/AllArticles/AllArticles";
import MyArticles from "../Pages/MyArticles/MyArticles";
import Subscription from "../Pages/Subscription/Subscription";
import PremiumArticles from "../Pages/PremiumArticles/PremiumArticles";


import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import MyProfile from './../Pages/MyProfile/MyProfile';
import ArticlesDetails from './../Pages/ArticlesDetails/ArticlesDetails';
import Payment from './../Pages/Payment/Payment';
import AddArticles from "../Pages/AddArticles";
import UserArticleUpdate from './../Pages/MyArticles/Components/UserArticleUpdate';
import AllArticlesAdmin from './../Pages/Dashboard/DashBoardPages/AllArticlesAdmin/AllArticlesAdmin';
import Dashboard from './../Layout/Dashboard';
import AllUsers from './../Pages/Dashboard/DashBoardPages/AllUsers/AllUsers';
import AddPublishers from './../Pages/Dashboard/DashBoardPages/AddPublishers/AddPublishers';
import AdminHome from './../Pages/Dashboard/DashBoardPages/AdminHome/AdminHome';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
      {
        path: "addArticles",
        element: <AddArticles></AddArticles>,
      },
      {
        path: "allArticles",
        element: <AllArticles></AllArticles>,
      },
      {
        path: "myArticles",
        element: <MyArticles></MyArticles>,
      },
      {
        path: "subscriptions",
        element: <Subscription></Subscription>,
      },
      {
        path: "premiumArticles",
        element: <PremiumArticles></PremiumArticles>,
      },

      {
        path: "myProfile",
        element: <MyProfile></MyProfile>,
      },
      {
        path: "/payment",
        element: <Payment></Payment>,
      },
      {
        path: `/articlesDetails/:_id`,
        element: <ArticlesDetails></ArticlesDetails>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/allArticles/${params._id}`),
      },
      {
        path: `articleUpdate/:_id`,
        element: <UserArticleUpdate></UserArticleUpdate>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/allArticles/${params._id}`),
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "adminHome",
        element: <AdminHome></AdminHome>,
      },
      {
        path: "allArticles",
        element: <AllArticlesAdmin></AllArticlesAdmin>,
      },
      {
        path: "allUsers",
        element: <AllUsers></AllUsers>,
      },
      {
        path: "addPublisher",
        element: <AddPublishers></AddPublishers>,
      },
    ],
  },
]);

