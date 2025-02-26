import { useState } from "react";
import { useWeather } from "../hooks/useWeather";
import { useGeolocation } from "../hooks/useGeolocation";
import SearchBar from "../components/SearchBar";
import ForecastChart from "../components/ForecastChart";
import GeolocationButton from "../components/GeolocationButton";
import ThemeToggle from "../components/ThemeToggle";

const Home = () => {
  const [city, setCity] = useState<string | undefined>(undefined);
  const geolocation = useGeolocation();
  const { forecast, currentWeather, loading, locationName, country } = useWeather(city, geolocation ?? undefined);

  return (
    <div className="container">
      <h1>🌤 Weather Forecast</h1>
      <ThemeToggle />
      <div className="search-container">
        <SearchBar onSearch={setCity} />
        <GeolocationButton onLocate={() => setCity(undefined)} />
      </div>

      {/* Show Current Weather Data */}
      {currentWeather && (
        <div className="current-weather">
          <h2>{locationName}, {country}</h2>
          <div className="weather-info">
            <img 
              src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`} 
              alt={currentWeather.weather[0].description}
            />
            <div>
              <h3>{Math.round(currentWeather.main.temp)}°F</h3>
              <p>L: {Math.round(currentWeather.main.temp_min)}° H:{Math.round(currentWeather.main.temp_max)}°</p>
              <p>{currentWeather.weather[0].description}</p>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : (
        forecast && (
          <>
            {/* <h2>{locationName}{country && <span>, {country}</span>}</h2> Display the location name */}
            <div className="chart-container-wrapper">
              <ForecastChart forecast={forecast} />
            </div>
          </>
        )
      )}
    </div>
  );
};

export default Home;