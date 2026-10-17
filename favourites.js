/* =========================================
   EDUPATH GHANA — FAVOURITES SYSTEM
   ========================================= */

(function () {
    "use strict";

    const API_BASE =
        "https://edupath-ghana-backend.onrender.com";

    const STORAGE_KEY = "edupathUser";

    const ALLOWED_TYPES = [
        "schools",
        "programmes",
        "scholarships"
    ];

    // =====================================
    // GET LOGGED-IN USER
    // =====================================

    function getUser() {
        try {
            const savedUser =
                localStorage.getItem(STORAGE_KEY);

            if (!savedUser) {
                return null;
            }

            const user = JSON.parse(savedUser);

            if (
                !user ||
                typeof user !== "object" ||
                user.id === undefined ||
                user.id === null ||
                String(user.id).trim() === ""
            ) {
                return null;
            }

            return user;

        } catch (error) {
            console.error(
                "Could not read saved user:",
                error
            );

            return null;
        }
    }

    // =====================================
    // VALIDATE REQUEST
    // =====================================

    function getRequestURL(type, itemId) {

        if (!ALLOWED_TYPES.includes(type)) {
            throw new Error(
                "Invalid favourite type."
            );
        }

        if (
            itemId === undefined ||
            itemId === null ||
            String(itemId).trim() === ""
        ) {
            throw new Error(
                "Invalid favourite ID."
            );
        }

        const user = getUser();

        if (!user) {
            throw new Error(
                "Please log in to continue."
            );
        }

        return (
            `${API_BASE}/api/users/` +
            `${encodeURIComponent(user.id)}/` +
            `favourites/${type}/` +
            `${encodeURIComponent(itemId)}`
        );
    }

    // =====================================
    // SEND API REQUEST
    // =====================================

    async function request(
        type,
        itemId,
        method = "GET"
    ) {

        const url = getRequestURL(
            type,
            itemId
        );

        const response = await fetch(url, {
            method: method,
            headers: {
                "Accept": "application/json"
            }
        });

        const data = await response.json();

        if (!response.ok || data.success === false) {

            throw new Error(
                data.message ||
                "Favourite request failed."
            );
        }

        return data;
    }

    // =====================================
    // UPDATE LOCAL FAVOURITES
    // =====================================

    function updateLocalFavourite(
        type,
        itemId,
        isSaved
    ) {

        try {
            const user = getUser();

            if (!user) {
                return;
            }

            if (
                !user.favourites ||
                typeof user.favourites !== "object"
            ) {
                user.favourites = {};
            }

            if (!Array.isArray(user.favourites[type])) {
                user.favourites[type] = [];
            }

            const favourites =
                user.favourites[type].map(String);

            const id = String(itemId);

            if (isSaved) {

                if (!favourites.includes(id)) {
                    favourites.push(id);
                }

            } else {

                const index =
                    favourites.indexOf(id);

                if (index !== -1) {
                    favourites.splice(index, 1);
                }
            }

            user.favourites[type] = favourites;

            user.favouriteSchools =
                user.favourites.schools || [];

            user.favouriteProgrammes =
                user.favourites.programmes || [];

            user.favouriteScholarships =
                user.favourites.scholarships || [];

            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(user)
            );

        } catch (error) {

            console.error(
                "Could not update local favourites:",
                error
            );
        }
    }

    // =====================================
    // SAVE FAVOURITE
    // =====================================

    async function save(type, itemId) {

        try {

            const data = await request(
                type,
                itemId,
                "POST"
            );

            updateLocalFavourite(
                type,
                itemId,
                true
            );

            return data;

        } catch (error) {

            console.error(
                "Save favourite error:",
                error
            );

            throw error;
        }
    }

    // =====================================
    // REMOVE FAVOURITE
    // =====================================

    async function remove(type, itemId) {

        try {

            const data = await request(
                type,
                itemId,
                "DELETE"
            );

            updateLocalFavourite(
                type,
                itemId,
                false
            );

            return data;

        } catch (error) {

            console.error(
                "Remove favourite error:",
                error
            );

            throw error;
        }
    }

    // =====================================
    // CHECK FAVOURITE
    // =====================================

    async function check(type, itemId) {

        try {

            const data = await request(
                type,
                itemId,
                "GET"
            );

            return data.favourite === true;

        } catch (error) {

            console.error(
                "Check favourite error:",
                error
            );

            return false;
        }
    }

    // =====================================
    // INITIALIZE SYSTEM
    // =====================================

    const user = getUser();

    window.EduPathFavourites = {

        available: Boolean(user),

        userId: user ? user.id : null,

        save: save,

        remove: remove,

        check: check

    };

    console.log(
        "EduPath Ghana favourites system initialized."
    );

})();
