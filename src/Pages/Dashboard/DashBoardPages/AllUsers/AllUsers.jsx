import { useContext, useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";
import { AuthContext } from "../../../../Providers/AuthProvider";

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const { user } = useContext(AuthContext);
  console.log(user);

  const handleMakeAdmin = async (user) => {
    console.log(user);
    const userData = {
      name: user.name,
      role: "admin",
      email: user.email,
      image_url: user.image_url,
    };

    console.log("Sending data to server:", userData);

    try {
      const response = await fetch(
        `https://the-daily-news-server-xi.vercel.app/users/${user._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        }
      );

      const data = await response.json();

      console.log("Response from server:", data);

      if (data.modifiedCount !== undefined && data.modifiedCount > 0) {
        const updatedUserInfo = await fetch(
          "https://the-daily-news-server-xi.vercel.app/users"
        );
        const updatedUserData = await updatedUserInfo.json();

        setAllUsers(updatedUserData);

        Swal.fire("Good job!", "USer has made admin !", "success");
      } else {
        Swal.fire("Error!", "Failed to make admin !", "error");
      }
    } catch (error) {
      console.error("Error during fetch:", error);
      Swal.fire(
        "Error!",
        "Failed to make  user to admin  in the database",
        "error"
      );
    }
  };
  const handleRemoveAdmin = async (user) => {
    console.log(user);
    const userData = {
      name: user.name,
      role: "user",
      email: user.email,
      image_url: user.image_url,
    };

    console.log("Sending data to server:", userData);

    try {
      const response = await fetch(
        `https://the-daily-news-server-xi.vercel.app/users/${user._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        }
      );

      const data = await response.json();

      console.log("Response from server:", data);

      if (data.modifiedCount !== undefined && data.modifiedCount > 0) {
        const updatedUserInfo = await fetch(
          "https://the-daily-news-server-xi.vercel.app/users"
        );
        const updatedUserData = await updatedUserInfo.json();

        setAllUsers(updatedUserData);

        Swal.fire("Good job!", "Admin has made user !", "success");
      } else {
        Swal.fire("Error!", "Failed to make user !", "error");
      }
    } catch (error) {
      console.error("Error during fetch:", error);
      Swal.fire(
        "Error!",
        "Failed to make   admin to user   in the database",
        "error"
      );
    }
  };

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
        fetch(`https://the-daily-news-server-xi.vercel.app/users/${id}`, {
          method: "DELETE",
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount > 0) {
              setAllUsers((prevUsers) =>
                prevUsers.filter((user) => user._id !== id)
              );
              Swal.fire(
                "Good job!",
                "User has deleted from  the database!",
                "success"
              );
            }
          });
      }
    });
  };
  useEffect(() => {
    fetch("https://the-daily-news-server-xi.vercel.app/users")
      .then((res) => res.json())
      .then((data) => setAllUsers(data));
  }, []);
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table bg-green-100 text-main-blue-50">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th className="text-main-blue-50">Image</th>
              <th className="text-main-blue-50">Name</th>
              <th className="text-main-blue-50">Email </th>
              <th className="text-main-blue-50">Role</th>
              <th className="text-main-blue-50">Make Admin</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user) => (
              <tr key={user?._id}>
                <th>
                  <th>
                    <RiDeleteBin6Line
                      onClick={() => handleDelete(user?._id)}
                      size={23}
                      className="text-[#ff3131] cursor-pointer"
                    />
                  </th>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={user?.image_url} />
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  {user?.name}
                  <br />
                </td>
                <td>{user?.email}</td>
                <th>
                  {user?.role === "admin" ? (
                    <h1 className="text-red-600 font-bold">Admin</h1>
                  ) : (
                    <h1 className="text-green-600 font-bold">User</h1>
                  )}
                </th>

                <th>
                  {user?.role === "user" ? (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className=" font-bold  rounded-lg text-black btn btn-success"
                    >
                      Make Admin
                    </button>
                  ) : (
                    <button
                      onClick={() => handleRemoveAdmin(user)}
                      className=" font-bold  rounded-lg text-black btn btn-error"
                    >
                      Remove Admin
                    </button>
                  )}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
