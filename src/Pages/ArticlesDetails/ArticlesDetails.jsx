import { useContext, useEffect } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";


const ArticlesDetails = () => {
    const article = useLoaderData()
    const {user} = useContext(AuthContext)
    console.log(article, user);
    

    useEffect(() => {

        const updateViewCount = async () => {
          try {
            
            const response = await fetch(
              `http://localhost:5000/allArticles/${article._id}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                
              }
            );

            if (!response.ok) {
              
              console.error("Failed to update view count");
            }
          } catch (error) {
            console.error("Error updating view count", error);
          }
        };

        updateViewCount();
    }, [article._id]);
    return (
      <div>
        <h1>this is the article details page </h1>
        <div >
          <div className="card  bg-green-100 ">
            <figure className=" h-[350px] w-full">
              <img src={article.image} className="w-full h-full" alt="Shoes" />
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
                <span className="text-xl font-bold">{article.totalViews}</span>
              </p>

              <div className="card-actions justify-end">
                <button className="btn btn-success tracking-widest  font-bold uppercase">
                  <Link to={`/articlesDetails/${article._id}`}>
                    book now
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default ArticlesDetails;