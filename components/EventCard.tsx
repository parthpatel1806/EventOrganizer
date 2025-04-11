import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, IconButton } from 'react-native-paper';
import { format } from 'date-fns';
import { Event } from '../services/events';

interface EventCardProps {
  event: Event;
  onDelete?: () => void;
  onToggleFavorite?: (isFavorite: boolean) => void | Promise<void>;
  isOwner?: boolean;
  isFavorite?: boolean;
}

export default function EventCard({
  event,
  onDelete,
  onToggleFavorite,
  isOwner = false,
  isFavorite = false,
}: EventCardProps) {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Title>{event.title}</Title>
        <Paragraph>{event.description}</Paragraph>
        <View style={styles.details}>
          <Paragraph style={styles.detail}>
            <IconButton icon="calendar" size={16} />{' '}
            {format(event.date instanceof Date ? event.date : new Date(event.date), 'PPP')}
          </Paragraph>
          <Paragraph style={styles.detail}>
            <IconButton icon="map-marker" size={16} /> {event.location}
          </Paragraph>
        </View>
      </Card.Content>
      <Card.Actions>
        {onToggleFavorite && (
          <IconButton
            icon={isFavorite ? 'heart' : 'heart-outline'}
            iconColor={isFavorite ? 'red' : undefined}
            onPress={() => onToggleFavorite?.(!isFavorite)}
          />
        )}
        {isOwner && onDelete && (
          <IconButton icon="delete" onPress={onDelete} iconColor="red" />
        )}
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
  },
  details: {
    marginTop: 10,
  },
  detail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});