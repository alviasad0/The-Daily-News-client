
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
      <div >
        <div>
          <h2 className="pb-10 text-center text-5xl font-bold text-black underline uppercase ">Users Statistics</h2>
          <div className="bg-green-100 rounded-xl">
            <p>
              All Users: <CountUp end={allUsers.length} />
            </p>
            <p>
              Normal Users: <CountUp end={normalUsersCount} />
            </p>
            <p>
              Premium Users: <CountUp end={premiumUsersCount} />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statics;
