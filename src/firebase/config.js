import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your Firebase configuration
// You'll need to replace these with your actual Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyC-CzDeug9dZ7igEcc9rCasKduea4AxDb4",
  authDomain: "testyourmodels-blog.firebaseapp.com",
  projectId: "testyourmodels-blog",
  storageBucket: "testyourmodels-blog.firebasestorage.app",
  messagingSenderId: "848205587523",
  appId: "1:848205587523:web:3af36505ccac3b39ace0f6",
  measurementId: "G-7DXTBRVJRZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
