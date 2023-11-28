import { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";

import Swal from "sweetalert2";
const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
console.log(imageHostingKey);

import Select from "react-select";

const UserArticleUpdate = () => {
    // const nevigate = useNavigate()
    const article = useLoaderData()
    console.log(article);
    
    const [title, setTitle] = useState(article.title);


    
    
    
     const [description, setDescription] = useState(article.description);
     const { user } = useContext(AuthContext);


    


     const handleSubmit = async (e) => {
       e.preventDefault();

       const articleData = {
         title,
         author: article.author,
         author_photoURL: article.author_photoURL,
         image_url: article.image_url,
         premium: article.premium,
         publisher: article.publisher,
         status: article.status,
         tags: article.tags,
         description,
       };

       console.log("Sending data to server:", articleData);

       try {
         const response = await fetch(
           `http://localhost:5000/allArticlesData/${article._id}`,
           {
             method: "PUT",
             headers: { "Content-Type": "application/json" },
             body: JSON.stringify(articleData),
           }
         );

         const data = await response.json();

         console.log("Response from server:", data);

         if (data.modifiedCount !== undefined && data.modifiedCount > 0) {
           Swal.fire(
             "Good job!",
             "Product has Updated in the database!",
             "success"
           );
         } else {
           Swal.fire(
             "Error!",
             "Failed to update product in the database",
             "error"
           );
         }
       } catch (error) {
         console.error("Error during fetch:", error);
         Swal.fire(
           "Error!",
           "Failed to update product in the database",
           "error"
         );
       }
     };

       
    

    return (
      <div>
        <h1 className="text-center text-5xl font-bold underline uppercase text-black pb-10">
          Update Your article
        </h1>
        <div>
          <div className="bg-green-100 py-16 rounded-xl">
            <div className="max-w-lg mx-auto">
              <h1 className="text-center font-bold text-2xl uppercase pb-8">
                Fill the form to add new articles
              </h1>
              <form onSubmit={handleSubmit}>
                <div className="flex  flex-col md:flex-row  items-center gap-10">
                  <label className="text-lg font-semibold ">Title:</label>
                  <input
                    className="input input-success w-full"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    required
                  />
                </div>

                <br />
                <div className="flex  flex-col md:flex-row  items-center gap-10">
                  <label className="text-lg font-semibold ">Image:</label>
                  <input
                                    type="file"
                                    
                                    accept="image/*"
                                    className=""
                                    value=""
                  />
                </div>
                <br />
                <div className="flex  flex-col md:flex-row  items-center gap-10">
                  <label className="text-lg font-semibold">Publisher:</label>
                  <Select
                    options=''
                    value=''
                    
                    isSearchable
                  />
                </div>
                <br />

                <div className="flex  flex-col md:flex-row  items-center gap-10">
                  <label className="text-lg font-semibold">Tags:</label>
                  <Select
                    options={[
                      { value: "technology", label: "technology" },
                      { value: "health", label: "health" },
                      { value: "wellness", label: "wellness" },
                      { value: "medical", label: "medical" },
                      { value: "innovation", label: "innovation" },
                      { value: "gadgets", label: "gadgets" },
                      { value: "buisness", label: "buisness" },
                      { value: "finance", label: "finance" },
                      { value: "economy", label: "economy" },
                      { value: "science", label: "science" },
                      { value: "discover", label: "discover" },
                      { value: "research", label: "research" },
                      { value: "celebrities", label: "celebrities" },
                      { value: "entertainment", label: "entertainment" },
                      { value: "movies", label: "movies" },
                      { value: "travel", label: "travel" },
                      { value: "adventure", label: "adventure" },
                      { value: "destiantion", label: "destiantion" },
                      { value: "food", label: "food" },
                      { value: "culinary", label: "culinary" },
                      { value: "recipes", label: "recipes" },
                      { value: "fashion", label: "fashion" },
                      { value: "trends", label: "trends" },
                      { value: "style", label: "style" },
                      { value: "art", label: "art" },
                      { value: "creativity", label: "creativity" },
                      { value: "education", label: "education" },
                      { value: "learning", label: "learning" },
                      { value: "environement", label: "environement" },
                      { value: "books", label: "books" },
                      { value: "reading", label: "reading" },
                    ]}
                    
                    
                    isMulti
                    isSearchable
                    className="react-select-container select-error"
                    classNamePrefix="react-select"
                  />
                </div>
                <br />
                <div className="flex  flex-col md:flex-row  items-center gap-10">
                  <label className="text-lg font-semibold ">Premium :</label>
                  <input
                    type="checkbox"
                    // checked="checked"
                    className="checkbox checkbox-success"
                    value=''
                    
                  />
                </div>

                <br />
                <div className="flex  flex-col md:flex-row  items-center gap-10">
                  <label className="text-lg font-semibold">Description:</label>
                  <input
                    type="text"
                    className="input input-success w-full"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description  "
                  />
                </div>
                <br />
                <button
                  type="submit"
                  className="btn btn-success uppercase text-xl font-bold "
                >
                  UPDATE
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
};

export default UserArticleUpdate;