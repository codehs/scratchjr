import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, child, get } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAcr6VbVUx839a942VOHFeXoqBPME67GDA",
    authDomain: "scratchjr-test-e3843.firebaseapp.com",
    databaseURL: "https://scratchjr-test-e3843-default-rtdb.firebaseio.com",
    projectId: "scratchjr-test-e3843",
    storageBucket: "scratchjr-test-e3843.appspot.com",
    messagingSenderId: "719282954898",
    appId: "1:719282954898:web:9a8fc086b88baccbbe7c4b",
};

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

const rootRef = ref(db);

export function setThumbnail(studentAssignmentID, thumbnailURL) {
    set(
        child(rootRef, "project-sa-" + studentAssignmentID + "/thumbnail"),
        thumbnailURL
    );
}

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
