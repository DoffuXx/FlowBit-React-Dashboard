import NumberTicker from "@/components/animation/number-ticker";
import { Loading, TitlePage, Error, BreadCrumb } from "@/components/common";
import ResizableBox from "@/components/home/ResizableBox";
import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;
import { AxisOptions, Chart } from "react-charts";

interface DataPoint {
  primary: string;
  secondary: number;
}

interface Series {
  label: string;
  data: DataPoint[];
}

const Home = () => {
  const [chartDataPosts, setChartDataPosts] = useState<Series[]>([
    {
      label: "Posts per Month",
      data: [] as DataPoint[],
    },
  ]);
  const [chartDataDiscours, setChartDataDiscours] = useState<Series[]>([
    {
      label: "Discours per Month",
      data: [] as DataPoint[],
    },
  ]);
  const [chartMedia, setChartMedia] = useState<Series[]>([
    {
      label: "Media per Type",
      data: [] as DataPoint[],
    },
  ]);
  const [counts, setCounts] = useState({
    posts: 0,
    discours: 0,
    medias: 0,
    messages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStatistics = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/statistics`);
        const data = response.data;

        const countsPosts = data.totalPosts;
        const countsDiscours = data.totalDiscours;
        const countsMedias = data.totalMedias;
        const countsMessages = data.totalContacts;

        setCounts({
          posts: countsPosts,
          discours: countsDiscours,
          medias: countsMedias,
          messages: countsMessages,
        });

        const monthsPosts = Object.keys(data.postsPerMonth);
        const posts = Object.values(data.postsPerMonth);

        const monthsDiscours = Object.keys(data.discoursPerMonth);
        const discours = Object.values(data.discoursPerMonth);

        const typesMedia = Object.keys(data.mediasPerType);
        const media = Object.values(data.mediasPerType);

        const formattedData = monthsPosts.map((month, index) => ({
          primary: month,
          secondary: posts[index] as number,
        }));
        const formattedDataDiscours = monthsDiscours.map((month, index) => ({
          primary: month,
          secondary: discours[index] as number,
        }));

        const formattedDataMedia = typesMedia.map((type, index) => ({
          primary: type,
          secondary: media[index] as number,
        }));

        setChartDataPosts([
          {
            label: "Posts per Month",
            data: formattedData,
          },
        ]);
        setChartDataDiscours([
          {
            label: "Discours per Month",
            data: formattedDataDiscours,
          },
        ]);
        setChartMedia([
          {
            label: "Media per Type",
            data: formattedDataMedia,
          },
        ]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching the statistics:", error);
        setError("Quelque chose s'est mal passé. Veuillez réessayer.");
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  const primaryAxis = React.useMemo<AxisOptions<DataPoint>>(
    () => ({
      getValue: (datum) => datum.primary,
      scaleType: "band",
    }),
    [],
  );

  const secondaryAxes = React.useMemo<AxisOptions<DataPoint>[]>(
    () => [
      {
        getValue: (datum) => datum.secondary,
        scaleType: "linear",
      },
    ],
    [],
  );
  const primaryAxisDiscours = React.useMemo<AxisOptions<DataPoint>>(
    () => ({
      getValue: (datum) => datum.primary,
      scaleType: "band",
    }),
    [],
  );
  const secondaryAxesDiscours = React.useMemo<AxisOptions<DataPoint>[]>(
    () => [
      {
        getValue: (datum) => datum.secondary,
        scaleType: "linear",
      },
    ],
    [],
  );

  const primaryAxisMedia = React.useMemo<AxisOptions<DataPoint>>(
    () => ({
      getValue: (datum) => datum.primary,
      scaleType: "band",
    }),
    [],
  );
  const secondaryAxesMedia = React.useMemo<AxisOptions<DataPoint>[]>(
    () => [
      {
        getValue: (datum) => datum.secondary,
        scaleType: "linear",
        min: 0,
      },
    ],
    [],
  );

  return (
    <div className="">
      <div className="">
        <BreadCrumb layer1="Table de Bord" isHome={true} />
      </div>
      <div className="mt-8">
        {loading && <Loading />}
        {error && (
          <Error
            error={{
              error: error,
            }}
          />
        )}
      </div>

      {/* counter */}
      <div className="mb-12 flex flex-col justify-between md:flex-row">
        <div>
          <div className="text-4xl font-bold text-gray-800">
            <NumberTicker value={counts.posts} />
          </div>
          <div className="text-gray-600">Publications</div>
        </div>
        <div>
          <div className="text-4xl font-bold text-gray-800">
            <NumberTicker value={counts.discours} />
          </div>
          <div className="text-gray-600">Discours</div>
        </div>
        <div>
          <div className="text-4xl font-bold text-gray-800">
            <NumberTicker value={counts.medias} />
          </div>
          <div className="text-gray-600">Médias</div>
        </div>
        <div>
          <div className="text-4xl font-bold text-gray-800">
            <NumberTicker value={counts.messages} />
          </div>
          <div className="text-gray-600">Messages</div>
        </div>
      </div>
      <div className="h-64">
        <div className="mb-6 text-xl text-gray-600">
          Publications des 12 derniers mois{" "}
        </div>
        <ResizableBox>
          <Chart
            options={{
              data: chartDataPosts,
              primaryAxis,
              secondaryAxes,
              defaultColors: ["#1f2241"],
            }}
          />
        </ResizableBox>
      </div>

      <div className="mt-32 h-64">
        <div className="mb-6 text-xl text-gray-600">
          Discours des 12 derniers mois{" "}
        </div>
        <ResizableBox>
          <Chart
            options={{
              data: chartDataDiscours,
              primaryAxis: primaryAxisDiscours,
              secondaryAxes: secondaryAxesDiscours,
              defaultColors: ["#1f2241"],
            }}
          />
        </ResizableBox>
      </div>

      <div className="mt-32 h-64">
        <div className="mb-6 text-xl text-gray-600">Média par Type </div>
        <ResizableBox>
          <Chart
            options={{
              data: chartMedia,
              primaryAxis: primaryAxisMedia,
              secondaryAxes: secondaryAxesMedia,
              defaultColors: ["#1f2241"],
            }}
          />
        </ResizableBox>
      </div>
    </div>
  );
};

export default Home;
