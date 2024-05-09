/**
 * This is used to get nudging/focus to work for students in Scratch JR.
 */

import { getDatabase } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { ref } from 'firebase/database';
import { onChildChanged } from 'firebase/database';

function getFirebaseRef ( userID ) {
    // Returns reference to a node on Realtime Database"
    var isLocal = window.isLocal;

    var FIREBASE_URL = 'https://live-dashboard-d4d0e-default-rtdb.firebaseio.com/';
    var refPath = isLocal ? 'LOCAL_NAV/' : 'LIVE_NAV/';
    refPath += userID;
    var firebaseApp = initializeApp({
        databaseURL: FIREBASE_URL
    });

    const db = getDatabase(firebaseApp);
    var nodeRef = ref(db, refPath);
    return nodeRef;
}

function navigateToUrl (snapshot) {
    var val = snapshot.val();
    var url = val.url;
    if (url && window.location.pathname != url) {
        window.location.href = url;
    }
}

export default function setupRealtime () {
    var nodeRef = getFirebaseRef(window.userData.id);
    onChildChanged(nodeRef, navigateToUrl);
}
