import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
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
      const dataUser= currentUser.user;
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
