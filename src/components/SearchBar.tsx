import { useState } from "react";

interface SearchBarProps {
  onSearch: (city: string) => void;
}

const SearchBar = ({ onSearch }) => {
    const [city, setCity] = useState("");
  
    return (
      <div className="search-container">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
        />
        <button onClick={() => onSearch(city)}>Search</button>
      </div>
    );
  };

export default SearchBar;
