import React from 'react';
import { WeatherProvider } from './context/WeatherContext';
import WeatherSearch from './components/WeatherSearch';
import WeatherCard from './components/WeatherCard';
import WeatherChart from './components/WeatherChart';
import LoadingSpinner from './components/LoadingSpinner';

const App = () => {
  return (
    <WeatherProvider>
      <div>
        <WeatherSearch />
        <WeatherCard />
        <WeatherChart />
      </div>
    </WeatherProvider>
  );
};

export default App;

