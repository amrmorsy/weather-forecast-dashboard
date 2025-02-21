import { useState, useEffect } from "react";

export const useGeolocation = () => {
    const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);

    useEffect(() => {
        if (!navigator.geolocation) return;

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setCoords({ lat: position.coords.latitude, lon: position.coords.longitude });
            },
            (error) => console.error("Geolocation error:", error)
        );
    }, []);

    return coords;
};
