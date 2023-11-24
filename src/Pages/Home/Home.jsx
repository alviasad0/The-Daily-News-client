import { Helmet } from "react-helmet";
import TrendingsArticles from "./Components/TrendingsArticles";

const Home = () => {
    return (
      <div>
        <Helmet>
          <title>The Daily News | Home</title>
        </Helmet>
            <h1>this is home</h1>
            <TrendingsArticles></TrendingsArticles>
      </div>
    );
};

export default Home;