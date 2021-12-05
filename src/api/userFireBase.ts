import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { firebaseConfig } from "../../constants/firebase";
import { saveMediaToStorage } from "./postFireBase";

initializeApp(firebaseConfig);

const db = getFirestore();

export const saveUserToFirebase: any = async (image: any): Promise<any> => {
  const user: any = await AsyncStorage.getItem("user");
  const currentUser = JSON.parse(user);
  return new Promise<any>((resolve, reject) => {
    saveMediaToStorage(image, `profile/${currentUser.user.uid}`)
      .then(resolve)
      .catch(reject);
  })
    .then(async (media) => {
      const user: any = await AsyncStorage.getItem("user");
      const currentUser = JSON.parse(user);
      const dataUser = currentUser.user;
      dataUser.providerData[0].photoURL = media;
      try {
        const docRef = doc(db, "user", currentUser.user.uid);
        await setDoc(docRef, { user: dataUser }, { merge: true });
        const docSnap = await getDoc(docRef);
        await AsyncStorage.setItem("user", JSON.stringify(docSnap.data()));
        return docSnap.data();
      } catch (error) {
        throw error;
      }
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
};

export const saveUserFieldToFirebase: any = async ({
  field,
  value,
}: any): Promise<any> => {
  const user: any = await AsyncStorage.getItem("user");
  const currentUser = JSON.parse(user);
  const dataUser = currentUser.user;
  dataUser.providerData[0][field] = value;
  try {
    const docRef = doc(db, "user", currentUser.user.uid);
    await setDoc(docRef, { user: dataUser }, { merge: true });
    const docSnap = await getDoc(docRef);
    await AsyncStorage.setItem("user", JSON.stringify(docSnap.data()));
    return docSnap.data();
  } catch (error) {
    throw error;
  }
};

export const getUserFromFirebase: any = async (): Promise<any> => {
  const user: any = await AsyncStorage.getItem("user");
  const currentUser = JSON.parse(user);
  try {
    const docRef = doc(db, "user", currentUser.user.uid);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  } catch (error) {
    throw error;
  }
};

export const getListUserFromFirebase: any = async (
  params: any
): Promise<any> => {
  try {
    const docRef = await query(collection(db, "user"));
    const docSnap = await getDocs(docRef);
    const list: any[] = [];
    docSnap.forEach((doc) => {
      if (
        doc.data().user.providerData[0][params.field].toLowerCase().indexOf(params.value.toLowerCase()) >= 0
      ) {
        list.push({ id: doc.id, ...doc.data() });
      }
    });
    return list;
  } catch (error) {
    throw error;
  }
};
