const fs = require("fs");
const path = require("path");

const databaseFile =
    path.join(__dirname, "scholarships-data.json");


if (!fs.existsSync(databaseFile)) {

    fs.writeFileSync(
        databaseFile,
        JSON.stringify(
            { scholarships: [] },
            null,
            2
        )
    );

}


function readScholarships() {

    const data =
        fs.readFileSync(
            databaseFile,
            "utf8"
        );

    return JSON.parse(data);

}


function getScholarships() {

    const database =
        readScholarships();

    return database.scholarships;

}


function getScholarshipById(id) {

    const database =
        readScholarships();

    return database.scholarships.find(
        scholarship =>
            String(scholarship.id) ===
            String(id)
    );

}


module.exports = {
    getScholarships,
    getScholarshipById
};