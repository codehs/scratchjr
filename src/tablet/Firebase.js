import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, child, get } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBz7W0DEk-uLkkQUxdyskjdgAKKgCvKHvQ",
    authDomain: "scratch-jr-acc3d.firebaseapp.com",
    projectId: "scratch-jr-acc3d",
    storageBucket: "scratch-jr-acc3d.appspot.com",
    messagingSenderId: "474724746494",
    appId: "1:474724746494:web:0406abfe3203877385d1af",
    measurementId: "G-HHT5TR05MV",
};

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

const rootRef = ref(db);

export async function saveToFirebase(location, dbString) {
    await set(child(rootRef, location), dbString);
    return true;
}

export async function getFromFirebase(location) {
    const snapshot = await get(child(rootRef, location));
    if (snapshot.exists()) {
        return snapshot.val();
    } else {
        return null;
    }
}
