import { Helmet } from "react-helmet";
import TrendingsArticles from "./Components/TrendingsArticles";
import AllPublishers from "./Components/AllPublishers";
import Statics from "./Components/Statics";
import Plans from "./Components/Plans";




const Home = () => {
  
    return (
      <div>
        <Helmet>
          <title>The Daily News | Home</title>
        </Helmet>

        <TrendingsArticles></TrendingsArticles>
        <AllPublishers></AllPublishers>

        {/* react count up section for the user , premium user and the all users statics section  */}
        <Statics></Statics>

        <Plans></Plans>
      </div>
    );
};

export default Home;