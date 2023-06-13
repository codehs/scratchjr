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
let initPromise;

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
    else saveToFirebase("chs-" + window.itemID + "-starter", stringData);
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

function UTF16StringToUTF8String(utf16String) {
    const utf8Bytes = [];
    for (let i = 0; i < utf16String.length; i++) {
        let charCode = utf16String.charCodeAt(i);

        if (charCode < 0x80) {
            utf8Bytes.push(charCode);
        } else if (charCode < 0x800) {
            utf8Bytes.push((charCode >> 6) | 0xc0);
            utf8Bytes.push((charCode & 0x3f) | 0x80);
        } else {
            utf8Bytes.push((charCode >> 12) | 0xe0);
            utf8Bytes.push(((charCode >> 6) & 0x3f) | 0x80);
            utf8Bytes.push((charCode & 0x3f) | 0x80);
        }
    }

    const chunkSize = 0xffff;
    const stringChunks = [];
    for (let i = 0; i < utf8Bytes.length; i += chunkSize) {
        stringChunks.push(
            String.fromCharCode.apply(null, utf8Bytes.slice(i, i + chunkSize))
        );
    }
    return stringChunks.join("");
}

function UTF8StringToUTF16String(utf8String) {
    let utf16String = "";
    let index = 0;

    while (index < utf8String.length) {
        let codePoint;

        const byte1 = utf8String.charCodeAt(index++);
        if ((byte1 & 0x80) === 0) {
            codePoint = byte1;
        } else if ((byte1 & 0xe0) === 0xc0) {
            const byte2 = utf8String.charCodeAt(index++);
            codePoint = ((byte1 & 0x1f) << 6) | (byte2 & 0x3f);
        } else if ((byte1 & 0xf0) === 0xe0) {
            const byte2 = utf8String.charCodeAt(index++);
            const byte3 = utf8String.charCodeAt(index++);
            codePoint =
                ((byte1 & 0x0f) << 12) | ((byte2 & 0x3f) << 6) | (byte3 & 0x3f);
        } else {
            const byte2 = utf8String.charCodeAt(index++);
            const byte3 = utf8String.charCodeAt(index++);
            const byte4 = utf8String.charCodeAt(index++);
            codePoint =
                ((byte1 & 0x07) << 18) |
                ((byte2 & 0x3f) << 12) |
                ((byte3 & 0x3f) << 6) |
                (byte4 & 0x3f);
        }

        utf16String += String.fromCharCode(codePoint);
    }

    return utf16String;
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

    if (window.saveScratchJrProject) {
        getFirstProjectThumbnail(function (thumbnail) {
            window.saveScratchJrProject(
                UTF16StringToUTF8String(stringData),
                thumbnail
            );
            localStorage.setItem(baseKey, stringData);
        });
        return;
    }

    // update the thumbnail for the current project in the database
    // NOTE: this assumes that we are only ever working with the first project in the sql db
    if (window.studentAssignmentID) {
        getFirstProjectThumbnail(function (thumbnail) {
            setSAThumbnail(window.studentAssignmentID, thumbnail);
        });
    } else {
        getFirstProjectThumbnail(function (thumbnail) {
            setItemThumbnail(window.itemID, thumbnail);
        });
    }

    // save the db string to firebase
    const timestamp = new Date().getTime();
    localStorage.setItem(baseKey + "-timestamp", timestamp);
    localStorage.setItem(baseKey, stringData);
    saveToFirebase(firebasePath + "/timestamp", timestamp);
    saveToFirebase(firebasePath + "/db", stringData);
    if (!window.sharedProgramID && !window.studentAssignmentID)
        setStarterCode();
}

async function getDBDataString() {
    let dbData = null;

    // try to load from CodeHS DB
    if (window.loadScratchJrProject) {
        dbData = await window.loadScratchJrProject();
        if (dbData) {
            dbData = UTF8StringToUTF16String(dbData);
        }
        return dbData;
    }

    // try to load from firebase
    if (!dbData) {
        console.log("loading db data from firebase", firebasePath);
        dbData = await getFromFirebase(firebasePath + "/db");
    }

    // try to load from localstorage
    if (!dbData) {
        console.log(
            "not in firebase, loading db data from localstorage",
            baseKey
        );
        dbData = localStorage.getItem(baseKey);
    }

    // try to get the starter code from firebase
    if (!dbData) {
        console.log(
            "not in localstorage, loading starter code db data from firebase"
        );
        const starterCodePath = `chs-${window.itemID}-starter`;
        dbData = await getFromFirebase(starterCodePath);
        if (dbData) {
            localStorage.setItem("loadFromFirebase", "true");
        } else {
            console.log("no starter code found in firebase");
        }
    }
    return dbData;
}

export async function initDB() {
    console.log("init");
    // return existing promise if it exists
    if (initPromise) {
        return initPromise;
    }

    // create a new promise that resolves with whether we should
    // create a new project once it's initialized
    initPromise = new Promise(async (resolve) => {
        let shouldCreateNewProject = false;
        const SQL = await initSqlJs({
            locateFile: () => sqlWasm,
        });

        // get saved data from localStorage, then initialize the database with it if it exists.
        // otherwise, create a new database and initialize the tables and run migrations.
        if (window.sharedProgramID) {
            const id = window.sharedProgramID;
            baseKey = "sp-" + id;
        } else if (window.studentAssignmentID) {
            const id = window.studentAssignmentID;
            baseKey = "sa-" + id;
        } else if (window.itemID) {
            const id = window.itemID;
            baseKey = "item-" + id;
        } else if (window.scratchJrPage === "editor") {
            alert("No IDs found. DB will not be loaded or saved.");
        }
        firebasePath = "project-" + baseKey;

        // get saved data from localStorage or firebase, then initialize the database with it if it
        // exists. otherwise, create a new database and initialize the tables and run migrations.
        const dbDataString = await getDBDataString();
        if (dbDataString) {
            const binaryData = UTF16StringToBinaryData(dbDataString);
            db = new SQL.Database(binaryData);
        } else {
            db = new SQL.Database();
            initTables();
            runMigrations();
            shouldCreateNewProject = true;
        }
        window.db = db;
        console.log("shouldCreateNewProject: ", shouldCreateNewProject);
        resolve(shouldCreateNewProject);
    });

    return initPromise;
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
    // query for the current file contents to see if they actually changed
    let currentContents = "";
    const queryResult = JSON.parse(
        await executeQueryFromJSON({
            stmt: `select contents from projectfiles where md5 = ?`,
            values: [fileMD5],
        })
    );
    if (
        queryResult.length > 0 &&
        queryResult[0].values.length > 0 &&
        queryResult[0].values[0].length > 0
    ) {
        currentContents = queryResult[0].values[0][0];
    }

    // if the contents changed, update the db and save
    if (content !== currentContents) {
        await executeStatementFromJSON({
            stmt: `insert or replace into projectfiles (md5, contents) values (?, ?)`,
            values: [fileMD5, content],
        });

        saveDB();
    }
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
