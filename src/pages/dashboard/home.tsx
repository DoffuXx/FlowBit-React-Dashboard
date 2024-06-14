/* eslint-disable @typescript-eslint/no-unused-vars */
import NumberTicker from "@/components/animation/number-ticker";
import { BreadCrumb, Line, CardBackground } from "@/components/common";
import Chart from "react-apexcharts";
import { useState } from "react";

const Home = () => {
  const [barChart, _setBarChart] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      },
    },
    series: [
      {
        name: "Series 1",
        data: [30, 40, 45, 50, 49, 60, 70],
      },
    ],
  });
  const [pieChart, _setPieChart] = useState({
    options: {
      labels: ["A", "B", "C", "D", "E"],
    },
    series: [45, 52, 38, 24, 33],
  });

  const [lineChart, _setLineChart] = useState({
    options: {
      chart: {
        id: "basic-line",
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      },
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70],
      },
    ],
  });
  const [areaChart, _setAreaChart] = useState({
    options: {
      chart: {
        id: "basic-area",
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      },
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70],
      },
    ],
  });

  const [donutChart, _setDonutChart] = useState({
    options: {
      labels: [
        "Category A",
        "Category B",
        "Category C",
        "Category D",
        "Category E",
      ],
    },
    series: [45, 52, 38, 24, 33],
  });
  const [scatterChart, _setScatterChart] = useState({
    options: {
      chart: {
        id: "basic-scatter",
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      },
    },
    series: [
      {
        name: "series-1",
        data: [
          [30, 40],
          [45, 50],
          [49, 60],
          [70, 91],
        ],
      },
    ],
  });
  const [bubbleChart, _setBubbleChart] = useState({
    options: {
      chart: {
        id: "basic-bubble",
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      },
    },
    series: [
      {
        name: "series-1",
        data: [
          [30, 40, 35],
          [45, 50, 40],
          [49, 60, 50],
          [70, 91, 70],
        ],
      },
    ],
  });

  return (
    <div className="">
      <div className="">
        <BreadCrumb layer1="Dashboard" isHome={true} />
      </div>

      {/* counter */}
      <div className="mb-12 flex flex-col justify-between md:flex-row">
        <div>
          <div className="text-4xl font-bold text-gray-800">
            <NumberTicker className="text-red-400" value={15} />
          </div>
          <div className="text-gray-600">Articles</div>
        </div>
        <div>
          <div className="text-4xl font-bold text-gray-800">
            <NumberTicker className="text-blue-400" value={15} />
          </div>
          <div className="text-gray-600">Messages</div>
        </div>
        <div>
          <div className="text-4xl font-bold text-gray-800">
            <NumberTicker className="text-green-400" value={15} />
          </div>
          <div className="text-gray-600">Earning</div>
        </div>
      </div>
      <Line variant="default" />
      <div className="grid flex-grow grid-cols-1 gap-4  md:grid-cols-2">
        <div className="">
          <CardBackground>
            <div className=" flex justify-between ">
              <div className="">
                <h5 className=" pb-2 text-3xl font-bold leading-none text-gray-900 dark:text-white">
                  <span className="text-blue-400">
                    <NumberTicker value={32} className="text-blue-400" />k
                  </span>
                </h5>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                  Users this week
                </p>
              </div>
              <div className="flex items-center px-2.5 py-0.5 text-center text-base font-semibold text-green-500 dark:text-green-500">
                12%
                <svg
                  className="ms-1 h-3 w-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13V1m0 0L1 5m4-4 4 4"
                  />
                </svg>
              </div>
            </div>
            <Chart
              options={barChart.options}
              series={barChart.series}
              type="bar"
            />
          </CardBackground>
        </div>

        <div className="">
          <CardBackground>
            <Chart
              options={pieChart.options}
              series={pieChart.series}
              type="pie"
            />
          </CardBackground>
        </div>
        <div className="col-span-2 ">
          <CardBackground width="fit-content">
            <div className="w-full">
              <Chart
                series={lineChart.series}
                options={lineChart.options}
                type="line"
                style={{ width: "60em" }}
              />
            </div>
          </CardBackground>
        </div>
        <div className="row-start-3">
          <CardBackground>
            <Chart
              series={areaChart.series}
              options={areaChart.options}
              type="area"
            />
          </CardBackground>
        </div>
        <div className="row-start-3">
          <CardBackground>
            <Chart
              series={donutChart.series}
              options={donutChart.options}
              type="donut"
            />
          </CardBackground>
        </div>
        <div>
          <CardBackground>
            <Chart
              series={scatterChart.series}
              options={scatterChart.options}
              type="scatter"
            />
          </CardBackground>
        </div>
        <div>
          <CardBackground>
            <Chart
              series={bubbleChart.series}
              options={bubbleChart.options}
              type="bubble"
            />
          </CardBackground>
        </div>
      </div>
    </div>
  );
};

export default Home;
