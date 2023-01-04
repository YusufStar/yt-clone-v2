import { getDatabase } from "firebase/database";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import "firebase/firestore";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDPHH_qIsrskPD4fvatJzWY2S_pAzqEQH0",
  authDomain: "yt-clone-pro.firebaseapp.com",
  databaseURL: "https://yt-clone-pro-default-rtdb.firebaseio.com",
  projectId: "yt-clone-pro",
  storageBucket: "yt-clone-pro.appspot.com",
  messagingSenderId: "550428149237",
  appId: "1:550428149237:web:5840cb8239e2010093ccbc",
  measurementId: "G-PC5BMNBLPR",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

export { database, auth, app };