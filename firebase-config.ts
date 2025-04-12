// firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Replace these values with your actual Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDgK8f7lEpxJ-d7YIMatCAToa0iJY1yFeo",
  authDomain: "eventorganise.firebaseapp.com",
  projectId: "eventorganise",
  storageBucket: "eventorganise.firebasestorage.app",
  messagingSenderId: "57084760453",
  appId: "1:57084760453:web:ea6332efb1cdcdce11b4ec"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Optional: Add any additional Firebase services you need
