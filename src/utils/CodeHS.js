let itemID = null;
let studentAssignmentID = null;

const regexWithItem = /^\/scratchjr\/(\d+)\/test\/?$/;
const regexWithStudentAssignment = /^\/scratchjr\/(\d+)\/(\d+)\/test\/?$/;

function setIDs() {
    const matchesWithItem = window.location.pathname.match(regexWithItem);
    const matchesWithStudentAssignment = window.location.pathname.match(regexWithStudentAssignment);
    if (matchesWithItem) {
        itemID = matchesWithItem[1];
    } else if (matchesWithStudentAssignment) {
        itemID = matchesWithStudentAssignment[1];
        studentAssignmentID = matchesWithStudentAssignment[2];
    } else {
        const params = new URLSearchParams(window.location.search);
        itemID = params.get("item_id", null);
        studentAssignmentID = params.get("student_assignment_id", null);
    }
}

export function getItemID() {
    if (itemID === null) {
        setIDs();
    }
    return itemID;
}

export function getStudentAssignmentID() {
    if (studentAssignmentID === null) {
        setIDs();
    }
    return studentAssignmentID;
}

