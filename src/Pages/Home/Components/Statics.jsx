
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import CountUp from "react-countup";
import useAxiosPublic from "../../../Hooks/UseAxiosPublic";
const Statics = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [normalUsersCount, setNormalUsersCount] = useState(0);
  const [premiumUsersCount, setPremiumUsersCount] = useState(0);

  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    axiosPublic
      .get("/users")
      .then((response) => {
        const users = response.data;
        setAllUsers(users);

        const normalUsers = users.filter((user) => !user.premiumTaken);
        const premiumUsers = users.filter((user) => user.premiumTaken);

        setNormalUsersCount(normalUsers.length);
        setPremiumUsersCount(premiumUsers.length);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `Failed to fetch user data: ${error.message}`,
        });
      });
  }, [axiosPublic]);
  return (
    <div className="mt-28">
      <div>
        <div>
          <h2 className="pb-10 text-center text-5xl font-bold text-black underline uppercase ">
            Users Statistics
          </h2>
          <div className="bg-green-100 rounded-xl max-w-7xl mx-auto ">
            <div className="py-10 grid grid-cold-1 items-center justify-center   md:grid-cols-3   ">
              <div className="border-2 h-[300px] w-[200px] md:w-[400px] bg-violet-500  rounded-xl ">
                <p className="text-center pt-16 pb-10 text-7xl text-black font-bold">
                  {" "}
                  <CountUp end={allUsers.length} />
                </p>{" "}
                <p className="text-center text-4xl font-bold text-black ">
                  All Users
                </p>
              </div>
              <div className="border-2 h-[300px]  w-[200px] md:w-[400px] bg-green-500  rounded-xl">
                <p className="text-center text-7xl text-black font-bold pb-10 pt-16 ">
                  {" "}
                  <CountUp end={normalUsersCount} />
                </p>
                <p className="text-center text-4xl font-bold text-black ">Normal Users</p>
              </div>
              <div className="border-2 h-[300px] w-[200px] md:w-[400px] bg-red-500  rounded-xl">
                <p className="text-center pt-16 pb-10 text-7xl text-black font-bold">
                  {" "}
                  <CountUp end={premiumUsersCount} />
                </p>{" "}
                <p className="text-center text-4xl font-bold text-black ">
                  Premium Users
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statics;
