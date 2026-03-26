import { StyleSheet, Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import React, { useRef } from 'react';

export default function App() {
  const mapRef = useRef(null);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        mapType='satellite'
        initialCamera={{
          center: {
            latitude:59.22693030653677,
            longitude:24.138830513826036,
          },
          pitch: 0,
          heading: 0,
          altitude: 1,
          zoom: 16
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFill,
  }
});
