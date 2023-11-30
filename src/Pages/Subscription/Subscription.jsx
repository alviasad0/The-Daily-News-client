import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";

const Subscription = () => {
  const navigate = useNavigate();
  const [allUsers, setAllUsers] = useState([]);
  const { user } = useContext(AuthContext);

  const logedinUser = user
    ? allUsers.find((u) => u?.email === user?.email)
    : null;

  const [selectedPeriod, setSelectedPeriod] = useState("");

  const handleSubscribe = async () => {
    if (!selectedPeriod) {
      alert("Please select a subscription period");
      return;
    }

    await fetch("https://the-daily-news-server-xi.vercel.app/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: logedinUser?._id,
        period: selectedPeriod,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        navigate("/payment");
      })
      .catch((error) => {
        console.error("Error subscribing:", error);
        alert("An error occurred while subscribing. Please try again.");
      });
  };

  useEffect(() => {
    fetch("https://the-daily-news-server-xi.vercel.app/users")
      .then((res) => res.json())
      .then((data) => setAllUsers(data));
  }, []);

  const subscriptionOptions = [
    {
      value: "1min",
      label: "1 Minute",
      details: "Get a quick glimpse of our content for 1 minute!",
      color: "#FFD700", // Gold color
    },
    {
      value: "5days",
      label: "5 Days",
      details: "Enjoy unlimited access for 5 days with exclusive content!",
      color: "#87CEEB", // Sky Blue color
    },
    {
      value: "1week",
      label: "1 Week",
      details: "Access all content for 1 week and stay updated!",
      color: "#90EE90",
    },
    {
      value: "1month",
      label: "1 Month",
      details: "Subscribe for a month and experience our premium content!",
      color: "#FFA07A",
    },
  ];

  return (
    <div>
      <Helmet>
        <title>The Daily News | Subscriptions</title>
      </Helmet>
      <img src="https://i.ibb.co/HVQ91PM/4953844.jpg" alt="" />
      <h1 className="text-center text-black font-bold text-5xl uppercase pt-10">
        Special offer is going on
      </h1>
      <h1 className="text-2xl text-red-500 text-center font-bold uppercase pt-5 pb-20">
        ---Grab it now---
      </h1>

      <div className="flex flex-col md:flex-row items-center gap-5  justify-center">
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="select select-success w-[300px] md:w-[700px] text-black font-medium  text-lg "
        >
          <option value="">Select Subscription Period</option>
          {subscriptionOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <button
          onClick={handleSubscribe}
          className="btn btn-success text-xl font-fold uppercase tracking-lg  "
        >
          Subscribe Now
        </button>
      </div>

      <div className="pt-20 ">
        <h1 className="text-center pb-10 font-bold text-5xl text-black underline uppercase">
          our packages
        </h1>
        <div className="flex flex-wrap justify-center items-center gap-5">
          {subscriptionOptions.map((option) => (
            <div
              key={option.value}
              className="rounded-xl p-8 text-black text-center"
              style={{ backgroundColor: option.color }}
            >
              <h2 className="text-2xl font-bold">{option.label}</h2>
              <p className="text-lg">{option.details}</p>
              <button
                onClick={() => {
                  setSelectedPeriod(option.value);
                  handleSubscribe();
                }}
                className="btn btn-success mt-4"
              >
                Subscribe Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Subscription;
