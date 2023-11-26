import { useInfiniteQuery } from "@tanstack/react-query";
 import InfiniteScroll from "react-infinite-scroll-component";

import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";



const getArticles = async ({ pageParam = 0 }) => {
  const res = await fetch(
    `http://localhost:5000/allArticles?limit=10&offset=${pageParam}`
  );
  const data = await res.json();

  return { data, prevOffset: pageParam };
};


const AllArticles = () => {
  
   const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
     queryKey: ["articles"],
     queryFn: getArticles,
     getNextPageParam: (lastPage, allPages) => {
      console.log( allPages);
       
       if (lastPage.prevOffset + 10 > lastPage.articlesCount) {
                return false;
            }
            return lastPage.prevOffset + 10;
        
     },
   });
   console.log(data);
   const articles = data?.pages.reduce((acc, page) => {
    console.log(page?.data);
     return [...acc, ...page?.data || []];
   }, []);
  console.log(hasNextPage);
  return (
    <div className="mt-20">
      <Helmet>
        <title>The Daily News | All Articles</title>
      </Helmet>
      <h1 className="text-center text-5xl font-bold text-black uppercase underline  ">
        {" "}
        all articles added by the admin
      </h1>
      <div className="  mt-10">
        <InfiniteScroll
          dataLength={articles ? articles.length : 0}
          next={() => fetchNextPage()}
          hasMore={hasNextPage}
          loading={<h1 className="text-7xl">loading</h1>}
        >
          <div className="grid grid-cols-3 gap-10">
            {articles && articles.length > 0 ? (
              articles.map((article) => (
                <div key={article._id}>
                  <div className="card  bg-green-100 ">
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
              ))
            ) : (
              <div>no articles found </div>
            )}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default AllArticles;
