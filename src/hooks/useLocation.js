import * as Location from 'expo-location';
import { useState, useEffect } from 'react';

export const useLocation = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
    (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== Location.PermissionStatus.GRANTED) {
            setErrorMsg(`user denied location permissions`);
            return;
        }

        let userLocation = await Location.getCurrentPositionAsync({});
        setLocation(userLocation.coords);
    })();
    }, []);

    return {location, errorMsg}
}