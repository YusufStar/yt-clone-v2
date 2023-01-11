import { child, get, getDatabase, push, ref, set, update } from "firebase/database";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getStorage
} from "@firebase/storage";
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
const storage = getStorage(app)

export const createUser = (uid) => {
  const dbref = ref(database);
  get(child(dbref, `/Channels/${uid}`)).then((snap) => {
    if (!snap.exists()) {
      set(ref(database, `/Channels/${uid}`), {
        id: new Date().getTime().toString(),
        photoURL: auth.currentUser.photoURL,
        email: auth.currentUser.email,
        name: auth.currentUser.displayName.replace(" ", ""),
        uid: auth.currentUser.uid,
        likeVideos: [],
        dislikeVideos: [],
        videos: [],
        history: [],
        watchLater: [],
      });
    }
  });
};

function randomIdGenerator(length) {
  var result = "";
  var characters = "0123456789";
  for (var i = 0; i < length; i++) {
    result += characters[Math.floor(Math.random() * characters.length)];
  }
  result = result.match(/\d{1,4}/g).join("-");
  return result;
}

export const createVideo = (video, banner, desc, videoName) => {
  const key = randomIdGenerator(12);
  const date = new Date().getTime().toString()
  const dbref = ref(database);
  const uid = auth.currentUser.uid
  push(ref(database, "/videos"), {
    banner: banner,
    channelProfile: auth.currentUser.photoURL,
    videoName: videoName,
    channelName: auth.currentUser.displayName.replace(" ", ""),
    view: "1 B",
    date: date,
    video: video,
    description: desc,
    id: key,
    uid: uid
  }).then(() => {
    get(child(dbref, `/Channels/${uid}`)).then((snap) => {
      if (snap.exists()) {
        update(ref(database, `/Channels/${uid}`), {
          videos: snap.val.videos ? [...snap.val.videos, key] : [...[], key]
        });
      }
    });
  })
};

export { database, auth, app, storage };