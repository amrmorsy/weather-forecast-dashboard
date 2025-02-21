import React, { useState } from 'react';
import { useWeather } from '../context/WeatherContext';

const WeatherSearch = () => {
  const { fetchWeather } = useWeather();
  const [city, setCity] = useState('');

  const handleSearch = () => {
    if (city.trim()) {
      fetchWeather(city); // Make sure this function is being called
    }
  };

  return (
    <div>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default WeatherSearch;

