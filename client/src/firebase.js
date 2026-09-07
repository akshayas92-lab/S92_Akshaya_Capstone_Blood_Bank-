import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD5VLjVTcMA-ftxIVmw_06OWflrTjDJ288",
  authDomain: "blood-bank-92ff1.firebaseapp.com",
  projectId: "blood-bank-92ff1",
  storageBucket: "blood-bank-92ff1.firebasestorage.app",
  messagingSenderId: "852896062293",
  appId: "1:852896062293:web:600205e81e484848d1addc"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();