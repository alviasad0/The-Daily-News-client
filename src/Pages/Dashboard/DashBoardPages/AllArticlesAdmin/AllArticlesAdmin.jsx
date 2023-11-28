import axios from "axios";
import { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";

const AllArticlesAdmin = () => {
  const [allArticles, setAllArticles] = useState([]);
  const [response, setResponse] = useState("");
  console.log(allArticles);

  const handleDelete = (id) => {
      console.log(id);
      Swal.fire({
          title: "Are you sure?",
          text: "Remove from the cart !!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
      }).then((result) => {
          if (result.isConfirmed) {
              fetch(`http://localhost:5000/allArticlesData/${id}`, {
                method: "DELETE",
              })
                .then((response) => response.json())
                .then((data) => {
                  console.log(data);
                  if (data.deletedCount > 0) {
                    Swal.fire(
                      "Good job!",
                      "Product has deleted from  the database!",
                      "success"
                    );
                  }
                });
          }
          
      })
      
    };
  const handlePremium = async(article) => {
    console.log(article);
    const articleData = {
      title: article.title,
      author: article.author,
      author_photoURL: article.author_photoURL,
      image: article.image,
      premium: true,
      publisher: article.publisher,

      tags: article.tags,
      description: article.description,
      status: article.status,
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
        const updatedArticlesResponse = await fetch(
          "http://localhost:5000/allArticlesData"
        );
        const updatedArticlesData = await updatedArticlesResponse.json();

        setAllArticles(updatedArticlesData);

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
      Swal.fire("Error!", "Failed to update product in the database", "error");
    }
  };
  const handleStatus = async (article) => {
    console.log(article);
    const articleData = {
      title: article.title,
      author: article.author,
      author_photoURL: article.author_photoURL,
      image: article.image,
      premium: article.premium,
      publisher: article.publisher,

      tags: article.tags,
      description: article.description,
      status: "approved",
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
        const updatedArticlesResponse = await fetch(
          "http://localhost:5000/allArticlesData"
        );
        const updatedArticlesData = await updatedArticlesResponse.json();

        setAllArticles(updatedArticlesData);

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
      Swal.fire("Error!", "Failed to update product in the database", "error");
    }
  };

  const handleSendReason = async (article) => {
    const declinedMessage = {
      article_id: article._id,
      response: response,
    };
    console.log(declinedMessage);
    const declinedMessageSubmissionResponse = await axios.post(
      "http://localhost:5000/declinedMessages",
      declinedMessage,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Article FormData:", declinedMessage);
    console.log(
      "Article submission response:",
      declinedMessageSubmissionResponse.data
    );

    if (declinedMessageSubmissionResponse.data.insertedId) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `Declined message send.`,
        showConfirmButton: false,
        timer: 1500,
      });
      const articleData = {
        title: article.title,
        author: article.author,
        author_photoURL: article.author_photoURL,
        image: article.image,
        premium: article.premium,
        publisher: article.publisher,

        tags: article.tags,
        description: article.description,
        status: "declined",
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
          const updatedArticlesResponse = await fetch(
            "http://localhost:5000/allArticlesData"
          );
          const updatedArticlesData = await updatedArticlesResponse.json();

          setAllArticles(updatedArticlesData);

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

      console.log(
        "Article submission response:",
        declinedMessageSubmissionResponse.data
      );
    }
  };

  useEffect(() => {
    fetch("http://localhost:5000/allArticlesData")
      .then((res) => res.json())
      .then((data) => setAllArticles(data));
  }, []);
    
     useEffect(() => {
       fetch("http://localhost:5000/allArticlesData")
         .then((res) => res.json())
         .then((data) => setAllArticles(data));
     }, [allArticles]);
  return (
    <div>
      <div>
        <div className="overflow-x-auto">
          <table className="table bg-green-100 text-main-blue-50">
            {/* head */}
            <thead>
              <tr>
                <th>
                  <label>
                    <input
                      type="checkbox"
                      className="checkbox text-main-blue-50"
                    />
                  </label>
                </th>
                <th className="text-main-blue-50">Author</th>
                <th className="text-main-blue-50">Title</th>
                <th className="text-main-blue-50">Posted Date</th>
                <th className="text-main-blue-50">Publisher</th>
                <th className="text-main-blue-50">isPremium</th>
                <th className="text-main-blue-50">Status</th>

                <th className="text-main-blue-50">Decline</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {allArticles.map((article) => (
                <tr key={article?._id}>
                  <th>
                    <RiDeleteBin6Line
                      onClick={() => handleDelete(article?._id)}
                      size={23}
                      className="text-[#ff3131] cursor-pointer"
                    />
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={article?.author_photoURL}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>

                      <div>
                        <div className="font-bold text-main-blue-50">
                          {article?.author}
                        </div>
                        <div className="text-sm opacity-70">
                          {article?.author_email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {article?.title}
                    <br />
                  </td>
                  <td>{article.posting_date}</td>
                  <td>{article?.publisher}</td>
                  <td>
                    {article?.premium ? (
                      <h1 className="font-bold text-violet-800">Premium</h1>
                    ) : (
                      <button
                        onClick={() => handlePremium(article)}
                        className="w-20 font-bold py-3 rounded-lg text-main-blue-50 bg-gradient-to-r from-[#6ba5ef] to-[#3367dd]"
                      >
                        Make Premium
                      </button>
                    )}
                  </td>
                  <td>
                    {article?.status === "approved" ? (
                      <h1 className="font-bold text-green-800"> Approved</h1>
                    ) : (
                      <button
                        onClick={() => handleStatus(article)}
                        className="w-20 font-bold py-3 rounded-lg text-main-blue-50 bg-gradient-to-r from-green-100 to-green-600"
                      >
                        Approve Article
                      </button>
                    )}
                  </td>
                  <th>
                    {article.status === "approved" ? (
                      <div>
                        {" "}
                        <button
                          className=" w-20 font-bold py-3 rounded-lg text-main-blue-50 bg-gradient-to-r from-[#e75050] to-[#dd3333]"
                          onClick={() =>
                            document.getElementById(article?._id).showModal()
                          }
                        >
                          Declined
                        </button>
                        <dialog id={article?._id} className="modal">
                          <div className="modal-box">
                            <h3 className="font-bold text-main-blue-950 text-lg">
                              Reason for Decline
                            </h3>

                            <input
                              type="text"
                              name="reason"
                              placeholder="Reason...."
                              onChange={(e) => setResponse(e.target.value)}
                              className="input mt-4 input-bordered border-2 text-main-blue-950 border-main-blue-300 rounded-lg w-full "
                            />
                            <button
                              onClick={() => handleSendReason(article)}
                              className=" px-6 mt-5 font-bold py-3 rounded-lg text-main-blue-50 bg-gradient-to-r from-[#e75050] to-[#dd3333]"
                            >
                              Send
                            </button>

                            <p className="py-4 text-main-blue-950">
                              Press ESC key or click outside to close
                            </p>
                          </div>
                          <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                          </form>
                        </dialog>
                      </div>
                    ) : (
                      <h1 className="text-red-600">Declined</h1>
                    )}
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllArticlesAdmin;
