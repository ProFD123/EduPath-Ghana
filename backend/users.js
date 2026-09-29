const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const DATA_FILE = path.join(__dirname, "users-data.json");


// ==================================================
// DATABASE
// ==================================================

function loadUsers() {

    try {

        if (!fs.existsSync(DATA_FILE)) {

            fs.writeFileSync(
                DATA_FILE,
                JSON.stringify([], null, 2)
            );

            return [];
        }

        const raw =
            fs.readFileSync(
                DATA_FILE,
                "utf8"
            ).trim();

        if (!raw) {
            return [];
        }

        const data = JSON.parse(raw);

        // Normal format: array
        if (Array.isArray(data)) {
            return data;
        }

        // Also support { users: [...] }
        if (
            data &&
            Array.isArray(data.users)
        ) {
            return data.users;
        }

        console.warn(
            "users-data.json was not an array. Starting with an empty users list."
        );

        return [];

    } catch (error) {

        console.error(
            "Could not load users database:",
            error
        );

        return [];
    }
}


function saveUsers(users) {

    if (!Array.isArray(users)) {

        throw new Error(
            "Users database must be an array."
        );

    }

    fs.writeFileSync(
        DATA_FILE,
        JSON.stringify(users, null, 2)
    );

}


// ==================================================
// PASSWORDS
// ==================================================

function hashPassword(password) {

    return crypto
        .createHash("sha256")
        .update(String(password))
        .digest("hex");

}


function verifyPassword(
    password,
    hashedPassword
) {

    return (
        hashPassword(password) ===
        hashedPassword
    );

}


// ==================================================
// USERS
// ==================================================

function getUsers() {

    return loadUsers();

}


function getUserById(id) {

    const users = loadUsers();

    return users.find(
        user =>
            Number(user.id) ===
            Number(id)
    );

}


function getUserByEmail(email) {

    const users = loadUsers();

    const targetEmail =
        String(email)
            .trim()
            .toLowerCase();

    return users.find(
        user =>
            String(user.email)
                .trim()
                .toLowerCase() ===
            targetEmail
    );

}


// ==================================================
// CREATE USER
// ==================================================

function addUser({
    name,
    email,
    password
}) {

    const users = loadUsers();

    const ids =
        users
            .map(user => Number(user.id))
            .filter(id => !Number.isNaN(id));

    const nextId =
        ids.length > 0
            ? Math.max(...ids) + 1
            : 1;

    const user = {

        id: nextId,

        name:
            String(name).trim(),

        email:
            String(email).trim().toLowerCase(),

        password:
            hashPassword(password),

        favourites: {

            schools: [],

            programmes: [],

            scholarships: []

        },

        careerGuidanceResult: null

    };

    users.push(user);

    saveUsers(users);

    return user;

}


// ==================================================
// UPDATE USER
// ==================================================

function updateUser(
    id,
    updates
) {

    const users = loadUsers();

    const index =
        users.findIndex(
            user =>
                Number(user.id) ===
                Number(id)
        );

    if (index === -1) {
        return null;
    }

    users[index] = {

        ...users[index],

        ...updates

    };

    ensureFavourites(
        users[index]
    );

    saveUsers(users);

    return users[index];

}


// ==================================================
// FAVOURITES SETUP
// ==================================================

function ensureFavourites(user) {

    if (!user.favourites) {

        user.favourites = {};

    }

    if (
        !Array.isArray(
            user.favourites.schools
        )
    ) {

        user.favourites.schools = [];

    }

    if (
        !Array.isArray(
            user.favourites.programmes
        )
    ) {

        user.favourites.programmes = [];

    }

    if (
        !Array.isArray(
            user.favourites.scholarships
        )
    ) {

        user.favourites.scholarships = [];

    }

}


// ==================================================
// SCHOOL FAVOURITES
// ==================================================

function isSchoolFavourite(
    userId,
    schoolId
) {

    const user =
        getUserById(userId);

    if (!user) {
        return false;
    }

    ensureFavourites(user);

    return user.favourites.schools
        .map(Number)
        .includes(
            Number(schoolId)
        );

}


function addSchoolFavourite(
    userId,
    schoolId
) {

    const users = loadUsers();

    const user =
        users.find(
            u =>
                Number(u.id) ===
                Number(userId)
        );

    if (!user) {
        return null;
    }

    ensureFavourites(user);

    const id =
        Number(schoolId);

    if (
        !user.favourites.schools
            .map(Number)
            .includes(id)
    ) {

        user.favourites.schools.push(id);

    }

    saveUsers(users);

    return user;

}


