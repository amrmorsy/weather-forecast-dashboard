interface GeolocationButtonProps {
  onLocate: () => void;
}

const GeolocationButton: React.FC<GeolocationButtonProps> = ({ onLocate }) => (
  <button className="geo-location-btn" onClick={onLocate}>📍 Use My Location</button>
);

export default GeolocationButton;
