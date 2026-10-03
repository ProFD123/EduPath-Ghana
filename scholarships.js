// ======================================
// EDUPATH GHANA - SCHOLARSHIP DIRECTORY
// BACKEND API VERSION
// WITH FAVOURITES
// ======================================

(function () {

    const API_URL = "https://edupath-ghana-backend.onrender.com/api/scholarships";


    const scholarshipSearch =
        document.getElementById(
            "scholarshipSearch"
        );


    const scholarshipCountry =
        document.getElementById(
            "scholarshipCountry"
        );


    const scholarshipLevel =
        document.getElementById(
            "scholarshipLevel"
        );


    const scholarshipFunding =
        document.getElementById(
            "scholarshipFunding"
        );


    const scholarshipSearchBtn =
        document.getElementById(
            "scholarshipSearchBtn"
        );


    const scholarshipResults =
        document.getElementById(
            "scholarshipResults"
        );


    let scholarships = [];


    // ======================================
    // LOAD SCHOLARSHIPS FROM BACKEND
    // ======================================

    async function loadScholarships() {

        if (!scholarshipResults) {
            return;
        }


        scholarshipResults.innerHTML = `

            <div class="scholarship-card">

                <h3>
                    Loading scholarships...
                </h3>

                <p>
                    Please wait.
                </p>

            </div>

        `;


        try {

            const response =
                await fetch(API_URL);


            const data =
                await response.json();


            if (
                !response.ok ||
                !data.success
            ) {

                throw new Error(
                    data.message ||
                    "Could not load scholarships."
                );

            }


            scholarships =
                Array.isArray(
                    data.scholarships
                )
                    ? data.scholarships
                    : [];


            populateFilters();


            displayScholarships();


        } catch (error) {

            console.error(
                "Scholarship API Error:",
                error
            );


            scholarshipResults.innerHTML = `

                <div class="scholarship-card">

                    <div class="scholarship-icon">
                        ⚠️
                    </div>

                    <h3>
                        Unable to load scholarships
                    </h3>

                    <p>
                        Please make sure the
                        EduPath Ghana backend
                        is running.
                    </p>

                </div>

            `;

        }

    }


    // ======================================
    // POPULATE FILTERS
    // ======================================

    function populateFilters() {

        if (
            !scholarshipCountry ||
            !scholarshipLevel ||
            !scholarshipFunding
        ) {

            return;

        }


        const countries = [
            ...new Set(
                scholarships
                    .map(
                        scholarship =>
                            scholarship.country
                    )
                    .filter(Boolean)
            )
        ].sort();


        const levels = [
            ...new Set(
                scholarships
                    .map(
                        scholarship =>
                            scholarship.level
                    )
                    .filter(Boolean)
            )
        ].sort();


        const fundingTypes = [
            ...new Set(
                scholarships
                    .map(
                        scholarship =>
                            scholarship.funding
                    )
                    .filter(Boolean)
            )
        ].sort();


        countries.forEach(
            function (country) {

                const option =
                    document.createElement(
                        "option"
                    );


                option.value =
                    country;


                option.textContent =
                    country;


                scholarshipCountry.appendChild(
                    option
                );

            }
        );


        levels.forEach(
            function (level) {

                const option =
                    document.createElement(
                        "option"
                    );


                option.value =
                    level;


                option.textContent =
                    level;


                scholarshipLevel.appendChild(
                    option
                );

            }
        );


        fundingTypes.forEach(
            function (funding) {

                const option =
                    document.createElement(
                        "option"
                    );


                option.value =
                    funding;


                option.textContent =
                    funding;


                scholarshipFunding.appendChild(
                    option
                );

            }
        );

    }


    // ======================================
    // DISPLAY SCHOLARSHIPS
    // ======================================

    function displayScholarships() {

        if (!scholarshipResults) {
            return;
        }


        const searchTerm =
            scholarshipSearch
                ? scholarshipSearch.value
                    .toLowerCase()
                    .trim()
                : "";


        const selectedCountry =
            scholarshipCountry
                ? scholarshipCountry.value
                : "all";


        const selectedLevel =
            scholarshipLevel
                ? scholarshipLevel.value
                : "all";


        const selectedFunding =
            scholarshipFunding
                ? scholarshipFunding.value
                : "all";


        const filteredScholarships =
            scholarships.filter(
                function (scholarship) {

                    const name =
                        String(
                            scholarship.name ||
                            ""
                        ).toLowerCase();


                    const description =
                        String(
                            scholarship.description ||
                            ""
                        ).toLowerCase();


                    const country =
                        scholarship.country ||
                        "";


                    const level =
                        scholarship.level ||
                        "";


                    const funding =
                        scholarship.funding ||
                        "";


                    const matchesSearch =
                        !searchTerm ||
                        name.includes(
                            searchTerm
                        ) ||
                        description.includes(
                            searchTerm
                        );


                    const matchesCountry =
                        selectedCountry === "all" ||
                        country ===
                            selectedCountry;


                    const matchesLevel =
                        selectedLevel === "all" ||
                        level ===
                            selectedLevel;


                    const matchesFunding =
                        selectedFunding === "all" ||
                        funding ===
                            selectedFunding;


                    return (
                        matchesSearch &&
                        matchesCountry &&
                        matchesLevel &&
                        matchesFunding
                    );

                }
            );


        scholarshipResults.innerHTML = "";


        // ======================================
        // NO RESULTS
        // ======================================

        if (
            filteredScholarships.length === 0
        ) {

            scholarshipResults.innerHTML = `

                <div class="scholarship-card">

                    <div class="scholarship-icon">
                        🔍
                    </div>

                    <h3>
                        No scholarships found
                    </h3>

                    <p>
                        We couldn't find a scholarship
                        matching your search and filters.
                    </p>

                </div>

            `;

            return;

        }


        // ======================================
        // SCHOLARSHIP CARDS
        // ======================================

        filteredScholarships.forEach(
            function (scholarship) {

                const card =
                    document.createElement(
                        "div"
                    );


                card.className =
                    "scholarship-card";


                // Important:
                // Store the scholarship ID
                // on the card.

                card.dataset.scholarshipId =
                    scholarship.id;


                card.innerHTML = `

                    <div class="scholarship-icon">
                        🎓
                    </div>


                    <h3>
                        ${escapeHTML(
                            scholarship.name
                        )}
                    </h3>


                    <div class="scholarship-meta">

                        <span>
                            🌍
                            ${escapeHTML(
                                scholarship.country
                            )}
                        </span>


                        <span>
                            📚
                            ${escapeHTML(
                                scholarship.level
                            )}
                        </span>


                        <span>
                            💰
                            ${escapeHTML(
                                scholarship.funding
                            )}
                        </span>

                    </div>


                    <p>
                        ${escapeHTML(
                            scholarship.description
                        )}
                    </p>


                    <p class="scholarship-deadline">

                        📅 Deadline:
                        ${escapeHTML(
                            scholarship.deadline
                        )}

                    </p>


                    <a
                        href="${escapeHTML(
                            scholarship.officialLink
                        )}"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        View Official Opportunity →
                    </a>


                    <button
                        class="save-favourite-btn"
                        data-scholarship-id="${escapeHTML(
                            scholarship.id
                        )}"
                    >
                        ♡ Save Scholarship
                    </button>

                `;


                scholarshipResults.appendChild(
                    card
                );


                const saveButton =
                    card.querySelector(
                        ".save-favourite-btn"
                    );


                saveButton.addEventListener(
                    "click",
                    function () {

                        toggleScholarshipFavourite(
                            scholarship.id,
                            saveButton
                        );

                    }
                );

            }
        );


        updateScholarshipFavouriteButtons();

    }


    // ======================================
    // SAVE / REMOVE SCHOLARSHIP
    // ======================================

    async function toggleScholarshipFavourite(
        scholarshipId,
        button
    ) {

        if (
            !window.EduPathFavourites ||
            !window.EduPathFavourites.available
        ) {

            window.location.href =
                "student-login.html";

            return;

        }


        try {

            const saved =
                await window.EduPathFavourites.check(
                    "scholarships",
                    scholarshipId
                );


            if (saved) {

                await window.EduPathFavourites.remove(
                    "scholarships",
                    scholarshipId
                );


                button.textContent =
                    "♡ Save Scholarship";


                button.classList.remove(
                    "saved"
                );


            } else {

                await window.EduPathFavourites.save(
                    "scholarships",
                    scholarshipId
                );


                button.textContent =
                    "♥ Saved";


                button.classList.add(
                    "saved"
                );

            }

        } catch (error) {

            console.error(
                "Scholarship favourite error:",
                error
            );


            alert(
                "Could not update your saved scholarship."
            );

        }

    }


    // ======================================
    // UPDATE SAVED BUTTONS
    // ======================================

    async function updateScholarshipFavouriteButtons() {

        if (
            !window.EduPathFavourites ||
            !window.EduPathFavourites.available
        ) {

            return;

        }


        const buttons =
            document.querySelectorAll(
                ".save-favourite-btn"
            );


        for (
            const button
            of buttons
        ) {

            const scholarshipId =
                button.dataset.scholarshipId;


            const saved =
                await window.EduPathFavourites.check(
                    "scholarships",
                    scholarshipId
                );


            if (saved) {

                button.textContent =
                    "♥ Saved";


                button.classList.add(
                    "saved"
                );

            } else {

                button.textContent =
                    "♡ Save Scholarship";


                button.classList.remove(
                    "saved"
                );

            }

        }

    }


    // ======================================
    // SECURITY
    // ======================================

    function escapeHTML(value) {

        return String(
            value || ""
        )
            .replace(
                /&/g,
                "&amp;"
            )
            .replace(
                /</g,
                "&lt;"
            )
            .replace(
                />/g,
                "&gt;"
            )
            .replace(
                /"/g,
                "&quot;"
            )
            .replace(
                /'/g,
                "&#039;"
            );

    }


    // ======================================
    // EVENTS
    // ======================================

    if (scholarshipSearchBtn) {

        scholarshipSearchBtn.addEventListener(
            "click",
            displayScholarships
        );

    }


    if (scholarshipSearch) {

        scholarshipSearch.addEventListener(
            "input",
            displayScholarships
        );

    }


    if (scholarshipCountry) {

        scholarshipCountry.addEventListener(
            "change",
            displayScholarships
        );

    }


    if (scholarshipLevel) {

        scholarshipLevel.addEventListener(
            "change",
            displayScholarships
        );

    }


    if (scholarshipFunding) {

        scholarshipFunding.addEventListener(
            "change",
            displayScholarships
        );

    }


    // ======================================
    // START
    // ======================================

    loadScholarships();

})();