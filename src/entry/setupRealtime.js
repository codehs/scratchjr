/**
 * This is used to get nudging/focus to work for students in Scratch JR.
 */

import { getDatabase } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { ref } from 'firebase/database';
import { onChildChanged } from 'firebase/database';

function getFirebaseRef (sectionID, isNav) {
    // Returns reference to a node on Realtime Database"
    var isLocal = window.isLocal;

    var FIREBASE_URL = 'https://live-dashboard-d4d0e-default-rtdb.firebaseio.com/';
    var refPath;
    if (isNav) {
        refPath = isLocal ? 'LOCAL_NAV/' : 'LIVE_NAV/';
    } else {
        refPath = (isLocal ? 'LOCAL/' : 'LIVE') + sectionID;
    }
    var firebaseApp = initializeApp({
        databaseURL: FIREBASE_URL
    });

    const db = getDatabase(firebaseApp);
    var $ref = ref(db, refPath);
    return $ref;
}

function navigateToUrl (snapshot) {
    var val = snapshot.val();
    var url = val.url;
    if (url && window.location.pathname != url) {
        window.location.href = url;
    }
}

export default function setupRealtime () {
    var $ref = getFirebaseRef(window.userData.id, null, true);
    onChildChanged($ref, navigateToUrl);
}
