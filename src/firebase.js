import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD6v0AXw-snWqholKy6cXb6SmbYHR9Px28",
  authDomain: "my-diary-site-react-firebase.firebaseapp.com",
  projectId: "my-diary-site-react-firebase",
  storageBucket: "my-diary-site-react-firebase.appspot.com",
  messagingSenderId: "967682586183",
  appId: "1:967682586183:web:7280147217d928227c2362",
  measurementId: "G-MKB1WER3NH",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();
const provider = new GoogleAuthProvider();
const db = getFirestore();

export { auth, provider, db };
