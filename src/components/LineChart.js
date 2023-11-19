import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
);

const LineChart = ({ onClickdata, lineChartData }) => {
  const filteredData = lineChartData?.map((item) => item[`${onClickdata}`]);

  const data = {
    labels: lineChartData.map((item) => item.Day),
    datasets: [
      {
        label: "Time Trend",
        data: filteredData.map((item) => item).filter(Number),
        borderColor: "black",
        backgroundColor: "red",
        pointBorderColor: "red",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    plugins: {
      legend: true,
    },
    scales: {
      y: {
        // min:3,
        // max:6
      },
    },
  };

  return (
    <div className="w-full p-5 mt-3 mx-auto">
      <Line data={data} options={options} className="w-full" />
    </div>
  );
};

export default LineChart;
