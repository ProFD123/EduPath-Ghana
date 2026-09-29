const fs = require("fs");
const path = require("path");
const vm = require("vm");

const schoolJsFile = path.join(
    __dirname,
    "..",
    "school.js"
);

const jsonFile = path.join(
    __dirname,
    "schools-data.json"
);


// Read school.js
const code = fs.readFileSync(
    schoolJsFile,
    "utf8"
);


// Create a fake browser window
const context = {
    window: {}
};


// Run school.js
vm.runInNewContext(
    code,
    context
);


// Get schools
const schools = context.window.schools;


// Add IDs
const schoolsWithIds = schools.map(
    (school, index) => ({
        id: index + 1,
        ...school
    })
);


// Save as JSON
fs.writeFileSync(
    jsonFile,
    JSON.stringify(
        { schools: schoolsWithIds },
        null,
        2
    )
);


console.log(
    `Successfully migrated ${schoolsWithIds.length} schools.`
);