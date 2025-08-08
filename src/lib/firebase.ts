import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBu3uTiG1PO7JeLMLCg552Uw6H5xRGUINU",
  authDomain: "darshan-97205.firebaseapp.com",
  projectId: "darshan-97205",
  storageBucket: "darshan-97205.firebasestorage.app",
  messagingSenderId: "244389011898",
  appId: "1:244389011898:web:1ff2a30824e511292dfd83",
  measurementId: ""
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { app, db };
