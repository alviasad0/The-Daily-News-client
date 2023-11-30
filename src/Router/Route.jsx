import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
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
import AdminHome from './../Pages/Dashboard/DashBoardPages/AdminHome/AdminHome';
import AddPublisher from './../Pages/Dashboard/DashBoardPages/AddPublishers/AddPublisher';
import PrivateRouter from "../PrivateRoute/PrivateRoute";
import PaymentSuccess from "../Pages/Payment/PaymentSuccess";

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
        element: (
          <PrivateRouter>
            <AddArticles></AddArticles>
          </PrivateRouter>
        ),
      },
      {
        path: "allArticles",
        element: <AllArticles></AllArticles>,
      },
      {
        path: "myArticles",
        element: (
          <PrivateRouter>
            <MyArticles></MyArticles>
          </PrivateRouter>
        ),
      },
      {
        path: "subscriptions",
        element: (
          <PrivateRouter>
            <Subscription></Subscription>
          </PrivateRouter>
        ),
      },
      {
        path: "premiumArticles",
        element: (
          <PrivateRouter>
            <PremiumArticles></PremiumArticles>
          </PrivateRouter>
        ),
      },

      {
        path: "myProfile",
        element: (
          <PrivateRouter>
            <MyProfile></MyProfile>
          </PrivateRouter>
        ),
      },
      {
        path: "/payment",
        element: (
          <PrivateRouter>
            <Payment></Payment>
          </PrivateRouter>
        ),
      },
      {
        path: "/paymentSuccess",
        element: (
          <PrivateRouter>
            <PaymentSuccess></PaymentSuccess>
          </PrivateRouter>
        ),
      },
      {
        path: `/articlesDetails/:_id`,
        element: (
          <PrivateRouter>
            <ArticlesDetails></ArticlesDetails>
          </PrivateRouter>
        ),
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
    element: (
      <PrivateRouter>
        <Dashboard></Dashboard>
      </PrivateRouter>
    ),

    children: [
      {
        path: "adminHome",
        element: <AdminHome></AdminHome>,
        default: true,
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
        element: <AddPublisher></AddPublisher>,
      },
    ],
  },
]);

