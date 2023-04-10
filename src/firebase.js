import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyAH9ZEpDyM1NIoWxK7LrHjvidqMQinViBI",
    authDomain: "event-368712.firebaseapp.com",
    projectId: "event-368712",
    storageBucket: "event-368712.appspot.com",
    messagingSenderId: "937825775089",
    appId: "1:937825775089:web:19f0d7a0fa9bae1910e850"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
const init = {
    db,
    storage,
    app,
    auth
}
export default init;