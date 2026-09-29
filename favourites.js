/* =====================================
   EDUPATH GHANA FAVOURITES SYSTEM
===================================== */

(function () {

    const savedUser =
        localStorage.getItem(
            "edupathUser"
        );


    if (!savedUser) {

        window.EduPathFavourites = {

            available: false,

            save: function () {

                window.location.href =
                    "student-login.html";

            },

            remove: function () {},

            check: async function () {

                return false;

            }

        };

        return;

    }


    let user;

    try {

        user =
            JSON.parse(savedUser);

    } catch (error) {

        localStorage.removeItem(
            "edupathUser"
        );

        window.EduPathFavourites = {

            available: false

        };

        return;

    }


    const userId =
        user.id;


    async function save(
        type,
        itemId
    ) {

        try {

            const response =
                await fetch(
                    `/api/users/${userId}/favourites`,
                    {

                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify({

                                type,

                                itemId

                            })

                    }
                );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Could not save favourite."
                );

            }


            updateLocalUser(
                data.favourites
            );


            return data;

        } catch (error) {

            console.error(
                "Favourite error:",
                error
            );

            throw error;

        }

    }


    async function remove(
        type,
        itemId
    ) {

        try {

            const response =
                await fetch(
                    `/api/users/${userId}/favourites`,
                    {

                        method: "DELETE",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify({

                                type,

                                itemId

                            })

                    }
                );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Could not remove favourite."
                );

            }


            updateLocalUser(
                data.favourites
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


    async function check(
        type,
        itemId
    ) {

        try {

            const response =
                await fetch(
                    `/api/users/${userId}/favourites/${type}/${itemId}`
                );


            const data =
                await response.json();


            return data.favourite === true;

        } catch (error) {

            console.error(error);

            return false;

        }

    }


    function updateLocalUser(
        favourites
    ) {

        try {

            user.favourites =
                favourites;


            /*
             * Keep the alternative property names
             * used by the profile page in sync.
             */

            user.favouriteSchools =
                favourites.schools || [];

            user.favouriteProgrammes =
                favourites.programmes || [];

            user.favouriteScholarships =
                favourites.scholarships || [];


            localStorage.setItem(
                "edupathUser",
                JSON.stringify(user)
            );

        } catch (error) {

            console.error(error);

        }

    }


    window.EduPathFavourites = {

        available: true,

        userId,

        save,

        remove,

        check

    };


})();