import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  getDoc,
  arrayUnion,
  arrayRemove
} from 'firebase/firestore';
import { db } from '../firebase-config';

export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  imageUrl?: string;
  isFavorite?: boolean;
  userId?: string;
  favorites?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface EventInput extends Omit<Event, 'id'> {}

function parseEventDates(event: any): Event {
  return {
    ...event,
    date: typeof event.date === 'string' ? new Date(event.date) : event.date
  };
}

const eventsCollection = collection(db, 'events');

export const getEvents = async (): Promise<Event[]> => {
  const snapshot = await getDocs(eventsCollection);
  return snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      title: data.title,
      description: data.description,
      date: data.date ? new Date(data.date) : new Date(),
      location: data.location,
      imageUrl: data.imageUrl,
      isFavorite: data.isFavorite,
      userId: data.userId
    } as Event;
  });
};

export const getEventById = async (id: string): Promise<Event | null> => {
  const docRef = doc(db, 'events', id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) return null;
  
  const data = docSnap.data();
  return {
    id: docSnap.id,
    title: data.title,
    description: data.description,
    date: data.date ? new Date(data.date) : new Date(),
    location: data.location,
    imageUrl: data.imageUrl,
    isFavorite: data.isFavorite,
    userId: data.userId
  } as Event;
};

export const addEvent = async (event: Omit<Event, 'id'>): Promise<string> => {
  const docRef = await addDoc(eventsCollection, event);
  return docRef.id;
};

export const updateEvent = async (id: string, event: Partial<Event>): Promise<void> => {
  const docRef = doc(db, 'events', id);
  await updateDoc(docRef, event);
};

export const getFavoriteEvents = async (userId: string): Promise<Event[]> => {
  const q = query(eventsCollection, where('isFavorite', '==', true));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      title: data.title,
      description: data.description,
      date: data.date ? new Date(data.date) : new Date(),
      location: data.location,
      imageUrl: data.imageUrl,
      isFavorite: data.isFavorite,
      userId: data.userId
    } as Event;
  });
};

export const toggleFavorite = async (eventId: string, userId: string, isFavorite: boolean): Promise<void> => {
  const docRef = doc(db, 'events', eventId);
  await updateDoc(docRef, {
    favorites: isFavorite ? arrayUnion(userId) : arrayRemove(userId)
  });
};

export const deleteEvent = async (eventId: string): Promise<void> => {
  const docRef = doc(db, 'events', eventId);
  await deleteDoc(docRef);
};
