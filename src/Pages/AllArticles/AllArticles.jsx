import { useInfiniteQuery } from "@tanstack/react-query";
 import InfiniteScroll from "react-infinite-scroll-component";

import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { TbPremiumRights } from "react-icons/tb";



const getArticles = async ({ pageParam = 0 ,searchTitle, publisher, tags }) => {

   const queryParams = new URLSearchParams({
     limit: 10,
     offset: pageParam,
     searchTitle,
     publisher,
     tags,
   });
  const res = await fetch(
    `http://localhost:5000/searchArticles?${queryParams}`
  );
  const data = await res.json();

  return { data, prevOffset: pageParam };
};


const AllArticles = () => {
    
   const [searchTitle, setSearchTitle] = useState("");
   const [selectedPublisher, setSelectedPublisher] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [allPublishers, setPublishers] = useState([]);
  


   const { data, fetchNextPage, hasNextPage, refetch } = useInfiniteQuery({
     queryKey: ["articles"],
     queryFn: ({ pageParam }) =>
       getArticles({
         pageParam,
         searchTitle,
         publisher: selectedPublisher,
         tags: selectedTags.join(",") ||[],
       }),
     getNextPageParam: (lastPage, allPages) => {
       console.log(allPages);

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


  const handleSearchChange = (searchTerm) => {
    setSearchTitle(searchTerm);
    
    refetch();
  };

  useEffect(() => {
    fetch("http://localhost:5000/allPublishers")
      .then((res) => res.json())
      .then((data) => setPublishers(data));
  },[])
  console.log(allPublishers);

  return (
    <div className="mt-20">
      <Helmet>
        <title>The Daily News | All Articles</title>
      </Helmet>
      <h1 className="text-center text-5xl font-bold text-black uppercase underline  ">
        {" "}
        all articles added by the admin
      </h1>

      <div className="mt-10">
        <h1 className="text-2xl text-black font-bold">
          You can search by Name , filter by tags and Publishers
        </h1>
        <div className="flex flex-col md:flex-row  mb-10 mt-5 gap-10 ">
          <input
            type="text"
            placeholder="Search by title"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            className="input input-bordered input-success w-full max-w-xs"
          />
          <select
            value={selectedPublisher}
            onChange={(e) => setSelectedPublisher(e.target.value)}
            className="select select-bordered select-success w-full max-w-xs"
          >
            <option value="">All Publishers</option>
            {allPublishers.map((publishers) => (
              <option value={publishers.name} key={publishers._id}>
                {publishers.name}
              </option>
            ))}
          </select>
          <select
            multiple
            value={selectedTags}
            onChange={(e) =>
              setSelectedTags(
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
            className="select select-success select-bordered w-full max-w-xs"
          >
            <option value="technology">technology</option>
            <option value="health">health</option>
            <option value="wellness">wellness</option>
            <option value="medical">medical</option>
            <option value="innovation">innovation</option>
            <option value="gadgets">gadgets</option>
            <option value="buisness">buisness </option>
            <option value="finance">finance</option>
            <option value="economy">economy</option>
            <option value="science">science</option>
            <option value="discover">discover </option>
            <option value="research">research</option>
            <option value="celebrities">celebrities</option>
            <option value="entertainment">entertainment</option>
            <option value="movies">movies</option>
            <option value="travel">travel </option>
            <option value="adventure">adventure</option>
            <option value="destiantion">destiantion</option>
            <option value="food">food </option>
            <option value="culinary">culinary</option>
            <option value="recipes">recipes</option>
            <option value="fashion">fashion</option>
            <option value="trends">trends</option>
            <option value="style">style</option>
            <option value="art">art</option>
            <option value="creativity">creativity</option>
            <option value="education">education</option>
            <option value="learning">learning</option>
            <option value="environement">environement</option>
            <option value="books">books</option>
            <option value="reading">reading</option>
            <option value="mental health">mental health</option>
          </select>
          <button
            onClick={() => handleSearchChange()}
            className="btn btn-success text-xl font-bold uppercase"
          >
            Load More
          </button>
        </div>
      </div>
      <div className="  mt-10">
        <InfiniteScroll
          dataLength={articles ? articles.length : 0}
          next={() => fetchNextPage()}
          hasMore={hasNextPage}
          loading={<h1 className="text-7xl">loading</h1>}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {articles && articles.length > 0 ? (
              articles.map((article) => (
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
