import { useState } from "react"; // Removed useEffect
import axios from "axios";


const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

interface SearchBarProps {
  onSearch: (city: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  // Fetch city suggestions from OpenWeather API
  const fetchSuggestions = async (query: string) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
      );

      if (response.data) {
        setSuggestions(
          response.data.map((item: any) => 
            `${item.name}, ` + 
            (item?.state && item.state !== item.name ? `${item.state}, ` : '') + 
            `${item.country}`
          )
        );
        
        setSelectedIndex(-1); // Reset selection index when new suggestions appear
      }
    } catch (error) {
      console.error("Error fetching city suggestions:", error);
    }
  };

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCity(value);
    fetchSuggestions(value);
  };

  // Handle key navigation (Arrow Up, Arrow Down, Tab, Enter, Escape)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      setSelectedIndex((prevIndex) => (prevIndex + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prevIndex) => (prevIndex - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === "Tab") {
      e.preventDefault(); // Prevent default tabbing behavior
      setSelectedIndex((prevIndex) => (prevIndex + 1) % suggestions.length);
    } else if (e.key === "Enter") {
      if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
        handleSelect(suggestions[selectedIndex]);
      }else {
        onSearch(city);
      }
      setSuggestions([]); // Close dropdown after selecting
    }else if (e.key == "Escape"){
      setSuggestions([]); // Close dropdown when escape is pressed
    }
  };

  // Handle suggestion click
  const handleSelect = (selectedCity: string) => {
    setCity(selectedCity);
    setSuggestions([]);
    onSearch(selectedCity);
    setSelectedIndex(-1);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={city}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Enter city"
        className="search-input"
      />
      {/* <button onClick={() => onSearch(city)}>Search</button> */}

      {/* Autocomplete dropdown */}
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className={index === selectedIndex ? "selected" : ""}
              onClick={() => handleSelect(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
