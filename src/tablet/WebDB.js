// Required to let webpack 4 know it needs to copy the wasm file to our assets
import sqlWasm from "!!file-loader?name=sql-wasm-[contenthash].wasm!sql.js/dist/sql-wasm.wasm";
import initSqlJs from "sql.js";
import {
    setItemThumbnail,
    setSAThumbnail,
    getFromFirebase,
    saveToFirebase,
} from "./Firebase.js";
import { getFirstProjectThumbnail } from "../editor/ui/Project.js";

// see https://github.com/sql-js/sql.js/#usage

let db = null;
let initCalled = false;

// data store locations
let baseKey = null;
let firebasePath = null;

window.getStringDB = getStringDB;

// function to easily get the string db from console
function getStringDB() {
    const binaryData = db.export();
    const stringData = binaryDataToUTF16String(binaryData);
    return stringData;
}

window.setStarterCode = setStarterCode;

// key should be the project key in firebase
// either project-sa-<studentAssignmentID> or project-item-<itemID>
function setStarterCode(id) {
    const binaryData = db.export();
    const stringData = binaryDataToUTF16String(binaryData);
    if (id) saveToFirebase("chs-" + id + "-starter", stringData);
    else saveToFirebase("chs-" + window.item_id + "-starter", stringData);
}

window.downloadDB = downloadDB;

async function downloadDB() {
    const filename = "scratchDB.sqlite";
    const binaryData = db.export();
    const blob = new Blob([binaryData], { type: "application/octet-stream" });
    const response = new Response(blob, {
        headers: {
            "Content-Disposition": `attachment; filename="${filename}"`,
        },
    });
    const url = URL.createObjectURL(await response.blob());
    window.open(url, "_blank");
    URL.revokeObjectURL(url);
}

// converts binary data (a Uint8Array, the data format sql.js exports to) to a UTF-16 string
// see https://github.com/sql-js/sql.js/wiki/Persisting-a-Modified-Database
function binaryDataToUTF16String(binaryData) {
    // We iterate over the binary data in chunks, since there is a maximum stack size.
    // For each chunk, we convert all the data to a string, and then join all the
    // strings together at the end.
    const chunkSize = 0xffff;
    const stringChunks = [];
    for (let i = 0; i < binaryData.length; i += chunkSize) {
        stringChunks.push(
            String.fromCharCode.apply(
                null,
                binaryData.subarray(i, i + chunkSize)
            )
        );
    }
    return stringChunks.join("");
}

// converts a UTF-16 string to binary data (a Uint8Array, the data format sql.js expects)
// see https://github.com/sql-js/sql.js/wiki/Persisting-a-Modified-Database
function UTF16StringToBinaryData(string) {
    const binaryData = new Uint8Array(string.length);
    for (let i = 0; i < string.length; i++) {
        binaryData[i] = string.charCodeAt(i);
    }
    return binaryData;
}

// see https://github.com/jfo8000/ScratchJr-Desktop/blob/master/src/main.js#L674
function initTables() {
    // TODO: maybe handle errors manually?
    // this.db.handleError = this.handleError;

    db.run(
        "CREATE TABLE IF NOT EXISTS PROJECTS (ID INTEGER PRIMARY KEY AUTOINCREMENT, CTIME DATETIME DEFAULT CURRENT_TIMESTAMP, MTIME DATETIME, ALTMD5 TEXT, POS INTEGER, NAME TEXT, JSON TEXT, THUMBNAIL TEXT, OWNER TEXT, GALLERY TEXT, DELETED TEXT, VERSION TEXT)\n"
    );
    db.run(
        "CREATE TABLE IF NOT EXISTS USERSHAPES (ID INTEGER PRIMARY KEY AUTOINCREMENT, CTIME DATETIME DEFAULT CURRENT_TIMESTAMP, MD5 TEXT, ALTMD5 TEXT, WIDTH TEXT, HEIGHT TEXT, EXT TEXT, NAME TEXT, OWNER TEXT, SCALE TEXT, VERSION TEXT)\n"
    );
    db.run(
        "CREATE TABLE IF NOT EXISTS USERBKGS (ID INTEGER PRIMARY KEY AUTOINCREMENT, CTIME DATETIME DEFAULT CURRENT_TIMESTAMP, MD5 TEXT, ALTMD5 TEXT, WIDTH TEXT, HEIGHT TEXT, EXT TEXT, OWNER TEXT,  VERSION TEXT)\n"
    );
    db.run(
        "CREATE TABLE IF NOT EXISTS PROJECTFILES (MD5 TEXT PRIMARY KEY, CONTENTS TEXT)\n"
    );
}

