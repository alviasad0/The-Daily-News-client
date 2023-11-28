import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { GrUpdate } from "react-icons/gr";
import { RiDeleteBin6Fill } from "react-icons/ri";
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
  }
  const handleUpdateArticle = (article) => { 
    console.log(article);
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
              <td><button>Details</button></td>
              <td>
                { article.status}
              </td>
              <td>
                { article.premium}
              </td>
              <td>
                <button
                  onClick={() => handleUpdateArticle(article)}
                  className="btn btn-ghost btn-lg"
                ><GrUpdate className="text-3xl  font-bold"></GrUpdate></button>
              </td>
              <td>
                <button
                  onClick={() => handleDeleteArticle(article)}
                  className="btn btn-ghost btn-lg"
                ><RiDeleteBin6Fill className="text-3xl text-red-800"></RiDeleteBin6Fill></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyArticles;