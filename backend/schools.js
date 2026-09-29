const fs = require("fs");
const path = require("path");

const databaseFile = path.join(__dirname, "schools-data.json");

if (!fs.existsSync(databaseFile)) {
    fs.writeFileSync(
        databaseFile,
        JSON.stringify({ schools: [] }, null, 2)
    );
}

function readSchools() {
    const data = fs.readFileSync(databaseFile, "utf8");
    return JSON.parse(data);
}

function writeSchools(data) {
    fs.writeFileSync(
        databaseFile,
        JSON.stringify(data, null, 2)
    );
}

function getSchools() {
    const database = readSchools();
    return database.schools;
}

function getSchoolById(id) {
    const database = readSchools();

    return database.schools.find(
        school => String(school.id) === String(id)
    );
}

function addSchool(school) {
    const database = readSchools();

    let newId = 1;

    if (database.schools.length > 0) {
        newId =
            Math.max(
                ...database.schools.map(
                    item => Number(item.id) || 0
                )
            ) + 1;
    }

    const newSchool = {
        id: newId,
        ...school
    };

    database.schools.push(newSchool);
    writeSchools(database);

    return newSchool;
}

function updateSchool(id, updates) {
    const database = readSchools();

    const index = database.schools.findIndex(
        school => String(school.id) === String(id)
    );

    if (index === -1) {
        return null;
    }

    database.schools[index] = {
        ...database.schools[index],
        ...updates
    };

    writeSchools(database);

    return database.schools[index];
}

function deleteSchool(id) {
    const database = readSchools();

    const originalLength = database.schools.length;

    database.schools = database.schools.filter(
        school => String(school.id) !== String(id)
    );

    if (database.schools.length === originalLength) {
        return false;
    }

    writeSchools(database);

    return true;
}

module.exports = {
    getSchools,
    getSchoolById,
    addSchool,
    updateSchool,
    deleteSchool
};
