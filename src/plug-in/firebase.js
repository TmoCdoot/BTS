import { initializeApp } from 'firebase/app';
import { getFirestore , doc, setDoc, updateDoc, getDoc   } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, onSnapshot   } from "firebase/auth";

const firebaseConfig = initializeApp({
  apiKey: "AIzaSyAlQQBc9NSGNecaPtOMnAMwVPwvCBQM4oA",
  authDomain: "cryptofuture41700.firebaseapp.com",
  projectId: "cryptofuture41700",
  storageBucket: "cryptofuture41700.appspot.com",
  messagingSenderId: "443389965883",
  appId: "1:443389965883:web:3e87159043bb2dc134ce1e"
});

const db = getFirestore(firebaseConfig);
const auth = getAuth(firebaseConfig);

export { db, doc, setDoc, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateDoc, getDoc, onSnapshot   };