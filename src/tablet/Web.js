//////////////////////////////////////////////////
//  Web interface functions
//////////////////////////////////////////////////

import OS from "./OS";
import * as db from "./WebDB";

let mediacounter = 0;
let callbacks = {};

db.initDB();

export default class Web {
    // Database functions
    static stmt(json, fcn) {
        // json is an object with the format:
        // {
        //     "stmt": "<SQL statement to run with slots for values below>",
        //     "values": [<list of values to be plugged into the statement>],
        // }
        (async () => {
            const result = await db.executeStatementFromJSON(json);
            console.log("stmt", json, result);
            if (fcn) fcn(result);
        })();
    }

    static query(json, fcn) {
        // json is an object with the format:
        // {
        //     "stmt": "<SQL statement to run with slots for values below>",
        //     "values": [<list of values to be plugged into the statement>],
        // }
        (async () => {
            const result = await db.executeQueryFromJSON(json);
            console.log("query", json, result);
            if (fcn) fcn(result);
        })();
    }

    static setfield(db, id, fieldname, val, fcn) {
        console.log("setfield");
        if (fcn) fcn();
    }

    // IO functions

    static cleanassets(ft, fcn) {
        console.log("cleanassets");
        if (fcn) fcn();
    }

    static getmedia(file, fcn) {
        console.log("getmedia");
        if (fcn) fcn();
    }

    static getmediadata(key, offset, len, fcn) {
        console.log("getmediadata");
        if (fcn) fcn();
    }

    static processdata(key, off, len, oldstr, fcn) {
        console.log("processdata");
        if (fcn) fcn();
    }

    static getsettings(fcn) {
        console.log("getsettings");
        fcn("path,0,NO,NO");
    }

    static getmediadone(file, fcn) {
        console.log("getmediadone");
        if (fcn) fcn();
    }

    static setmedia(str, ext, fcn) {
        console.log("setmedia");
        // console.log(str, ext,);
        // db.exec("select last_insert_rowid();");
        (async () => {
            var name = await db.getMD5(str);
            const filename = `${name}.${ext}`;
            await db.saveToProjectFiles(filename, str, { encoding: 'base64' });
            if (fcn) fcn(str);
        })();
    }

    static setmedianame(str, name, ext, fcn) {
        console.log("setmedianame");
        if (fcn) fcn();
    }

    static getmd5(str, fcn) {
        console.log("getmd5");
        if (fcn) fcn();
    }

    static remove(str, fcn) {
        console.log("remove");
        if (fcn) fcn();
    }

    static getfile(str, fcn) {
        console.log("getfile");
        if (fcn) fcn("");
    }

    static setfile(name, str, fcn) {
        console.log("setfile");
        if (fcn) fcn();
    }

    // Sound functions

    static registerSound(dir, name, fcn) {
        console.log("registerSound");
        if (fcn) fcn();
    }

    static playSound(name, fcn) {
        console.log("playSound");
        if (fcn) fcn();
    }

    static stopSound(name, fcn) {
        console.log("stopSound");
        if (fcn) fcn();
    }

    // Web Wiew delegate call backs

    static sndrecord(fcn) {
        console.log("sndrecord");
        if (fcn) fcn();
    }

    static recordstop(fcn) {
        console.log("recordstop");
        if (fcn) fcn();
    }

    static volume(fcn) {
        console.log("volume");
        if (fcn) fcn();
    }

    static startplay(fcn) {
        console.log("startplay");
        if (fcn) fcn();
    }

    static stopplay(fcn) {
        console.log("stopplay");
        if (fcn) fcn();
    }

    static recorddisappear(b, fcn) {
        console.log("recorddisappear");
        if (fcn) fcn();
    }

    // Record state
    static askpermission() {
        console.log("askpermission");
    }

    // camera functions

    static hascamera() {
        console.log("hascamera");
    }

    static startfeed(data, fcn) {
        console.log("startfeed");
        if (fcn) fcn();
    }

    static stopfeed(fcn) {
        console.log("stopfeed");
        if (fcn) fcn();
    }

    static choosecamera(mode, fcn) {
        console.log("choosecamera");
        if (fcn) fcn();
    }

    static captureimage(fcn) {
        console.log("captureimage");
        if (fcn) fcn();
    }

    static hidesplash(fcn) {
        console.log("hidesplash");
        if (fcn) fcn();
    }

    static trace(str) {
        console.log("trace");
    }

    static parse(str) {
        console.log("parse");
    }

    static tracemedia(str) {
        console.log("tracemedia");
    }

    ignore() {}

    ///////////////
    // Sharing
    ///////////////

    static createZipForProject(projectData, metadata, name, fcn) {
        console.log("createZipForProject");
        if (fcn) fcn();
    }

    // Called on the JS side to trigger native UI for project sharing.
    // fileName: name for the file to share
    // emailSubject: subject text to use for an email
    // emailBody: body HTML to use for an email
    // shareType: 0 for Email; 1 for Airdrop
    // b64data: base-64 encoded .SJR file to share

    static sendSjrToShareDialog(fileName, emailSubject, emailBody, shareType) {
        console.log("sendSjrToShareDialog");
    }

    static registerLibraryAssets(version, assets, fcn) {
        console.log("registerLibraryAssets");
        if (fcn) fcn();
    }

    static duplicateAsset(path, name, fcn) {
        console.log("duplicateAsset");
        if (fcn) fcn();
    }

    // Name of the device/iPad to display on the sharing dialog page
    // fcn is called with the device name as an arg
    static deviceName(fcn) {
        console.log("deviceName");
        if (fcn) fcn("Web");
    }

    static analyticsEvent(category, action, label) {
        console.log("analyticsEvent");
    }

    static setAnalyticsPlacePref(preferredPlace) {
        console.log("setAnalyticsPlacePref");
    }

    static setAnalyticsPref(key, value) {
        console.log("setAnalyticsPref");
    }
}
