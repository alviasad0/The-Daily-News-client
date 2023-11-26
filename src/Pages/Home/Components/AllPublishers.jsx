import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllPublishers = () => {
   const [allPublishers, setAllPublishers] = useState([]);

   console.log(allPublishers);
    

  useEffect(() => {
    fetch("http://localhost:5000/allPublishers")
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
                <h2 className="card-title">{publishers.name}</h2>
                <p>{publishers.description}</p>
                <p>{publishers.website}</p>
                <p className="">
                  {publishers.tags.map((tag) => (
                    <button
                      key={tag}
                      className="badge badge-success mr-2 text-lg font-medium"
                    >
                      {tag}
                    </button>
                  ))}
                </p>
                <div className="card-actions justify-end">
                  <button className="btn">
                    <Link >View Details</Link>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
};

export default AllPublishers;