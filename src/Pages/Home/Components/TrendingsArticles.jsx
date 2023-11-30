import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";

const TrendingsArticles = () => {
  const [allArticles, setArticles] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const { user } = useContext(AuthContext);
  console.log(user);

  const logedinUser = allUsers.find((users) => users?.email === user?.email);
  console.log(logedinUser);

  console.log(allArticles);
  const sortedData = allArticles.sort((a, b) => b.totalViews - a.totalViews);

  const trendingsArticles = sortedData.slice(0, 6);
  console.log(trendingsArticles);

  useEffect(() => {
    fetch("https://the-daily-news-server-xi.vercel.app/allArticles")
      .then((res) => res.json())
      .then((data) => setArticles(data));
  }, []);

  useEffect(() => {
    fetch("https://the-daily-news-server-xi.vercel.app/users")
      .then((res) => res.json())
      .then((data) => setAllUsers(data));
  }, []);
  return (
    <div className="mt-20 ">
      <h1 className="text-center text-black underline text-5xl font-bold pb-10 uppercase">
        Most Tranding News{" "}
      </h1>
      <Swiper
        slidesPerView={3}
        spaceBetween={40}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {trendingsArticles.map((article) => (
          <SwiperSlide key={article._id}>
            <div>
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
                    {article?.tags?.map((tag) => (
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

                  <div className="card-actions justify-end">
                    {article.premium && !logedinUser?.premiumTaken ? (
                      <button
                        disabled
                        className="btn btn-success tracking-widest  font-bold uppercase"
                      >
                        <Link to={`/articlesDetails/${article._id}`}>
                          View Details
                        </Link>
                      </button>
                    ) : (
                      <button className="btn btn-success tracking-widest  font-bold uppercase">
                        <Link to={`/articlesDetails/${article._id}`}>
                          View Details
                        </Link>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TrendingsArticles;
