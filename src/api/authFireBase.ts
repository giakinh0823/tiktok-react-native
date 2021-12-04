import { initializeApp } from "firebase/app";
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword
} from "firebase/auth";
import {
    doc,
    getDoc, getFirestore,
    setDoc
} from "firebase/firestore";
import { firebaseConfig } from "../../constants/firebase";
import { User } from '../models/User';
import AsyncStorage from '@react-native-async-storage/async-storage';

initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();

export const loginFirebase = ({ email, password }: User) =>
  new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(resolve)
      .catch(reject);
  })
    .then(async (user: any) => {
      try {
        const docRef = doc(db, "user", user.user.uid);
        const docSnap = await getDoc(docRef);
        await AsyncStorage.setItem("user", JSON.stringify(docSnap.data()));
        return docSnap.data();
      } catch (error) {
        throw error;
      }
    })
    .catch((error: any) => {
      throw error;
    });

export const registerFirebase = ({ email, password }: User) =>
  new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(resolve)
      .catch(reject);
  })
    .then(async (user: any) => {
      try {
        await setDoc(
          doc(db, "user", user.user.uid),
          JSON.parse(JSON.stringify(user))
        );
        const docRef = doc(db, "user", user.user.uid);
        const docSnap = await getDoc(docRef);
        await AsyncStorage.setItem("user", JSON.stringify(docSnap.data()));
        return docSnap.data();
      } catch (error) {
        throw error;
      }
    })
    .catch((error: any) => {
      throw error;
    });
