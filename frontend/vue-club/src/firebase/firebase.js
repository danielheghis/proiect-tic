import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const {
  VUE_APP_FIREBASE_API_KEY,
  VUE_APP_FIREBASE_AUTH_DOMAIN,
  VUE_APP_FIREBASE_PROJECT_ID,
  VUE_APP_FIREBASE_STORAGE_BUCKET,
  VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  VUE_APP_FIREBASE_APP_ID,
} = process.env;

const firebaseConfig = {
  apiKey: VUE_APP_FIREBASE_API_KEY,
  authDomain: VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: VUE_APP_FIREBASE_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
const firestoreDb = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);
const auth = getAuth(firebaseApp);

export { firestoreDb, storage, auth };
