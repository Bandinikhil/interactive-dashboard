import ChartData from "./chartdata.csv";
import { useRef } from "react";
import Papa from "papaparse";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import { Bar, getElementsAtEvent } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import LineChart from "./LineChart";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function ResponsiveBarChart() {
  const [chartData, setChartData] = useState({
    datasets: [],
  });
  const [chartOptions, setChartOptions] = useState({});

  const chartRef = useRef();

  const [selectedAge, setSelectedAge] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [filterDropdownData, setFilterDropdata] = useState([]);

  const [selectedStartDate, setSelectedStartDate] = useState(
    new Date("2022-04-10")
  );
  const [selectedEndDate, setSelectedEndDate] = useState(
    new Date("2022-10-29")
  );

  const [onClickdata, setOnclickdata] = useState(null);
  const [lineChartData, setLineChartData] = useState([]);
  const [noFilterData, setNoFilterData] = useState([]);

  const onClick = (event) => {
    if (getElementsAtEvent(chartRef.current, event).length > 0) {
      const datasetIndexNum = getElementsAtEvent(chartRef.current, event)[0]
        .datasetIndex;
      const dataPoint = getElementsAtEvent(chartRef.current, event)[0].index;
      console.log(chartData.labels[dataPoint]);
      setOnclickdata(chartData.labels[dataPoint]);
    }
  };

  const applyFilters = () => {
    if (filterDropdownData.length === 0) return;

    const filteredData = filterDropdownData?.data?.filter((item) => {
      const currentDate = new Date(item?.Day);
      return (
        (!selectedAge || item?.Age === selectedAge) &&
        (!selectedGender || item?.Gender === selectedGender) &&
        currentDate >= selectedStartDate &&
        currentDate <= selectedEndDate
      );
    });
    console.log(filteredData);
    setLineChartData(filteredData);

    setChartData({
      labels: labels.map((item) => item),
      datasets: [
        {
          label: "OSCAR WINNER",
          data: filteredData.map((item, index) => item.A).filter(Number),
          dataa: filteredData.map((item, index) => item.B).filter(Number),
          // ... (similarly for other datasets)
          borderColor: "black",
          backgroundColor: "red",
        },
      ],
    });
  };

  const labels = ["A", "B", "C", "D", "E", "F"];

  useEffect(() => {
    Papa.parse(ChartData, {
      download: true,
      header: true,
      dynamicTyping: true,
      delimiter: "",
      complete: (result) => {
        setFilterDropdata(result);
        setNoFilterData(result);
        setChartData({
          labels: labels.map((item) => item),
          datasets: [
            {
              label: "Total time Spent",
              data: result.data.map((item, index) => item.A).filter(Number),
              dataa: result.data.map((item, index) => item.B).filter(Number),
              datab: result.data.map((item, index) => item.C).filter(Number),
              datac: result.data.map((item, index) => item.D).filter(Number),
              datad: result.data.map((item, index) => item.E).filter(Number),
              datae: result.data.map((item, index) => item.F).filter(Number),
              borderColor: "black",
              backgroundColor: "red",
            },
          ],
        });
        setChartOptions({
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Corresponding Features with Total time spent in Bar Chart",
            },
          },
        });
      },
    });
  }, []);

  return (
    <div className="mx-auto p-4 md:p-8 lg:p-12 xl:p-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Age and Gender filters */}
        <div className="mb-4">
          <label htmlFor="ageDropdown" className="block font-bold mb-1">
            Age:
          </label>
          <select
            id="ageDropdown"
            onChange={(e) => setSelectedAge(e.target.value)}
            className="w-full border p-2"
          >
            <option value="">All</option>
            <option value="15-25">15-25</option>
            <option value=">25">&gt;25</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="genderDropdown" className="block font-bold mb-1">
            Gender:
          </label>
          <select
            id="genderDropdown"
            onChange={(e) => setSelectedGender(e.target.value)}
            className="w-full border p-2"
          >
            <option value="">All</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        {/* Date Range Selector */}
        <div className="mb-4">
          <label htmlFor="startDatePicker" className="block font-bold mb-1">
            Start Date:
          </label>
          <DatePicker
            id="startDatePicker"
            selected={selectedStartDate}
            onChange={(date) => setSelectedStartDate(date)}
            className="w-full border p-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="endDatePicker" className="block font-bold mb-1">
            End Date:
          </label>
          <DatePicker
            id="endDatePicker"
            selected={selectedEndDate}
            onChange={(date) => setSelectedEndDate(date)}
            className="w-full border p-2"
          />
        </div>

        <div className="col-span-2">
          <button
            onClick={applyFilters}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Apply Filters
          </button>
        </div>
      </div>

      {chartData.datasets.length > 0 ? (
        <div className="mt-8 mx-auto">
          <Bar
            options={chartOptions}
            data={chartData}
            onClick={onClick}
            ref={chartRef}
          />
          {onClickdata && (
            <div className="w-[100%] h-[300px] md:h-[500px] mx-auto">
              <LineChart
                onClickdata={onClickdata}
                lineChartData={
                  lineChartData.length > 0 ? lineChartData : noFilterData.data
                }
              />
            </div>
          )}
        </div>
      ) : (
        <div className="mt-8">Loading...</div>
      )}
    </div>
  );
}

export default ResponsiveBarChart;
