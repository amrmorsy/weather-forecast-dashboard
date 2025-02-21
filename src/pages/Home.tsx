import { useState } from "react";
import { useWeather } from "../hooks/useWeather";
import { useGeolocation } from "../hooks/useGeolocation";
import SearchBar from "../components/SearchBar";
import ForecastChart from "../components/ForecastChart";
import GeolocationButton from "../components/GeolocationButton";

const Home = () => {
  const [city, setCity] = useState<string | null>(null);
  const geolocation = useGeolocation();
  const { forecast, loading, locationName } = useWeather(city, geolocation);

  return (
    <div className="container">
      <h1>🌤 Weather Forecast</h1>
      <div className="search-container">
        <SearchBar onSearch={setCity} />
        <GeolocationButton onLocate={() => setCity(null)} />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        forecast && (
          <>
            <h2>{locationName}</h2> {/* Display the location name */}
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