import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { RiDeleteBin6Fill } from "react-icons/ri";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { TbMessageExclamation } from "react-icons/tb";

const MyArticles = () => {
  const [allArticles, setAllArticles] = useState([]);
  const [allDeclinedMessages, setAllDeclinedMessages] = useState([]);
  const [response, setResponse] = useState([]);
  const { user } = useContext(AuthContext);

  console.log(user);
  console.log(allArticles);
  console.log(allDeclinedMessages);
  console.log(response);

  const myArticels = allArticles.filter(
    (article) => article.author === user?.displayName
  );
  console.log(myArticels);

  const handleDeleteArticle = (article) => {
    console.log(article);
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
        fetch(
          `https://the-daily-news-server-xi.vercel.app/allArticles/${article._id}`,
          {
            method: "DELETE",
          }
        )
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount > 0) {
              Swal.fire(
                "Good job!",
                "Product has deleted from  the database!",
                "success"
              );
              const remaining = allArticles.filter(
                (item) => item._id !== article._id
              );
              setAllArticles(remaining);
            }
          });
      }
    });
  };

  const handleShowDeclinedMessage = (id) => {
    console.log(id);
    const declinedMessage = allDeclinedMessages.find(
      (message) => message.article_id === id
    );
    console.log(declinedMessage.response);
    setResponse(declinedMessage.response);
  };

  useEffect(() => {
    fetch("https://the-daily-news-server-xi.vercel.app/allArticlesData")
      .then((res) => res.json())
      .then((data) => setAllArticles(data));
  }, [user]);
  useEffect(() => {
    fetch("https://the-daily-news-server-xi.vercel.app/declinedMessages")
      .then((res) => res.json())
      .then((data) => setAllDeclinedMessages(data));
  }, []);
  return (
    <div>
      <table className="table table-lg table-zebra w-full text-lg font-bold">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Title</th>
            <th>Details </th>
            <th>Status</th>
            <th>Is Premium </th>
            <th>Update </th>
            <th>Delete </th>
          </tr>
        </thead>
        <tbody>
          {myArticels.map((article, index) => (
            <tr key={article._id}>
              <th>{index + 1} .</th>
              <td>{article.title}</td>
              <td>
                <button>
                  <Link to={`/articlesDetails/${article._id}`}>Details</Link>
                </button>
              </td>
              <td>
                {article.status === "declined" ? (
                  <h1 className="flex gap-5 items-center">
                    DECLINED
                    <button
                      className=""
                      onClick={() =>
                        document.getElementById("my_modal_2").showModal()
                      }
                    >
                      <span
                        className="text-4xl font-bold text-red-600"
                        onClick={() => {
                          handleShowDeclinedMessage(article._id);
                        }}
                      >
                        <TbMessageExclamation />
                      </span>
                    </button>
                    <dialog id="my_modal_2" className="modal">
                      <div className="modal-box border-error border-2">
                        <h3 className="font-bold text-2xl text-red-500 ">
                          Admin Response!
                        </h3>
                        <p className="py-8 text-black  text-xl font-semibold ">
                          {response}
                        </p>
                      </div>
                      <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                      </form>
                    </dialog>
                  </h1>
                ) : (
                  <h1>{article.status}</h1>
                )}
              </td>
              <td>{article.premium ? "TRUE" : "FALSE"}</td>
              <td>
                <button className="btn btn-ghost btn-lg">
                  <Link to={`/articleUpdate/${article._id}`}>
                    <FaEdit className="text-3xl  text-green-500 font-bold"></FaEdit>
                  </Link>
                </button>
              </td>
              <td>
                <button
                  onClick={() => handleDeleteArticle(article)}
                  className="btn btn-ghost btn-lg"
                >
                  <RiDeleteBin6Fill className="text-3xl text-red-800"></RiDeleteBin6Fill>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyArticles;