function removeSchoolFavourite(
    userId,
    schoolId
) {

    const users = loadUsers();

    const user =
        users.find(
            u =>
                Number(u.id) ===
                Number(userId)
        );

    if (!user) {
        return null;
    }

    ensureFavourites(user);

    const id =
        Number(schoolId);

    user.favourites.schools =
        user.favourites.schools.filter(
            favouriteId =>
                Number(favouriteId) !== id
        );

    saveUsers(users);

    return user;

}


// ==================================================
// PROGRAMME FAVOURITES
// ==================================================

function isProgrammeFavourite(
    userId,
    programmeId
) {

    const user =
        getUserById(userId);

    if (!user) {
        return false;
    }

    ensureFavourites(user);

    return user.favourites.programmes
        .map(Number)
        .includes(
            Number(programmeId)
        );

}


function addProgrammeFavourite(
    userId,
    programmeId
) {

    const users = loadUsers();

    const user =
        users.find(
            u =>
                Number(u.id) ===
                Number(userId)
        );

    if (!user) {
        return null;
    }

    ensureFavourites(user);

    const id =
        Number(programmeId);

    if (
        !user.favourites.programmes
            .map(Number)
            .includes(id)
    ) {

        user.favourites.programmes.push(id);

    }

    saveUsers(users);

    return user;

}


function removeProgrammeFavourite(
    userId,
    programmeId
) {

    const users = loadUsers();

    const user =
        users.find(
            u =>
                Number(u.id) ===
                Number(userId)
        );

    if (!user) {
        return null;
    }

    ensureFavourites(user);

    const id =
        Number(programmeId);

    user.favourites.programmes =
        user.favourites.programmes.filter(
            favouriteId =>
                Number(favouriteId) !== id
        );

    saveUsers(users);

    return user;

}


// ==================================================
// SCHOLARSHIP FAVOURITES
// ==================================================

function isScholarshipFavourite(
    userId,
    scholarshipId
) {

    const user =
        getUserById(userId);

    if (!user) {
        return false;
    }

    ensureFavourites(user);

    return user.favourites.scholarships
        .map(Number)
        .includes(
            Number(scholarshipId)
        );

}


function addScholarshipFavourite(
    userId,
    scholarshipId
) {

    const users = loadUsers();

    const user =
        users.find(
            u =>
                Number(u.id) ===
                Number(userId)
        );

    if (!user) {
        return null;
    }

    ensureFavourites(user);

    const id =
        Number(scholarshipId);

    if (
        !user.favourites.scholarships
            .map(Number)
            .includes(id)
    ) {

        user.favourites.scholarships.push(id);

    }

    saveUsers(users);

    return user;

}


function removeScholarshipFavourite(
    userId,
    scholarshipId
) {

    const users = loadUsers();

    const user =
        users.find(
            u =>
                Number(u.id) ===
                Number(userId)
        );

    if (!user) {
        return null;
    }

    ensureFavourites(user);

    const id =
        Number(scholarshipId);

    user.favourites.scholarships =
        user.favourites.scholarships.filter(
            favouriteId =>
                Number(favouriteId) !== id
        );

    saveUsers(users);

    return user;

}


// ==================================================
// CAREER GUIDANCE
// ==================================================

function saveCareerGuidanceResult(
    userId,
    result
) {

    return updateUser(
        userId,
        {
            careerGuidanceResult:
                result
        }
    );

}


function getCareerGuidanceResult(
    userId
) {

    const user =
        getUserById(userId);

    if (!user) {
        return null;
    }

    return (
        user.careerGuidanceResult ||
        null
    );

}


// ==================================================
// EXPORTS
// ==================================================

module.exports = {

    getUsers,

    getUserById,

    getUserByEmail,

    addUser,

    updateUser,

    verifyPassword,

    isSchoolFavourite,
    addSchoolFavourite,
    removeSchoolFavourite,

    isProgrammeFavourite,
    addProgrammeFavourite,
    removeProgrammeFavourite,

    isScholarshipFavourite,
    addScholarshipFavourite,
    removeScholarshipFavourite,

    saveCareerGuidanceResult,
    getCareerGuidanceResult

};
