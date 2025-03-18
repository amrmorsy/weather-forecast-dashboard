import { useState, useEffect } from "react";
import axios from "axios";

export const useGeolocation = () => {
    const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);

    useEffect(() => {
        if ("geolocation" in navigator) {

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setCoords({ lat: position.coords.latitude, lon: position.coords.longitude });
                },
                async (error) => {
                    if (error.code === error.PERMISSION_DENIED) {
                        console.warn("User denied geolocation. Falling back to IP-based location...");
                        await fetchIPLocation(); // Trigger IP-based fallback 
                    } else {
                        console.error("Geolocation error:", error);
                    }
                }
            );
        } else {
            fetchIPLocation();
        }
    }, []);

    // Fallback: Fetch location via IP API
    const fetchIPLocation = async () => {
        try {
            const res = await axios.get("https://ipapi.co/json/");
            setCoords({
                lat: res.data.latitude,
                lon: res.data.longitude,
            });
        } catch (err) {
            console.error("IP location lookup failed:", err);
        }
    };


    return coords;
};
