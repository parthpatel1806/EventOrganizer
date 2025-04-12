import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyDgK8f7lEpxJ-d7YIMatCAToa0iJY1yFeo",
  authDomain: "eventorganise.firebaseapp.com",
  projectId: "eventorganise",
  storageBucket: "eventorganise.firebasestorage.app",
  messagingSenderId: "57084760453",
  appId: "1:57084760453:web:ea6332efb1cdcdce11b4ec"
};

export const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const db = getFirestore(app);
