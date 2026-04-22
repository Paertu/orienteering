import { StyleSheet, Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import React, { useRef, useState, useEffect } from 'react';
import { useLocation } from '../hooks/useLocation';

const Map = ({ children, onLongPress }) => {
    const mapRef = useRef(null);
    const {location, errorMsg} = useLocation();
    const [isMapReady, setIsMapReady] = useState(false);

    useEffect(() => {
        if (isMapReady && location) {
            mapRef.current?.animateCamera({
                center: {
                    latitude: location.latitude, 
                    longitude: location.longitude
                },
                pitch: 0,
                heading: 0,
                altitude: 1,
                zoom: 16
            });
        }
    }, [isMapReady, location])
        


    return (
        <MapView
            ref={mapRef}
            onMapReady={() => setIsMapReady(true)}
            onLongPress={onLongPress}
            showsUserLocation={true}
            followsUserLocation={true}
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            mapType='satellite'
            // initialCamera={{
            //     center: {
            //         latitude: 59.22693030653677,
            //         longitude: 24.138830513826036
            //     },
            // pitch: 0,
            // heading: 0,
            // altitude: 1,
            // zoom: 16
            // }}
            
        >
            {children}
        </MapView>
    );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFill,
  }
});

export default Map;