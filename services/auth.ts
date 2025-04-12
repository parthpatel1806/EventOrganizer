import { 
  User,
  createUserWithEmailAndPassword as firebaseCreateUser,
  signInWithEmailAndPassword as firebaseSignIn,
  signOut
} from 'firebase/auth';
import { auth } from '../firebase-config';

export async function createUserWithEmailAndPassword(email: string, password: string) {
  return firebaseCreateUser(auth, email, password);
}

export async function signInWithEmailAndPassword(email: string, password: string) {
  return firebaseSignIn(auth, email, password);
}