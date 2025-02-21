import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface ForecastChartProps {
  forecast: {
    list: { dt: number; main: { temp: number }; pop: number }[];
  };
}

const ForecastChart: React.FC<ForecastChartProps> = ({ forecast }) => {
  if (!forecast) return null;

  const labels = forecast.list.map((entry: { dt: number }) =>
    new Date(entry.dt * 1000).toLocaleDateString("en-US", { weekday: "short", hour: "2-digit" })
  );
  const temperatures = forecast.list.map((entry) => entry.main.temp);
  const precipitation = forecast.list.map((entry: { pop: number }) => entry.pop * 100);

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
      },
    ],
  };

  const precipitationData = {
    labels,
    datasets: [
      {
        label: "Chance of Precipitation (%)",
        data: precipitation,
        borderColor: "green",
        backgroundColor: "rgba(0, 255, 0, 0.1)",
        pointRadius: 5,
        pointBackgroundColor: "green",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: "top" as const },
      tooltip: { enabled: true },
      title: {
        display: true,
        text: "5-Day Weather Forecast",
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
      },
    },
  };

  const precipitationOptions = {
    ...options,
    scales: {
      x: options.scales.x,
      y: {
        title: { display: true, text: "Chance of Precipitation (%)", font: { size: 14 } },
        suggestedMax: 100,
      },
    },
  };

  return (
    <div>
      <div className="chart-container">
        <h3>Temperature Forecast</h3>
        <Line data={tempData} options={options} />
      </div>
      <div className="chart-container">
        <h3>Chance of Precipitation</h3>
        <Line data={precipitationData} options={precipitationOptions} />
      </div>
    </div>
  );
};

export default ForecastChart;
