import React from "react";
import ClearDay from "./../assets/clear-day.svg?react"
import ClearNight from "./../assets/clear-night.svg?react"
import Cloudy from "./../assets/cloudy.svg?react"
import Mist from "./../assets/mist.svg?react"
import OvercastDayRain from "./../assets/overcast-day-rain.svg?react"
import OvercastNightRain from "./../assets/overcast-night-rain.svg?react"
import OvercastDay from "./../assets/overcast-day.svg?react"
import OvercastNight from "./../assets/overcast-night.svg?react"
import PartlyCloudyDayRain from "./../assets/partly-cloudy-day-rain.svg?react"
import PartlyCloudyNightRain from "./../assets/partly-cloudy-night-rain.svg?react"
import PartlyCloudyDay from "./../assets/partly-cloudy-day.svg?react"
import PartlyCloudNight from "./../assets/partly-cloudy-night.svg?react"
import Snow from "./../assets/snow.svg?react"
import ThunderstormsDay from "./../assets/thunderstorms-day.svg?react"
import ThunderstormsNight from "./../assets/thunderstorms-night.svg?react"

interface WeatherIconProps {
  iconCode: string; // Weather icon code from OpenWeather API
  description?: string; // Accessible description for the icon
}
interface OpenWeatherIconMapper {
    [key: string]: React.FunctionComponent;
}


const openWeatherIconMapper: OpenWeatherIconMapper = {
  "01d": ClearDay,
  "01n": ClearNight,
  "02d": PartlyCloudyDay,
  "02n": PartlyCloudNight,
  "03d": Cloudy,
  "03n": Cloudy,
  "04d": OvercastDay,
  "04n": OvercastNight,
  "09d": OvercastDayRain,
  "09n": OvercastNightRain,
  "10d": PartlyCloudyDayRain,
  "10n": PartlyCloudyNightRain,
  "11d": ThunderstormsDay,
  "11n": ThunderstormsNight,
  "13d": Snow,
  "13n": Snow,
  "50d": Mist,
  "50n": Mist,
} as const;


const WeatherIcon: React.FC<WeatherIconProps> = ({ iconCode, description }) => {
    const Icon = openWeatherIconMapper[iconCode] || null;
    
    return (
      <div className="weather-icon">
        {Icon ? <Icon aria-label={description || "Weather icon"} /> : null}
      </div>
    );
  };

export default WeatherIcon;
