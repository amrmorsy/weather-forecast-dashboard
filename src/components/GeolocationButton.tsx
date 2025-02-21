const GeolocationButton = ({ onLocate }) => (
    <button onClick={onLocate} className="geo-location-btn bg-green-500 text-white p-2">
      Use My Location
    </button>
  );
  
  export default GeolocationButton;
  