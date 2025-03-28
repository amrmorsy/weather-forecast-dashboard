import { useState, useRef } from "react";
import axios from "axios";


const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

interface SearchBarProps {
  searchValue: string;
  setSearchValue: (val: string) => void;
  onSearch: (city: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchValue, setSearchValue, onSearch }) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);

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
    setSearchValue(value)
    fetchSuggestions(value);
  };

  // Handle key navigation (Arrow Up, Arrow Down, Tab, Enter, Escape)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      setSelectedIndex((prevIndex) => (prevIndex + 1) % suggestions.length);
    } else if (e.key === "ArrowUp" || (e.shiftKey && e.key === "Tab")) {
      e.preventDefault();
      setSelectedIndex((prevIndex) => (prevIndex - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === "Tab") {
      e.preventDefault(); // Prevent default tabbing behavior
      setSelectedIndex((prevIndex) => (prevIndex + 1) % suggestions.length);
    } else if (e.key === "Enter") {
      if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
        const userSelected = suggestions[selectedIndex];
        onSearch(userSelected);
        setSearchValue(userSelected)
      } else {
        onSearch(searchValue)
      }
      setSuggestions([]); // Close dropdown after selecting
    } else if (e.key == "Escape") {
      setSuggestions([]); // Close dropdown when escape is pressed
    }
  };

  const handleSelect = (selectedCity: string) => {
    setSearchValue(selectedCity)
    setSuggestions([]);
    onSearch(selectedCity);
    setSelectedIndex(-1);
  };

  const clearInput = () => {
    setSearchValue("");
    setSuggestions([]);
    inputRef?.current?.focus();
  }

  return (

    <div className="search-container">
      {/* Search Icon */}
      <span className="search-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="gray"
          viewBox="0 0 16 16"
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001l3.85 3.85a1 1 0 0 0 1.415-1.415l-3.85-3.85zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
        </svg>
      </span>

      {/* Input Field */}
      <input
        type="text"
        value={searchValue}
        ref={inputRef}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Enter City"
        className="search-input"
      />

      {/* Clear (X) Icon - Appears only when there is text */}
      {searchValue && (
        <button
          onClick={clearInput}
          className="clear-input"
          aria-label="Clear search"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="gray"
            viewBox="0 0 16 16"
          >
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
          </svg>
        </button>
      )}

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
