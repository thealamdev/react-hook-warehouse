import { useState, useEffect } from "react";
import type { LocationInterface } from "../../interfaces/LocationInterface";

export const useLocation = () => {
    const [location, setLocation] = useState<LocationInterface>({});

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                    setLocation({
                        latitude: position.coords.latitude.toString(),
                        longitude: position.coords.longitude.toString(),
                        timezone,
                    });
                },
                (error) => {
                    setLocation({
                        latitude: "0",
                        longitude: "0",
                        timezone: "UTC",
                    });
                }
            );
        } else {
            setLocation({
                latitude: "0",
                longitude: "0",
                timezone: "UTC",
            });
        }
    }, []);

    return location;
};
