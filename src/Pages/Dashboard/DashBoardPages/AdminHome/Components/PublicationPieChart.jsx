import { useEffect, useState } from "react";
import axios from "axios";
import { Chart } from "react-google-charts";

const PublicationPieChart = () => {
  const [publications, setPublications] = useState([]);
  const [articles, setArticles] = useState([]);

  console.log(publications);
  console.log(articles);

  useEffect(() => {
    axios
      .get("https://the-daily-news-server-xi.vercel.app/allPublishers")
      .then((response) => setPublications(response.data))
      .catch((error) => console.error("Error fetching publications:", error));

    axios
      .get("https://the-daily-news-server-xi.vercel.app/allArticlesData")
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
    <Chart
      chartType="PieChart"
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
  );
};

export default PublicationPieChart;
