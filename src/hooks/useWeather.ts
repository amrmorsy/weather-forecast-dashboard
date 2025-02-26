import { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY; // Load API key from .env

interface WeatherData {
  weather: { icon: string; description: string }[];
  main: { temp: number };
  name: string;
  sys: { country: string };
}


export const useWeather = (city?: string, coords?: { lat: number; lon: number }) => {
  const [forecast, setForecast] = useState(null);
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [locationName, setLocationName] = useState<string | null>(null); // Store city/location name
  const [country, setCountryName] = useState<string | null>(null); // Store country name

  useEffect(() => {
    if (!city && !coords) return;

    setLoading(true);
    const fetchWeather = async () => {
      const url = city
        ? `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&cnt=7&exclude=hourly,current,minutely&appid=${API_KEY}`
        : `https://api.openweathermap.org/data/2.5/forecast?lat=${coords?.lat}&lon=${coords?.lon}&units=imperial&cnt=7&exclude=hourly,current,minutely&appid=${API_KEY}`;


      try {
        const { data } = await axios.get(url);
        setForecast(data);
        setLocationName(data.city.name); // Extract the city name from API response
        setCountryName(data.city?.country ?? null);

        // Fetch current weather
        const currentWeatherUrl = city
          ? `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${API_KEY}`
          : `https://api.openweathermap.org/data/2.5/weather?lat=${coords?.lat}&lon=${coords?.lon}&units=imperial&appid=${API_KEY}`;

        const currentRes = await axios.get(currentWeatherUrl);
        setCurrentWeather(currentRes.data);

      } catch (error) {
        console.error("Error fetching weather:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city, coords]);

  return { forecast, currentWeather, loading, locationName, country }; // Return location name
};
