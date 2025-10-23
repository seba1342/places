import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { Place } from '../types';
import { Text } from 'react-native';

interface MapViewProps {
  places: Place[];
}

const MapViewComponent: React.FC<MapViewProps> = ({ places }) => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -37.8136,
          longitude: 144.9631,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {places.map((place) => (
          <Marker
            key={place.id}
            coordinate={{
              latitude: place.lat,
              longitude: place.lng,
            }}
            title={place.name}
          >
            <Callout>
              <View style={styles.callout}>
                <Text style={styles.calloutTitle}>{place.name}</Text>
                <Text style={styles.calloutCategory}>{place.category}</Text>
                {place.rating && (
                  <Text style={styles.calloutRating}>★ {place.rating}</Text>
                )}
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  callout: {
    padding: 8,
    minWidth: 150,
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  calloutCategory: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  calloutRating: {
    fontSize: 12,
    color: '#FFB800',
  },
});

export default MapViewComponent;
