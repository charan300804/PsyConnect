
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  "projectId": "studio-5041521954-b5fd5",
  "appId": "1:588391671728:web:36efff96340d39aeb21875",
  "storageBucket": "studio-5041521954-b5fd5.firebasestorage.app",
  "apiKey": "AIzaSyAFq8nW_S7PJF8oY37rfr1j6MG32zrNuxE",
  "authDomain": "studio-5041521954-b5fd5.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "588391671728"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
