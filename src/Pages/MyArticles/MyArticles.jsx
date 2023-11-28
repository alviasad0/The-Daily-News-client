import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";

const MyArticles = () => {
 const [allArticles, setAllArticles] = useState([]);
 const { user } = useContext(AuthContext);
 console.log(user);

const myArticels = allArticles.filter   



  useEffect(() => {
    fetch("http://localhost:5000/allArticles")
      .then((res) => res.json())
      .then((data) => setAllArticles(data));
  },[])
  return (
    <div>
      <table className="table table-zebra w-full">
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
          {users.map((user, index) => (
            <tr key={user._id}>
              <th>{index + 1}</th>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                {user.role === "admin" ? (
                  "Admin"
                ) : (
                  <button
                    onClick={() => handleMakeAdmin(user)}
                    className="btn btn-lg bg-orange-500"
                  >
                   
                  </button>
                )}
              </td>
              <td>
                <button
                  onClick={() => handleDeleteUser(user)}
                  className="btn btn-ghost btn-lg"
                >
                  
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