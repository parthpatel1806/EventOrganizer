import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Button, Appbar, ActivityIndicator } from 'react-native-paper';
import { useAuth } from './context/AuthContext';
import { auth } from './services/auth';
import { getEvents, deleteEvent, toggleFavorite, Event } from './services/events';
import EventCard from './components/EventCard';
import { useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './navigation/AppNavigator';

type DashboardScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

interface Props {
  navigation: DashboardScreenNavigationProp;
}

export default function DashboardScreen({ navigation }: Props) {
  const { user } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const eventsData = await getEvents();
      setEvents(eventsData);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchEvents();
    }, [])
  );

  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this event?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteEvent(eventId);
              fetchEvents();
            } catch (error) {
              Alert.alert('Error', 'Failed to delete event');
            }
          },
        },
      ]
    );
  };

  const handleToggleFavorite = async (eventId: string, isFavorite: boolean) => {
    try {
      if (!user?.uid) {
        throw new Error('User not authenticated');
      }
      await toggleFavorite(eventId, user.uid, isFavorite);
      fetchEvents();
    } catch (error) {
      Alert.alert('Error', error instanceof Error ? error.message : 'Failed to update favorite status');
    }
  };

  const renderItem = ({ item }: { item: Event }) => {
    if (!item.id) return null;
    
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('EventDetail', { event: item })}
      >
        <EventCard
          event={item}
          onDelete={() => handleDeleteEvent(item.id)}
          onToggleFavorite={(isFavorite) => handleToggleFavorite(item.id, isFavorite)}
          isOwner={item.userId === user?.uid}
          isFavorite={item.favorites?.includes(user?.uid || '') || false}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Events" />
        <Appbar.Action icon="logout" onPress={handleSignOut} />
      </Appbar.Header>
      {loading ? (
        <ActivityIndicator animating={true} style={styles.loader} />
      ) : (
        <FlatList
          data={events}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      )}
      <Button
        mode="contained"
        style={styles.addButton}
        onPress={() => navigation.navigate('EventDetail', { event: null })}
      >
        Create Event
      </Button>
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
  addButton: {
    margin: 20,
  },
});