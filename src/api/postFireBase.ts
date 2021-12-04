import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import "firebase/auth";
import {
    addDoc,
    collection,
    getDoc,
    getDocs,
    getFirestore,
    orderBy,
    query,
    Timestamp,
    where
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import uuid from "uuid-random";
import { firebaseConfig } from "../../constants";

// api handle

initializeApp(firebaseConfig);


const storage = getStorage();
const db = getFirestore();

export const saveMediaToStorage = (media: any, path: any) => {
  return new Promise<any>((resolve, reject) => {
    const storageRef = ref(storage, path);
    return fetch(media)
      .then((res) => res.blob())
      .then((blob) => uploadBytes(storageRef, blob))
      .then((res) => getDownloadURL(res.ref))
      .then((downloadUrl) => resolve(downloadUrl))
      .catch((error) => reject(error));
  });
};

export const createPost: any = async ({
  source,
  sourceThumb,
  description,
  userId,
}: any): Promise<any> =>
  new Promise<any>((resolve, reject) => {
    const storangePostId = uuid();
    const allSavePromise = Promise.all([
      saveMediaToStorage(source, `posts/${userId}/${storangePostId}/video`),
      saveMediaToStorage(
        sourceThumb,
        `posts/${userId}/${storangePostId}/thumbnai`
      ),
    ]);
    allSavePromise.then(resolve).catch(reject);
  })
    .then(async (media) => {
      try {
        const docRef = await addDoc(collection(db, "posts"), {
          creator: userId,
          media: media,
          description: description,
          likes: 0,
          comments: 0,
          creation: Timestamp.fromDate(new Date()),
        });
        const docSnap = await getDoc(docRef);
        return docSnap.data();
      } catch (error) {
        throw error;
      }
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });

export const getPostsFromFirebase = async () => {
  const user: any = await AsyncStorage.getItem("user");
  const currenUser = JSON.parse(user);
  try {
    const docRef = await query(
      collection(db, "posts"),
      where("creator", "==", currenUser.user.uid),
      orderBy("creation", "desc")
    );
    const docSnap = await getDocs(docRef);
    const posts: any[] = [];
    docSnap.forEach((doc: any) => {
      posts.push({ id: doc.id, ...doc.data() });
    });
    return posts;
  } catch (error) {
    throw error;
  }
};