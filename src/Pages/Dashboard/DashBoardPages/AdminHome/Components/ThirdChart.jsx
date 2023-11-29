import axios from "axios";
import { useEffect, useState } from "react";
import Chart from "react-google-charts";

const ThirdChart = () => {
    const [publications, setPublications] = useState([]);
    const [articles, setArticles] = useState([]);

    console.log(publications);
    console.log(articles);

    useEffect(() => {
      axios
        .get("http://localhost:5000/allPublishers")
        .then((response) => setPublications(response.data))
        .catch((error) => console.error("Error fetching publications:", error));

      axios
        .get("http://localhost:5000/allArticlesData")
        .then((response) => setArticles(response.data))
        .catch((error) => console.error("Error fetching articles:", error));
    }, []);

    const chartData = [["Publication", "Percentage"]].concat(
      publications.map((publication) => [
        publication.name,
        (articles.filter((article) => article.publisher === publication.name)
          .length /
          articles.length) *
          100,
      ])
    );
    return (
      <div>
        <Chart
          chartType="LineChart"
          loader={<div>Loading Chart</div>}
          data={chartData}
          options={{
            title: "Article Distribution by Publication",
            titleTextStyle: {
              fontSize: 32,
              fontWeight: "bold",
            },
            width: "100%",
            height: "500px",
          }}
          rootProps={{ "data-testid": "1" }}
        />
      </div>
    );
};

export default ThirdChart;