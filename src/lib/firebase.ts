import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "notionai-20476.firebaseapp.com",
  projectId: "notionai-20476",
  storageBucket: "notionai-20476.appspot.com",
  messagingSenderId: "64589462362",
  appId: "1:64589462362:web:2a97e352bb3fd65ae99163"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app)

export async function uploadToFirebase(imageUrl: string, name: string) {
  try {
    const response = await fetch(imageUrl);
    const buffer = await response.arrayBuffer();
    const file_name = name.replace(" ", "") + Date.now() + ".jpeg";
    const storeageRef = ref(storage, file_name);
    await uploadBytes(storeageRef, buffer, {
        contentType: "image/jpeg",
    });
    const firebaseUrl = await getDownloadURL(storeageRef);
    return firebaseUrl
  } catch (error) {
    console.error(error);
  }
}