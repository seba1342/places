import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useQuery } from '@apollo/client';
import { SEARCH_PLACES } from '../graphql/queries';
import MapViewComponent from '../components/MapView';
import ListView from '../components/ListView';
import { Place, PlaceConnection } from '../types';

type ViewMode = 'map' | 'list';

interface SearchPlacesData {
  searchPlaces: PlaceConnection;
}

const HomeScreen: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('map');

  const { loading, error, data } = useQuery<SearchPlacesData>(SEARCH_PLACES, {
    variables: {
      first: 100,
    },
  });

  const places: Place[] = data?.searchPlaces.edges.map((edge) => edge.node) || [];

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading places...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error loading places</Text>
        <Text style={styles.errorDetails}>{error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Places</Text>
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[styles.toggleButton, viewMode === 'map' && styles.toggleButtonActive]}
            onPress={() => setViewMode('map')}
          >
            <Text style={[styles.toggleText, viewMode === 'map' && styles.toggleTextActive]}>
              Map
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, viewMode === 'list' && styles.toggleButtonActive]}
            onPress={() => setViewMode('list')}
          >
            <Text style={[styles.toggleText, viewMode === 'list' && styles.toggleTextActive]}>
              List
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.content}>
        {viewMode === 'map' ? (
          <MapViewComponent places={places} />
        ) : (
          <ListView places={places} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 4,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  toggleButtonActive: {
    backgroundColor: '#007AFF',
  },
  toggleText: {
    fontSize: 16,
    color: '#666',
  },
  toggleTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D32F2F',
    marginBottom: 8,
  },
  errorDetails: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

export default HomeScreen;
