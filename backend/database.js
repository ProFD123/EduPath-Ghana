const fs = require("fs");
const path = require("path");

const databaseFile = path.join(__dirname, "edupath-data.json");

// Create database file if it doesn't exist
if (!fs.existsSync(databaseFile)) {
    fs.writeFileSync(
        databaseFile,
        JSON.stringify({ submissions: [] }, null, 2)
    );
}


// Read database
function readDatabase() {
    const data = fs.readFileSync(databaseFile, "utf8");

    return JSON.parse(data);
}


// Write database
function writeDatabase(data) {
    fs.writeFileSync(
        databaseFile,
        JSON.stringify(data, null, 2)
    );
}


// Add new submission
function addSubmission(submission) {
    const database = readDatabase();

    let newId = 1;

    if (database.submissions.length > 0) {
        newId =
            Math.max(
                ...database.submissions.map(
                    item => Number(item.id) || 0
                )
            ) + 1;
    }

    const newSubmission = {
        id: newId,
        name: submission.name || "",
        email: submission.email || "",
        type: submission.type || "",
        message: submission.message || "",
        status: "New"
    };

    database.submissions.push(newSubmission);

    writeDatabase(database);

    return newSubmission;
}


// Get all submissions
function getSubmissions() {
    const database = readDatabase();

    return [...database.submissions].reverse();
}


// Update submission status
function updateSubmissionStatus(id, status) {
    const database = readDatabase();

    const submission = database.submissions.find(
        item => String(item.id) === String(id)
    );

    if (!submission) {
        return null;
    }

    submission.status = status;

    writeDatabase(database);

    return submission;
}


// Delete submission
function deleteSubmission(id) {
    const database = readDatabase();

    const originalLength =
        database.submissions.length;

    database.submissions =
        database.submissions.filter(
            item => String(item.id) !== String(id)
        );

    if (
        database.submissions.length ===
        originalLength
    ) {
        return false;
    }

    writeDatabase(database);

    return true;
}


// Database ready message
console.log("EduPath Ghana database is ready.");


// Export functions
module.exports = {
    addSubmission,
    getSubmissions,
    updateSubmissionStatus,
    deleteSubmission
};