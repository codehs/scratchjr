import { gn, isiOS, getUrlVars } from "../utils/lib";

let place;

export function gettingStartedMain() {
    gn("closeHelp").onclick = gettingStartedCloseMe;
    gn("closeHelp").ontouchstart = gettingStartedCloseMe;
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
    document.ontouchmove = function (e) {
        e.preventDefault();
    };
}

function gettingStartedCloseMe() {
    const params = new URLSearchParams();
    if (window.student_assignment_id) {
        params.append("student_assignment_id", window.student_assignment_id);
    }
    if (window.item_id) {
        params.append("item_id", window.item_id);
    }

    const url = "home.html?place=" + place + "&" + params.toString();
    window.location.href = url;
}
