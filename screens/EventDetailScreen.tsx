import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Button, Appbar, TextInput } from 'react-native-paper';
import { useAuth } from '../context/AuthContext';
import {
  addEvent,
  updateEvent,
  getEventById,
} from '../services/events';
import { validateEvent } from '../utils/validators';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Event } from '../services/events';
import { RouteProp } from '@react-navigation/native';


type EventDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'EventDetail'
>;

type EventDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'EventDetail'
>;

interface Props {
  navigation: EventDetailScreenNavigationProp;
  route: EventDetailScreenRouteProp;
}

export default function EventDetailScreen({ route, navigation }: Props) {
  const { user } = useAuth();
  const { event: initialEvent } = route.params;
  const [event, setEvent] = useState<Omit<Event, 'id'> & { id?: string }>({
    title: '',
    description: '',
    date: new Date(),
    location: '',
    userId: user?.uid || '',
    ...(initialEvent || {}),
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      if (initialEvent?.id) {
        try {
          setLoading(true);
          const eventData = await getEventById(initialEvent.id);
          if (eventData) {
            setEvent(eventData);
          }
        } catch (error) {
          Alert.alert('Error', 'Failed to fetch event details');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchEvent();
  }, [initialEvent?.id]);

  const handleSave = async () => {
    const validatedEvent = {
      title: event.title || '',
      description: event.description || '',
      date: event.date instanceof Date ? event.date : new Date(event.date),
      location: event.location || '',
      userId: event.userId || ''
    };
    if (!validateEvent(validatedEvent)) {
      Alert.alert('Validation Error', 'Please fill all required fields with valid values');
      return;
    }

    setLoading(true);
    try {
      if (event.id) {
        await updateEvent(event.id, {
          title: event.title,
          description: event.description,
          date: event.date,
          location: event.location,
          userId: event.userId
        });
      } else {
        await addEvent({
          title: event.title,
          description: event.description,
          date: event.date,
          location: event.location,
          userId: event.userId || ''
        });
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to save event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content
          title={event.id ? 'Edit Event' : 'Create Event'}
        />
      </Appbar.Header>
      <ScrollView contentContainerStyle={styles.content}>
        <TextInput
          label="Title"
          value={event.title}
          onChangeText={(text) => setEvent({ ...event, title: text })}
          style={styles.input}
        />
        <TextInput
          label="Description"
          value={event.description}
          onChangeText={(text) => setEvent({ ...event, description: text })}
          style={styles.input}
          multiline
          numberOfLines={3}
        />
        <TextInput
          label="Date"
          value={event.date instanceof Date ? event.date.toISOString().split('T')[0] : ''}
          onChangeText={(text) => {
            const date = new Date(text);
            if (!isNaN(date.getTime())) {
              setEvent({ ...event, date });
            }
          }}
          style={styles.input}
          placeholder="YYYY-MM-DD"
          keyboardType="numbers-and-punctuation"
        />
        <TextInput
          label="Location"
          value={event.location}
          onChangeText={(text) => setEvent({ ...event, location: text })}
          style={styles.input}
        />
        <Button
          mode="contained"
          onPress={handleSave}
          style={styles.button}
          loading={loading}
          disabled={loading}
        >
          Save
        </Button>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
  },
});