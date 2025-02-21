import React from 'react';
import { useWeather } from '../context/WeatherContext';

const WeatherCard = () => {
  const { weatherData } = useWeather();

  if (!weatherData) return null;

  const { main, weather, wind } = weatherData;

  return (
    <div>
      <h2>{weatherData.name}</h2>
      <p>{weather[0].description}</p>
      <p>Temperature: {main.temp}°C</p>
      <p>Humidity: {main.humidity}%</p>
      <p>Wind Speed: {wind.speed} m/s</p>
    </div>
  );
};

export default WeatherCard;
