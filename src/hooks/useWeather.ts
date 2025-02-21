import { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY; // Load API key from .env

export const useWeather = (city?: string, coords?: { lat: number; lon: number }) => {
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [locationName, setLocationName] = useState<string | null>(null); // Store city/location name

  useEffect(() => {
    if (!city && !coords) return;

    setLoading(true);
    const fetchWeather = async () => {
      const url = city
        ? `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
        : `https://api.openweathermap.org/data/2.5/forecast?lat=${coords?.lat}&lon=${coords?.lon}&units=metric&appid=${API_KEY}`;

      try {
        const { data } = await axios.get(url);
        setForecast(data);
        setLocationName(data.city.name); // Extract the city name from API response
      } catch (error) {
        console.error("Error fetching weather:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city, coords]);

  return { forecast, loading, locationName }; // Return location name
};
