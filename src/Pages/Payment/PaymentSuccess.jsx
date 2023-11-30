import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-green-100  flex items-center py-20 rounded-xl justify-center">
      <Helmet>
        <title>The Daily News | Payment Success</title>
      </Helmet>
      <div className="max-w-xl mx-auto p-8  bg-white border-2 border-green-500 rounded-xl shadow-md text-center">
        <svg
          className="text-green-500 w-16 h-16 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          ></path>
        </svg>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Payment Successful!
        </h1>
        <p className="text-gray-600">
          Thank you for your payment. Your subscription is now active!
        </p>

        <button
          onClick={() => navigate("/")}
          className="btn btn-success text-xl font-bold mt-5"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
