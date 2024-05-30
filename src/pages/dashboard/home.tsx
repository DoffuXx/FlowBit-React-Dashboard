import { TitlePage } from "@/components/common";
// import axios from "axios";
// import { useState, useEffect } from "react";
// import { Line } from "react-chartjs-2";
// const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

const Home = () => {
  // const [chartData, setChartData] = useState({
  //   labels: [],
  //   datasets: [
  //     {
  //       label: "Posts per Month",
  //       data: [],
  //       borderColor: "rgba(75,192,192,1)",
  //       backgroundColor: "rgba(75,192,192,0.2)",
  //       fill: true,
  //     },
  //   ],
  // });
  //
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState("");
  //
  // useEffect(() => {
  //   const fetchStatistics = async () => {
  //     try {
  //       const response = await axios.get(`${BASE_URL}/statistics`);
  //       const data = response.data;
  //
  //       const months = Object.keys(data.postsPerMonth);
  //       const posts = Object.values(data.postsPerMonth);
  //       console.log("months", months, "posts", posts);
  //
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching the statistics:", error);
  //       setError("Error fetching the statistics");
  //       setLoading(false);
  //     }
  //   };
  //
  //   fetchStatistics();
  //   console.log(chartData);
  // }, []);
  //
  // if (loading) {
  //   return <div>Loading...</div>;
  // }
  //
  // if (error) {
  //   return <div>{error}</div>;
  // }

  return (
    <div className="py-12">
      <TitlePage title="Table de bord" />
    </div>
  );
};

export default Home;
