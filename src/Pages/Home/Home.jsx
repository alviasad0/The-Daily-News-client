import { Helmet } from "react-helmet";
import TrendingsArticles from "./Components/TrendingsArticles";
import AllPublishers from "./Components/AllPublishers";


const Home = () => {
    return (
      <div>
        <Helmet>
          <title>The Daily News | Home</title>
        </Helmet>
            
            <TrendingsArticles></TrendingsArticles>
            <AllPublishers></AllPublishers>
      </div>
    );
};

export default Home;