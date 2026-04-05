import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA2nD4HIfqh4P5HnYu74TrCnmAHxoHrkhA",
  authDomain: "laptopzone-infotech.firebaseapp.com",
  projectId: "laptopzone-infotech",
  storageBucket: "laptopzone-infotech.firebasestorage.app",
  messagingSenderId: "108602278324",
  appId: "1:108602278324:web:ac75db9d3ca99f8397b2e1",
  measurementId: "G-P179BHE901"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
