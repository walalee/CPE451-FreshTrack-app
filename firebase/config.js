// firebase/config.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDrh574xHUeBYTQkY6a8n5eIV9SW3FOb1g",
    authDomain: "freshtrack-backend.firebaseapp.com",
    projectId: "freshtrack-backend",
    storageBucket: "freshtrack-backend.firebasestorage.app",
    messagingSenderId: "962272208834",
    appId: "1:962272208834:web:1eca72067d5e74d268985b",
    measurementId: "G-9Q6XX77JCT"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
