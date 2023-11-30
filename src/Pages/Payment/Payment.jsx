import  { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handlePayment = () => {
    
    navigate("/paymentSuccess");
  };

  return (
    <div className="bg-green-100 pb-20   rounded-xl justify-center">
      <Helmet>
        <title>The Daily News | Payment</title>
      </Helmet>
      <h1 className="text-center   text-black font-bold text-5xl uppercase py-10">
        Payment Details
      </h1>

      <div className="max-w-md mx-auto mt-10 p-6 bg-base-100 rounded-xl  border-green-600 border-2">
        <label className="block text-lg font-semibold text-gray-700">
          Card Number
        </label>
        <input
          type="text"
          className=" w-full  input input-success"
          placeholder="Enter your card number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />

        <div className="flex mt-4">
          <div className="w-1/2 pr-2">
            <label className="block text-lg font-semibold text-gray-700">
              Expiry Date
            </label>
            <input
              type="text"
              className=" w-full  input input-success"
              placeholder="MM/YY"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
            />
          </div>
          <div className="w-1/2 pl-2">
            <label className="block text-lg font-semibold text-gray-700">
              CVV
            </label>
            <input
              type="text"
              className=" w-full  input input-success"
              placeholder="Enter CVV"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-center ">
          <button
            onClick={handlePayment}
            className="btn btn-success text-xl font-bold mt-5 "
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
