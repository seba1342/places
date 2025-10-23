import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Place } from '../types';

interface ListViewProps {
  places: Place[];
}

const ListView: React.FC<ListViewProps> = ({ places }) => {
  const renderItem = ({ item }: { item: Place }) => (
    <View style={styles.item}>
      <View style={styles.header}>
        <Text style={styles.name}>{item.name}</Text>
        {item.rating && (
          <Text style={styles.rating}>★ {item.rating.toFixed(1)}</Text>
        )}
      </View>
      <Text style={styles.category}>{item.category}</Text>
      {item.description && (
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>
      )}
      {item.address && <Text style={styles.address}>{item.address}</Text>}
    </View>
  );

  return (
    <FlatList
      data={places}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  item: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  rating: {
    fontSize: 16,
    color: '#FFB800',
    fontWeight: '600',
  },
  category: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  address: {
    fontSize: 12,
    color: '#999',
  },
  separator: {
    height: 12,
  },
});

export default ListView;
