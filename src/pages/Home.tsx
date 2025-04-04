import { useEffect, useState } from "react";
import { useWeather } from "../hooks/useWeather";
import { useGeolocation } from "../hooks/useGeolocation";
import SearchBar from "../components/SearchBar";
import ForecastChart from "../components/ForecastChart";
import GeolocationButton from "../components/GeolocationButton";
import ThemeToggle from "../components/ThemeToggle";
import WeatherIcon from '../components/WeatherIcon';
import { Analytics } from '@vercel/analytics/react';
import { CityDetails } from "../types/CityDetails";

const Home = () => {
  const [cityDetails, setCityDetails] = useState<CityDetails | undefined>(undefined);
  const [localTime, setLocalTime] = useState<string>("");
  const geolocation = useGeolocation();
  const { forecast, currentWeather, loading, locationName, country, timezone } = useWeather(cityDetails, geolocation ?? undefined);
  // State to control search input
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {

    if (timezone && currentWeather?.dt) {

      const d = new Date(currentWeather.dt * 1000)
      const lt = d.getTime()
      const localOffset = d.getTimezoneOffset() * 60000
      const utc = lt + localOffset
      const currentCityTime = new Date(utc + (1000 * timezone))

      setLocalTime(currentCityTime.toLocaleString(navigator.language, {
        dateStyle: "short",
        timeStyle: "short"
      }));
    }

  }, [timezone, currentWeather])

  // Handle user location button
  const handleLocate = () => {
    // Clear search so it doesn't conflict with geolocation
    setCityDetails(undefined);
    setSearchValue("");
  };

  return (
    <div className="container">
      <h1>🌤 Weather Forecast</h1>
      <ThemeToggle />
      <div className="search-container">
        <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} onSearch={(val) => setCityDetails(val)} />
        <GeolocationButton onLocate={handleLocate} />
      </div>

      {/* Show Current Weather Data */}
      {currentWeather && (
        <div className="current-weather">
          <h2>{locationName}</h2>
          <h3>{cityDetails?.state} {country}</h3>
          {localTime && (
            <p>{localTime}</p>
          )}
          <p>{currentWeather.weather[0].description}</p>
          <div className="weather-info">
            {/* <img 
              src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`} 
              alt={currentWeather.weather[0].description}
            /> */}
            <WeatherIcon iconCode={currentWeather.weather[0].icon} description={currentWeather.weather[0].description} />
            <div>
              <div className="current-temp">{Math.round(currentWeather.main.temp)}°F</div>
              <p>L: {Math.round(currentWeather.main.temp_min)}° H:{Math.round(currentWeather.main.temp_max)}°</p>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : (
        forecast && (
          <div className="chart-container-wrapper">
            <ForecastChart forecast={forecast} />
          </div>
        )
      )}
      <Analytics />
    </div>
  );
};

export default Home;