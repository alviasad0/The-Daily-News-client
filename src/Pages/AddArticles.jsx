import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Select from "react-select";
import Swal from "sweetalert2";
import { AuthContext } from "../Providers/AuthProvider";

const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const AddArticle = () => {
  const [title, setTitle] = useState("");
 
  const [image, setImage] = useState(null);
  const [publisherOptions, setPublisherOptions] = useState([]);
  const [selectedPublisher, setSelectedPublisher] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [premium, setPremium] = useState(false);
  const [description, setDescription] = useState("");
    const { user} = useContext(AuthContext)

  useEffect(() => {
    axios
      .get("http://localhost:5000/allPublishers")
      .then((response) => {
        const options = response.data.map((publisher) => ({
          value: publisher.name,
          label: publisher.name,
        }));
        setPublisherOptions(options);
      })
      .catch((error) => console.error("Error fetching publishers", error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
       const imageFormData = new FormData();
       imageFormData.append("image", image);
       const imageUploadResponse = await axios.post(
         imageHostingApi,
         imageFormData
       );

       const articleData = {
         title,
         author: user?.displayName,
         author_photoURL: user?.photoURL,
         image_url: imageUploadResponse.data.data.display_url,
         publisher: selectedPublisher.value,
         tags: selectedTags.map((tag) => tag.value),
         premium,
         description,
         status: "pending",
       };

      console.log("Article FormData:", articleData);
      const articleSubmissionResponse = await axios.post(
        "http://localhost:5000/allArticles",
        articleData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
         console.log("Article FormData:", articleData);
         console.log(
           "Article submission response:",
           articleSubmissionResponse.data
         );

      if (articleSubmissionResponse.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Article is added to the menu.`,
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(
          "Article submission response:",
          articleSubmissionResponse.data
        );
      }
    //   console.log(articleFormData);
    } catch (error) {
      console.error("Error adding article", error);
    }
  };
  return (
    <div>
      <h1 className="text-center text-5xl font-bold text-black uppercase underline pb-16">
        Add Article
      </h1>
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
                onChange={(e) => setImage(e.target.files[0])}
                accept="image/*"
                className=""
                required
              />
            </div>
            <br />
            <div className="flex  flex-col md:flex-row  items-center gap-10">
              <label className="text-lg font-semibold">Publisher:</label>
              <Select
                options={publisherOptions}
                value={selectedPublisher}
                onChange={(selectedOption) =>
                  setSelectedPublisher(selectedOption)
                }
                isSearchable
                required
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
                value={selectedTags}
                onChange={(selectedOptions) => setSelectedTags(selectedOptions)}
                isMulti
                isSearchable
                className="react-select-container select-error"
                classNamePrefix="react-select"
                required
              />
            </div>
            <br />
            <div className="flex  flex-col md:flex-row  items-center gap-10">
              <label className="text-lg font-semibold ">Premium :</label>
              <input
                type="checkbox"
                // checked="checked"
                className="checkbox"
                value={premium}
                onChange={(e) => setPremium(e.target.value)}
                
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
                required
              />
            </div>
            <br />
            <button
              type="submit"
              className="btn btn-success uppercase text-xl font-bold "
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddArticle;
