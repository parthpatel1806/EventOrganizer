import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { getFavoriteEvents, toggleFavorite } from '../services/events';
import EventCard from '../components/EventCard';
import { useFocusEffect } from '@react-navigation/native';
import { Event } from '../services/events';

export default function FavoritesScreen() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      if (!user?.uid) return;
      const favoriteEvents = await getFavoriteEvents(user.uid);
      setFavorites(favoriteEvents);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchFavorites();
    }, [])
  );

  const handleToggleFavorite = async (eventId: string) => {
    try {
      await toggleFavorite(eventId, user?.uid || '', true);
      fetchFavorites();
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator animating={true} style={styles.loader} />
      ) : (
        <FlatList
          data={favorites}
          renderItem={({ item }) => (
            <EventCard
              event={item}
              onToggleFavorite={() => {
                if (item.id) {
                  handleToggleFavorite(item.id);
                }
              }}
              isFavorite={true}
            />
          )}
          keyExtractor={(item) => item.id || ''}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: 10,
  },
  loader: {
    marginTop: 20,
  },
});