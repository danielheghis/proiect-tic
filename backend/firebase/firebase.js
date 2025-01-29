const { initializeApp } = require("firebase/app");
const {
  getFirestore,
  doc,
  setDoc,
  getDocs,
  query,
  addDoc,
  collection,
} = require("firebase/firestore");

const {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
} = process.env;

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
};

let app;
let firestoreDb;

const initializeFirebaseApp = () => {
  try {
    app = initializeApp(firebaseConfig);
    firestoreDb = getFirestore(app);
    console.log("Firestore initialized:");
    return app;
  } catch (error) {
    console.error("Firebase initialization error", error.stack);
  }
};

const uploadData = async () => {
  const dataToUpload = {
    key1: "ronaldo",
    key2: "real madrid",
  };
  try {
    const document = doc(firestoreDb, "test", "random-id");
    let dataUpdated = await setDoc(document, dataToUpload);
    return dataUpdated;
  } catch (error) {
    console.error("Error uploading data to firebase", error.stack);
  }
};

const getData = async () => {
  try {
    const collectionRef = collection(firestoreDb, "test");
    const finalData = [];
    const q = query(collectionRef);

    const docSnap = await getDocs(q);

    docSnap.forEach((doc) => {
      finalData.push(doc.data());
    });

    return finalData;
  } catch (error) {
    console.error("Error getting documents", error.stack);
  }
};

const getFirebaseApp = () => {
  return app;
};

const getFirestoreDb = () => {
  return firestoreDb;
};

module.exports = {
  initializeFirebaseApp,
  getFirestoreDb,
  getFirebaseApp,
  uploadData,
  getData,
};
