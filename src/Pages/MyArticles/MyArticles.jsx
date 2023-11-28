import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { RiDeleteBin6Fill } from "react-icons/ri";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
const MyArticles = () => {
 const [allArticles, setAllArticles] = useState([]);
  const { user } = useContext(AuthContext);
 console.log(user);
console.log(allArticles);
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
           `http://localhost:5000/allArticles/${article._id}`,
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
  }
 
  useEffect(() => {
    fetch("http://localhost:5000/allArticlesData")
      .then((res) => res.json())
      .then((data) => setAllArticles(data));
  },[user])
  return (
    <div>
      <table className="table table-zebra w-full text-lg font-bold">
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
              <td>{article.status}</td>
              <td>{article.premium ? "true" : "false"}</td>
              <td>
                <button className="btn btn-ghost btn-lg">
                  <Link to={`/articleUpdate/${article._id}`}>
                    <FaEdit className="text-3xl  font-bold"></FaEdit>
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