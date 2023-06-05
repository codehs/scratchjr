import { gn, isiOS, getUrlVars } from "../utils/lib";
import { getItemID, getStudentAssignmentID } from "../utils/CodeHS";

let place;

export function gettingStartedMain() {
    gn("closeHelp").onclick = gettingStartedCloseMe;
    window.setEventHandler("touchstart", gettingStartedCloseMe, gn("closeHelp"));
    var videoObj = gn("myVideo");
    videoObj.poster = "assets/lobby/poster.png";
    var image = document.createElement("img");
    image.src = videoObj.poster;
    image.onload = function () {
        videoObj.style.display = "block";
    };
    if (isiOS) {
        // On iOS we can load from server
        videoObj.src = "assets/lobby/intro.mp4";
    } else {
        // On Android we need to copy to a temporary directory first:
        setTimeout(function () {
            videoObj.type = "video/mp4";
            videoObj.src =
                AndroidInterface.scratchjr_getgettingstartedvideopath();
        }, 1000);
    }
    var urlvars = getUrlVars();
    place = urlvars["place"];
    window.setEventHandler("touchmove", function (e) {
        e.preventDefault();
    }, document);
}

function gettingStartedCloseMe() {
    const params = new URLSearchParams();
    if (getStudentAssignmentID()) {
        params.append("student_assignment_id", getStudentAssignmentID());
    }
    if (getItemID()) {
        params.append("item_id", getItemID());
    }

    const url = "home.html?place=" + place + "&" + params.toString();
    window.location.href = url;
}