function runMigrations() {
    try {
        db.run("ALTER TABLE PROJECTS ADD COLUMN ISGIFT INTEGER DEFAULT 0");
    } catch (e) {
        console.log("failed to migrate tables", e);
    }
}

// this event will fire whenever the user closes the tab or navigates away from the page
// see https://developer.mozilla.org/en-US/docs/Web/API/Document/visibilitychange_event#usage_notes
window.addEventListener("beforeunload", function () {
    if (document.visibilityState === "hidden") saveDB();
});

export function saveDB() {
    console.log("savedb");
    if (db === null) return;

    const binaryData = db.export();
    const stringData = binaryDataToUTF16String(binaryData);
    // early return if no changes were made to the db string
    if (stringData === localStorage.getItem(baseKey)) {
        console.log("no changes to save, skipping");
        return;
    } else {
        console.log("changes detected, saving");
    }

    // update the thumbnail for the current project in the database
    // NOTE: this assumes that we are only ever working with the first project in the sql db
    if (window.student_assignment_id) {
        getFirstProjectThumbnail(function (thumbnail) {
            setSAThumbnail(window.student_assignment_id, thumbnail);
        });
    } else {
        getFirstProjectThumbnail(function (thumbnail) {
            setItemThumbnail(window.item_id, thumbnail);
        });
    }

    // save the db string to firebase
    const timestamp = new Date().getTime();
    localStorage.setItem(baseKey + "-timestamp", timestamp);
    localStorage.setItem(baseKey, stringData);
    saveToFirebase(firebasePath + "/timestamp", timestamp);
    saveToFirebase(firebasePath + "/db", stringData);
}

async function getDBStringData() {
    // determine the base key for the project
    // all other  keys/paths are derived from this
    let dbData = null;

    // compare local and firebase timestamp,
    // get the data from the place with the greater timestamp
    const localTime =
        parseInt(localStorage.getItem(baseKey + "-timestamp")) || 0;
    const firebaseTime =
        parseInt(await getFromFirebase(firebasePath + "/timestamp")) || 0;
    if (firebaseTime > localTime) {
        console.log("loading db data from firebase");
        dbData = await getFromFirebase(firebasePath + "/db");
    } else {
        console.log("loading db data from localstorage");
        dbData = localStorage.getItem(baseKey);
    }

    // if there's no data, try to get the starter code from firebase
    // TODO: update to use Joel's logic for starter code
    if (!dbData) {
        console.log("loading starter code db data from firebase");
        const starterCodePath = firebasePath + "/starter-code";
        dbData = await getFromFirebase(starterCodePath);
    }
    return dbData;
}

