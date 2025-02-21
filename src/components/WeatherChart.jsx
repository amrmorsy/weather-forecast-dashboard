import React from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const WeatherChart = ({ forecastData }) => {
  if (!forecastData) {
    return <p>No forecast data available</p>; // If data is missing, show a message
  }

  console.log(forecastData); // Log the data to check if it's passed correctly

  const { list } = forecastData;

  const hourlyData = list.slice(0, 24).map((item) => ({
    x: new Date(item.dt * 1000).getHours(),
    y: item.main.temp,
  }));

  const dailyData = list.slice(0, 5);
  const rainProbability = dailyData.map((item) => item.pop * 100);
  const humidityLevels = dailyData.map((item) => item.main.humidity);
  const windSpeeds = dailyData.map((item) => item.wind.speed);

  return (
    <div>
      <Line
        data={{
          datasets: [
            {
              label: 'Temperature (°C)',
              data: hourlyData,
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
            },
          ],
        }}
      />
      <Bar
        data={{
          labels: dailyData.map((item) => new Date(item.dt * 1000).toLocaleDateString()),
          datasets: [
            {
              label: 'Rain Probability (%)',
              data: rainProbability,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
            },
            {
              label: 'Humidity (%)',
              data: humidityLevels,
              backgroundColor: 'rgba(153, 102, 255, 0.2)',
            },
            {
              label: 'Wind Speed (m/s)',
              data: windSpeeds,
              backgroundColor: 'rgba(255, 159, 64, 0.2)',
            },
          ],
        }}
      />
      <Pie
        data={{
          labels: ['Sunny', 'Cloudy', 'Rainy'],
          datasets: [
            {
              data: [50, 30, 20], // example data
              backgroundColor: ['#FFBB33', '#00BB88', '#FF5555'],
            },
          ],
        }}
      />
    </div>
  );
};

export default WeatherChart;
