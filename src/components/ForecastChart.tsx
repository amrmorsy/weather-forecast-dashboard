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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

interface ForecastChartProps {
  forecast: {
    list: { dt: number; main: { temp: number }; pop: number }[];
  };
}

const ForecastChart: React.FC<ForecastChartProps> = ({ forecast }) => {
  if (!forecast) return null;

  const labels = forecast.list.map((entry) =>
    new Date(entry.dt * 1000).toLocaleDateString("en-US", { weekday: "short", hour: "2-digit" })
  );
  const temperatures = forecast.list.map((entry) => entry.main.temp);
  const precipitation = forecast.list.map((entry) => entry.pop * 100); // Convert to percentage

  const tempData = {
    labels,
    datasets: [
      {
        label: "Temperature (°F)",
        data: temperatures,
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.1)",
        pointRadius: 5,
        pointBackgroundColor: "blue",
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
        backgroundColor: "rgba(0, 128, 0, 0.5)", // Green bars
        borderColor: "rgba(0, 128, 0, 1)",
        borderWidth: 1,
        yAxisID: "y-precip",
      },
    ],
  };

  const tempOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: "top" as const },
      tooltip: { enabled: true },
      title: {
        display: true,
        text: "Temperature Forecast",
        font: { size: 16 },
      },
    },
    scales: {
      x: {
        title: { display: true, text: "Date & Time", font: { size: 14 } },
        ticks: { maxRotation: 45, minRotation: 0 },
      },
      y: {
        title: { display: true, text: "Temperature (°F)", font: { size: 14 } },
        id: "y-temp",
      },
    },
  };

  const precipitationOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: "top" as const },
      tooltip: { enabled: true },
      title: {
        display: true,
        text: "Chance of Precipitation",
        font: { size: 16 },
      },
    },
    scales: {
      x: {
        title: { display: true, text: "Date & Time", font: { size: 14 } },
        ticks: { maxRotation: 45, minRotation: 0 },
      },
      y: {
        title: { display: true, text: "Precipitation Chance (%)", font: { size: 14 } },
        suggestedMax: 100,
        id: "y-precip",
      },
    },
  };

  return (
    <div>
      <div className="chart-container">
        <Line data={tempData} options={tempOptions} />
      </div>
      <div className="chart-container">
        <Bar data={precipitationData} options={precipitationOptions} />
      </div>
    </div>
  );
};

export default ForecastChart;
