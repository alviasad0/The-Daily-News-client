import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllPublishers = () => {
  const [allPublishers, setAllPublishers] = useState([]);

  console.log(allPublishers);

  useEffect(() => {
    fetch("https://the-daily-news-server-xi.vercel.app/allPublishers")
      .then((res) => res.json())
      .then((data) => setAllPublishers(data));
  }, []);

  return (
    <div className="mt-20">
      <h1 className="text-center text-5xl font-bold underline mb-10 text-black ">
        The Publishers{" "}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {allPublishers.map((publishers) => (
          <div key={publishers._id} className="card  bg-green-100 text-black">
            <div className="card-body">
              <figure className="w-[300px] rounded-xl h-[200px] mx-auto">
                <img src={publishers.image} className="w-full h-full" alt="" />
              </figure>
              <h2 className="text-2xl font-bold pt-5">{publishers.name}</h2>
              <p className="text-md text-black font-medium ">
                {publishers.description}
              </p>
              <p className="font-semibold ">
                Website :{" "}
                <span className="font-bold">
                  <a href="">{publishers.website}</a>
                </span>
              </p>
              <p className="">
                {publishers?.tags?.map((tag) => (
                  <button
                    key={tag}
                    className="badge badge-success mr-2 text-lg font-medium"
                  >
                    {tag}
                  </button>
                ))}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllPublishers;