export async function initDB() {
    // early return in case of multiple calls
    if (initCalled) return;
    initCalled = true;
    const SQL = await initSqlJs({
        locateFile: () => sqlWasm,
    });
    // get saved data from localStorage, then initialize the database with it if it exists.
    // otherwise, create a new database and initialize the tables and run migrations.
    let savedData;
    if (window.student_assignment_id) {
        savedData = localStorage.getItem("sa-" + window.student_assignment_id);
        console.log("loading from sa-" + window.student_assignment_id);
        console.log(savedData);
    } else {
        savedData = localStorage.getItem("item-" + window.item_id);
        console.log("loading from item-" + window.item_id);
        console.log(savedData);
    }
    // Check for firebase save data when we do that
    if (!savedData) {
        const firebaseKey = "chs-" + window.item_id + "-starter";
        savedData = await getFromFirebase(firebaseKey);
        if (savedData) {
            console.log("loading from firebase " + firebaseKey);
            localStorage.setItem("loadFromFirebase", "true");
        }
    }
    if (savedData) {
        const binaryData = UTF16StringToBinaryData(savedData);

        // // early return in case of multiple calls
        // if (db !== null) return;

        // // set up baseKey and firebasePath
        // if (window.student_assignment_id) {
        //     const id = window.student_assignment_id;
        //     baseKey = "sa-" + id;
        // } else if (window.item_id) {
        //     const id = window.item_id;
        //     baseKey = "item-" + id;
        // } else {
        //     alert("No IDs found. DB will not be loaded or saved.");
        // }
        // firebasePath = "project-" + baseKey;

        // // get the saved db string data, then initialize the database with it if it exists.
        // // otherwise, create a new database and initialize the tables and run migrations.
        // const dbStringData = await getDBStringData();
        // if (dbStringData !== null) {
        //     const binaryData = UTF16StringToBinaryData(dbStringData);
        db = new SQL.Database(binaryData);
    } else {
        db = new SQL.Database();
        initTables();
        runMigrations();
    }
    window.db = db;
    return db;
}

export async function executeQueryFromJSON(json) {
    if (db === null) await initDB();

    // see Web interface, query()
    const { stmt, values } = json;
    return JSON.stringify(db.exec(stmt, values));
}

// see https://github.com/jfo8000/ScratchJr-Desktop/blob/master/src/main.js#L898
export async function executeStatementFromJSON(json) {
    if (db === null) await initDB();
    // see Web interface, stmt()
    const { stmt, values } = json;
    const statement = db.prepare(stmt, values);
    while (statement.step()) statement.get();
    const result = db.exec("select last_insert_rowid();");
    const lastRowId = result[0].values[0][0];
    return lastRowId;
}

// https://github.com/jfo8000/ScratchJr-Desktop/blob/master/src/main.js#L842
export async function saveToProjectFiles(fileMD5, content) {
    /**
     * Function to save project content to local storage
     * Local storage format-
     * [
     *      {
     *          'columns': ['MD5', 'CONTENTS']
     *          'values': [ ..., [fileMD5, content] ]
     *      }
     * ]
     * @param {string} fileMD5
     * @param {string} content
     */
    const json = {};
    const keylist = ["md5", "contents"];
    const values = "?,?";
    json.values = [fileMD5, content];
    json.stmt = `insert or replace into projectfiles (${keylist.toString()}) values (${values})`;
    var insertSQLResult = executeStatementFromJSON(json);

    // this.save(); // flush the database to disk.
    saveDB();

    return insertSQLResult >= 0;
}

// actually returns SHA-256
export async function getMD5(data) {
    // return crypto.createHash('md5').update(data).digest('hex');
    const utf8 = new TextEncoder().encode(data);
    return crypto.subtle.digest("SHA-256", utf8).then((hashBuffer) => {
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray
            .map((bytes) => bytes.toString(16).padStart(2, "0"))
            .join("");
        return hashHex;
    });
}

// see https://github.com/jfo8000/ScratchJr-Desktop/blob/master/src/main.js#L822
export async function readProjectFile(fileMD5) {
    const json = {};
    json.cond = "MD5 = ?";
    json.items = ["CONTENTS"];
    json.values = [fileMD5];
    const table = "PROJECTFILES";

    json.stmt = `select ${json.items} from ${table} where ${json.cond}${
        json.order ? ` order by ${json.order}` : ""
    }`;

    var rows = await executeQueryFromJSON(json);
    rows = JSON.parse(rows);
    if (rows.length > 0) {
        return rows[0]["values"][0][0];
    }
    return null;
}
