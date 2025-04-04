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

      // Format date and time
      const formattedDateTime = {
        date: currentCityTime.toLocaleDateString(navigator.language, {
          weekday: 'short',
          month: 'short',
          day: 'numeric'
        }),
        time: currentCityTime.toLocaleTimeString(navigator.language, {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        })
      };

      // Set formatted time for display
      setLocalTime(`${formattedDateTime.date} • ${formattedDateTime.time}`);
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
          <div className="location-info">
            <h2>{locationName}</h2>
            <h3>{cityDetails?.state && <span>{cityDetails.state}, </span>}{country}</h3>
            {localTime && <p className="local-time">{localTime}</p>}
          </div>

          {currentWeather.weather && currentWeather.weather[0] && (
            <>
              <p className="weather-description">{currentWeather.weather[0].description}</p>
              <div className="weather-info">
                <WeatherIcon
                  iconCode={currentWeather.weather[0].icon}
                  description={currentWeather.weather[0].description}
                />
                <div className="temperature-container">
                  <div className="current-temp">
                    {Math.round(currentWeather.main?.temp || 0)}°F
                  </div>
                  <p className="temp-range">
                    L: {Math.round(currentWeather.main?.temp_min || 0)}°F &nbsp;H: {Math.round(currentWeather.main?.temp_max || 0)}°F
                  </p>
                </div>
              </div>
            </>
          )}
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
