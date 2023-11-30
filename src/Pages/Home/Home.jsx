import { Helmet } from "react-helmet";
import TrendingsArticles from "./Components/TrendingsArticles";
import AllPublishers from "./Components/AllPublishers";
import Statics from "./Components/Statics";
import Plans from "./Components/Plans";
import Testimonials from "./Components/Testimonials";
import FAQSection from "./Components/FAQSection";




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
        <Testimonials></Testimonials>
        <FAQSection></FAQSection>
      </div>
    );
};

export default Home;