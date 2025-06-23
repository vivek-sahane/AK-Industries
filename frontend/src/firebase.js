import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCtvQclOUmGtSdlxf2GPNEmcJuUBWUD69U",
  authDomain: "akindustries-e8ea0.firebaseapp.com",
  projectId: "akindustries-e8ea0",
  storageBucket: "akindustries-e8ea0.appspot.com",
  messagingSenderId: "452942833079",
  appId: "1:452942833079:web:3ca59531a12ed6526ab432",
  measurementId: "G-FXK29WYSB0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth }; 
