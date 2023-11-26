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

import Dashboard from "../Pages/Dashboard/Dashboard";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import MyProfile from './../Pages/MyProfile/MyProfile';
import ArticlesDetails from './../Pages/ArticlesDetails/ArticlesDetails';

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
      //   {
      //     path: "addArticles",
      //     element: <AddArticles></AddArticles>,
      //   },
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
        path: "dashboard",
        element: <Dashboard></Dashboard>,
      },
      {
        path: "myProfile",
        element: <MyProfile></MyProfile>,
      },
      {
        path: `/articlesDetails/:_id`,
        element: <ArticlesDetails></ArticlesDetails>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/allArticles/${params._id}`),
      },
    ],
  },
]);

