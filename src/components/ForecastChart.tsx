import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useTheme } from "../context/ThemeContext";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

interface ForecastChartProps {
  forecast: {
    list: { dt: number; main: { temp: number }; pop: number; snow?: { "3h"?: number } }[];
  };
}

const ForecastChart: React.FC<ForecastChartProps> = ({ forecast }) => {
  
  const { theme } = useTheme();
  console.log(theme)
  if (!forecast) return null;


  const labels = forecast.list.map((entry) =>
    new Date(entry.dt * 1000).toLocaleDateString("en-US", { weekday: "short", hour: "2-digit" })
  );
  const temperatures = forecast.list.map((entry) => entry.main.temp);
  const precipitation = forecast.list.map((entry) => entry.pop * 100); // Convert to percentage
  const snowfall = forecast.list.map((entry) => (entry.snow && entry.snow["3h"] ? entry.snow["3h"] : 0)); // Snowfall in mm

  const tempData = {
    labels,
    datasets: [
      {
        label: "Temperature (°F)",
        data: temperatures,
        borderColor: theme == "light" ? "blue" : "#7ed6df",
        backgroundColor: theme == "light" ? "rgba(0, 0, 255, 0.1)" : "rgba(153, 255, 0, 0.31)",
        pointRadius: 3,
        pointHoverRadius: 10,
        pointBackgroundColor: theme == "light" ? "blue" : "#c7ecee",
        pointHoverBackgroundColor: "red",
        yAxisID: "y-temp",
      },
    ],
  };

  const precipitationData = {
    labels,
    datasets: [
      {
        label: "Chance of Precipitation (%)",
        data: precipitation,
        backgroundColor: "rgba(0, 128, 0, 0.5)",
        borderColor: "rgba(0, 128, 0, 1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(0, 255, 0, 0.7)",
        yAxisID: "y-precip",
      },
    ],
  };

  const snowfallData = {
    labels,
    datasets: [
      {
        label: "Snowfall (mm)",
        data: snowfall,
        backgroundColor: "rgba(173, 216, 230, 0.7)", // Light blue for snow
        borderColor: "rgba(173, 216, 230, 1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(135, 206, 250, 0.9)", // Darker blue on hover
        yAxisID: "y-snow",
      },
    ],
  };

  const tempOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: "top" as const },
      tooltip: {
        enabled: true,
        mode: "nearest",
        intersect: false,
      },
      title: {
        display: true,
        text: "Temperature Forecast",
        font: { size: 16 },
      },
    },
    hover: {
      mode: "nearest",
      intersect: false,
    },
    scales: {
      x: {
        title: { display: true, text: "Date & Time", font: { size: 14 } },
        ticks: { maxRotation: 45, minRotation: 0 },
        grid: {
          display: false,
        },
      },
      y: {
        title: { display: true, text: "Temperature (°F)", font: { size: 14 } },
        grid: {
          display: false,
        },
        id: "y-temp",
      },
    },
  };

  const precipitationOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: "top" as const },
      tooltip: {
        enabled: true,
        mode: "nearest",
        intersect: false,
      },
      title: {
        display: true,
        text: "Chance of Precipitation",
        font: { size: 16 },
      },
    },
    hover: {
      mode: "nearest",
      intersect: false,
    },
    scales: {
      x: {
        title: { display: true, text: "Date & Time", font: { size: 14 } },
        ticks: { maxRotation: 45, minRotation: 0 },
        grid: {
          display: false,
        },
      },
      y: {
        title: { display: true, text: "Precipitation Chance (%)", font: { size: 14 } },
        suggestedMax: 100,
        grid: {
          display: false,
        },
        id: "y-precip",
      },
    },
  };

  const snowfallOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: "top" as const },
      tooltip: {
        enabled: true,
        mode: "nearest",
        intersect: false,
      },
      title: {
        display: true,
        text: "Snowfall Forecast",
        font: { size: 16 },
      },
    },
    hover: {
      mode: "nearest",
      intersect: false,
    },
    scales: {
      x: {
        title: { display: true, text: "Date & Time", font: { size: 14 } },
        ticks: { maxRotation: 45, minRotation: 0 },
        grid: {
          display: false,
        },
      },
      y: {
        title: { display: true, text: "Snowfall (mm)", font: { size: 14 } },
        grid: {
          display: false,
        },
        id: "y-snow",
      },
    },
  };

  return (
    <div>
      <div className="chart-container">
        {/* <h3>Temperature Forecast</h3> */}
        <Line data={tempData} options={tempOptions} />
      </div>
      { precipitation.some(Boolean) &&
        <div className="chart-container">
          {/* <h3>Chance of Precipitation</h3> */}
          <Bar data={precipitationData} options={precipitationOptions} />
        </div>
      }
      { snowfall.some(Boolean) &&
        <div className="chart-container">
          {/* <h3>Snowfall Forecast</h3> */}
          <Bar data={snowfallData} options={snowfallOptions} />
        </div>
      }
    </div>
  );
};

export default ForecastChart;
