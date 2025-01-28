import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC-ogms5hE4a58o0WP8kb7IMkTiZY_Z_JA",
  authDomain: "mapmytrip-7fa30.firebaseapp.com",
  projectId: "mapmytrip-7fa30",
  storageBucket: "mapmytrip-7fa30.firebasestorage.app",
  messagingSenderId: "379719503870",
  appId: "1:379719503870:web:2635cf80c3179449d8faaf"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);