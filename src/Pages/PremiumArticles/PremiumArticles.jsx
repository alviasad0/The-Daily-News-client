import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { TbPremiumRights } from "react-icons/tb";
import { Link } from "react-router-dom";

const PremiumArticles = () => {
  const [premiumArticles, setAllArticles] = useState([]);
  const [selectedPublisher, setSelectedPublisher] = useState(null);
  console.log(premiumArticles);
 

  useEffect(() => {
    fetch("http://localhost:5000/premiumArticles")
      .then((res) => res.json())
      .then((data) => setAllArticles(data));
  }, []);
  const filteredArticles = selectedPublisher
    ? premiumArticles.filter(
      (article) => article.publisher === selectedPublisher
    )
    : premiumArticles;

  const publishers = [
    ...new Set(premiumArticles.map((article) => article.publisher)),
  ];

    return (
      <div>
        <Helmet>
          <title>The Daily News | Premium Articles</title>
        </Helmet>
        <h1 className="text-center text-5xl font-bold text-black underline uppercase my-20">
          {" "}
          Premium Articles
        </h1>
        <div>
          <div className="flex flex-col md:flex-row gap-10 mb-10 ">
            <label className="text-3xl font-bold uppercase ">Filter by Publisher :</label>
            <select
              onChange={(e) => setSelectedPublisher(e.target.value)}
              value={selectedPublisher || ""}
              className="select select-success max-w-xs w-full text-black font-semibold text-xl"

            >
              <option value="">All Publishers</option>
              {publishers.map((publisher) => (
                <option key={publisher} value={publisher}>
                  {publisher}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {filteredArticles.map((article) => (
              <div key={article._id}>
                <div
                  className={
                    article.premium ? `bg-red-100 card` : `card bg-green-100`
                  }
                >
                  <figure className=" h-[350px] w-full">
                    <img
                      src={article.image}
                      className="w-full h-full"
                      alt="Shoes"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">{article.title}</h2>
                    <p>{article.description}</p>
                    <p>{article.publisher}</p>
                    <p className="">
                      {article.tags.map((tag) => (
                        <button
                          key={tag}
                          className="badge badge-success mr-2 text-lg font-medium"
                        >
                          {tag}
                        </button>
                      ))}
                    </p>
                    <p className="text-lg font-medium">
                      Total Views :{" "}
                      <span className="text-xl font-bold">
                        {article.totalViews}
                      </span>
                    </p>
                    {article.premium && (
                      <h1 className="text-xl font-bold upercase text-red-500 flex items-center">
                        <span>
                          <TbPremiumRights className="text-3xl"></TbPremiumRights>
                        </span>{" "}
                        Premium
                      </h1>
                    )}

                    <div className="card-actions justify-end">
                      <button className="btn btn-success tracking-widest  font-bold uppercase">
                        <Link to={`/articlesDetails/${article._id}`}>
                          View Details
                        </Link>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
};

export default PremiumArticles;