import PublicationPieChart from "./Components/PublicationPieChart";
import SecondPieChart from "./Components/SecondPieChart";
import ThirdChart from "./Components/ThirdChart";


const AdminHome = () => {
    return (
      <div>
        <PublicationPieChart></PublicationPieChart>
        <div className="divider">OR</div>
        <SecondPieChart></SecondPieChart>
        <div className="divider">OR</div>
        <ThirdChart></ThirdChart>
      </div>
    );
};

export default AdminHome;