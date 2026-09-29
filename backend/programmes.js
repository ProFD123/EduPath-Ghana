const fs = require("fs");
const path = require("path");

const databaseFile = path.join(
    __dirname,
    "programmes-data.json"
);


// Create the file if it doesn't exist
if (!fs.existsSync(databaseFile)) {
    fs.writeFileSync(
        databaseFile,
        JSON.stringify({ programmes: [] }, null, 2)
    );
}


// Read programmes
function readProgrammes() {
    const data = fs.readFileSync(
        databaseFile,
        "utf8"
    );

    return JSON.parse(data);
}


// Save programmes
function writeProgrammes(data) {
    fs.writeFileSync(
        databaseFile,
        JSON.stringify(data, null, 2)
    );
}


// Get all programmes
function getProgrammes() {
    const database = readProgrammes();

    return database.programmes;
}


// Get one programme
function getProgrammeById(id) {
    const database = readProgrammes();

    return database.programmes.find(
        programme =>
            String(programme.id) === String(id)
    );
}


// Add programme
function addProgramme(programme) {
    const database = readProgrammes();

    let newId = 1;

    if (database.programmes.length > 0) {
        newId =
            Math.max(
                ...database.programmes.map(
                    item => Number(item.id) || 0
                )
            ) + 1;
    }

    const newProgramme = {
        id: newId,
        ...programme
    };

    database.programmes.push(newProgramme);

    writeProgrammes(database);

    return newProgramme;
}


// Update programme
function updateProgramme(id, updates) {
    const database = readProgrammes();

    const index =
        database.programmes.findIndex(
            programme =>
                String(programme.id) === String(id)
        );

    if (index === -1) {
        return null;
    }

    database.programmes[index] = {
        ...database.programmes[index],
        ...updates
    };

    writeProgrammes(database);

    return database.programmes[index];
}


// Delete programme
function deleteProgramme(id) {
    const database = readProgrammes();

    const originalLength =
        database.programmes.length;

    database.programmes =
        database.programmes.filter(
            programme =>
                String(programme.id) !== String(id)
        );

    if (
        database.programmes.length ===
        originalLength
    ) {
        return false;
    }

    writeProgrammes(database);

    return true;
}


module.exports = {
    getProgrammes,
    getProgrammeById,
    addProgramme,
    updateProgramme,
    deleteProgramme
};