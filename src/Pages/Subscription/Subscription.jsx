import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import {  useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";

const Subscription = () => {
  const navigate = useNavigate();
   const [allUsers, setAllUsers] = useState([]);
   const { user } = useContext(AuthContext);
   console.log(user);

   const logedinUser = allUsers.find((users) => users?.email === user?.email);
   console.log(logedinUser);
   
   
   const [selectedPeriod, setSelectedPeriod] = useState('');
   
   const handleSubscribe = () => {
    if (!selectedPeriod) {
      alert('Please select a subscription period');
      return;
    }

    
    fetch('http://localhost:5000/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: `${logedinUser._id}`, 
        period: selectedPeriod,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        
        navigate("/payment");
      })
      .catch((error) => {
        console.error('Error subscribing:', error);
      });
  }
useEffect(() => {
  fetch("http://localhost:5000/users")
    .then((res) => res.json())
    .then((data) => setAllUsers(data));
}, []);

    return (
      <div>
        <Helmet>
          <title>The Daily News | Subscriptions</title>
        </Helmet>
        <img src="https://i.ibb.co/HVQ91PM/4953844.jpg" alt="" />
        <h1 className="text-center text-black font-bold   text-5xl uppercase pt-10">
          special offer is Going on
        </h1>
        <h1 className="text-2xl text-red-500 text-center font-bold uppercase pt-5 pb-20">
          ---Grab it now---
        </h1>

        <div className="rounded-xl">
          <div
            className="hero h-[200px] rounded-xl"
            style={{
              backgroundImage: "url(https://i.ibb.co/LrXGYft/7701.jpg)",
            }}
          >
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content rounded-xl">
              <div className="">
                <div className="flex flex-col md:flex-row items-center gap-5 ">
                  <select
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    className="select select-success w-[300px] md:w-[700px] text-black font-medium"
                  >
                    <option value="">Select Subscription Period</option>
                    <option value="1min">1 Minute</option>
                    <option value="5days">5 Days</option>
                    <option value="1week">1 Week</option>
                    <option value="1month">1 Month</option>
                  </select>
                  <button
                    onClick={handleSubscribe}
                    className="btn btn-success text-xl font-fold uppercase tracking-lg "
                  >
                    Subscribe Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Subscription;