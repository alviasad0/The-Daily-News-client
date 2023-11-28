import axios from "axios";
import { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";

const AllArticlesAdmin = () => {
    const [allArticles, setAllArticles] = useState([]);
    const [response, setResponse] = useState("");
    console.log(allArticles);
    



    const handleDelete = id => {
        console.log(id);
  }
    const handlePremium = (id) => {
      console.log(id);
    };
    const handleStatus = (id) => {
      console.log(id);
    };
    const handleSendReason = async(id) => {

        
        const declinedMessage = {
            article_id: id,
            response: response
        }
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
                          onClick={() => handlePremium(article?._id)}
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
                          onClick={() => handleStatus(article?._id)}
                          className="w-20 font-bold py-3 rounded-lg text-main-blue-50 bg-gradient-to-r from-green-100 to-green-600"
                        >
                          Approve Article
                        </button>
                      )}
                    </td>
                    <th>
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
                              onClick={() => handleSendReason(article?._id)}
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