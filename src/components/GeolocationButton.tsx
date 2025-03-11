import { useTheme } from "../context/ThemeContext";

interface GeolocationButtonProps {
  onLocate: () => void;
}

const GeolocationButton: React.FC<GeolocationButtonProps> = ({ onLocate }) => {
  const { theme } = useTheme();
  return (
    <div className="geo-location-btn" role="button" tabIndex={0} onClick={onLocate}>
      <svg xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="0 0 256 256"
        fill={theme == "dark" ? "#FBBF24" : "gray"}
        stroke="#FBBF24">
        <path d="M141.1 243.4 246 12.6 10 117.5h131.1v125.9z" />
      </svg>
    </div>
  )
};

export default GeolocationButton;
