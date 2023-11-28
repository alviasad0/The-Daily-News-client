import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { AuthContext } from './../../Providers/AuthProvider';
import Swal from "sweetalert2";


const MyProfile = () => {
  const [allUsers, setAllUsers] = useState([]);
  const { user}= useContext(AuthContext)
  console.log(user);

  const  logedinUser= allUsers.find(users=> users?.email === user?.email) 
  console.log(logedinUser);



   const handleUpdateSubmit = (event) => {
     event.preventDefault();
     const form = event.target;
     const image_url = form.image_url.value;
     const name = form.name.value;
     
     const updatedProfile = {
       image_url,
       name,
       role: logedinUser?.role ,
       email: logedinUser?.email,
     };

     fetch(`http://localhost:5000/users/${logedinUser._id}`, {
       method: "PUT",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify(updatedProfile),
     })
       .then((response) => response.json())
       .then((data) => {
         console.log(data);
         if (data.modifiedCount > 0) {
           
           
           setAllUsers((prevUsers) =>
             prevUsers.map((user) =>
               user._id === logedinUser._id
                 ? { ...user, ...updatedProfile }
                 : user
             )
           )
           Swal.fire(
             "Good job!",
             "Product has Updated in the database!",
             "success"
           )
           
         }
       });
   };


  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setAllUsers(data));
  }, []);
    return (
      <div>
        <Helmet>
          <title>The Daily News | My Profile</title>
        </Helmet>
        <h1 className="text-center text-5xl text-black font-bold uppercase underline ">
          {" "}
          my profile{" "}
        </h1>
        <div className="mt-10">
          <div className="  bg-green-100 rounded-xl">
            <div className="w-2/3 card card-side mx-auto">
              <figure className=" w-20 rounded-full">
                <img
                  src={user?.photoURL}
                  className="w-full rounded-full"
                  alt="Movie"
                />
              </figure>
              <div className="card-body">
                <h2 className="text-2xl font-bold ">{logedinUser?.name}</h2>
                <p className="text-lg text-black font-medium">
                  Email : {logedinUser?.email}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-20 ">
          <div className="bg-green-100 rounded-xl">
          <h1 className=" text-center text-3xl font-semibold  pt-10 pb-5">
            Need to Update your Profile?
          </h1>
            <form onSubmit={handleUpdateSubmit} className="max-w-2xl mx-auto ">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xl font-medium text-black">
                    Image URL
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Image url"
                  defaultValue={user?.photoURL}
                  name="image_url"
                  className="input input-bordered input-success w-full "
                  required
                />
              </div>
              <br />
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xl font-medium text-black">
                    Name
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  defaultValue={logedinUser?.name}
                  name="name"
                  className="input input-bordered input-success w-full "
                  required
                />
              </div>
            <br />
              <input
                type="submit"
                value="UPDATE PROFILE"
                className="btn btn-success w-full text-xl tracking-widest font-bold mb-10"
              />
            </form>
          </div>
        </div>
      </div>
    );
};

export default MyProfile;