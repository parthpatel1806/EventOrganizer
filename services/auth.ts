import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  User,
  createUserWithEmailAndPassword as firebaseCreateUser,
  signInWithEmailAndPassword as firebaseSignIn,
  signOut
} from 'firebase/auth';

const firebaseConfig = {
  // Your config here
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export async function createUserWithEmailAndPassword(email: string, password: string) {
  return firebaseCreateUser(auth, email, password);
}

export async function signInWithEmailAndPassword(email: string, password: string) {
  return firebaseSignIn(auth, email, password);
}