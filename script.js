// ======================================
// EDUPATH GHANA - MAIN JAVASCRIPT
// ======================================


// ======================================
// MOBILE MENU
// ======================================

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
}


// ======================================
// PROGRAMME SEARCH
// ======================================

const searchInput = document.getElementById("programmeSearch");
const programmeCards = document.querySelectorAll(".programme-card");

if (searchInput) {

    searchInput.addEventListener("input", () => {

        const searchTerm =
            searchInput.value.toLowerCase().trim();

        programmeCards.forEach(card => {

            const nameElement = card.querySelector("h3");
            const descriptionElement = card.querySelector("p");

            const name = nameElement
                ? nameElement.textContent.toLowerCase()
                : "";

            const description = descriptionElement
                ? descriptionElement.textContent.toLowerCase()
                : "";

            if (
                name.includes(searchTerm) ||
                description.includes(searchTerm)
            ) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }

        });

    });

}


// ======================================
// PROGRAMME CATEGORY FILTERS
// ======================================

const filterButtons =
    document.querySelectorAll(".filter-btn");

const programmes =
    document.querySelectorAll(".programme-card");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        const selectedCategory =
            button.dataset.category;

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        programmes.forEach(programme => {

            const category =
                programme.dataset.category;

            if (
                selectedCategory === "all" ||
                category === selectedCategory
            ) {
                programme.style.display = "block";
            } else {
                programme.style.display = "none";
            }

        });

    });

});


// ======================================
// SCHOOL DATABASE
// ======================================

const schoolData =
    Array.isArray(window.schools)
        ? window.schools
        : [];


// ======================================
// SHS SCHOOL DIRECTORY
// ======================================

const schoolSearch =
    document.getElementById("schoolSearch");

const regionFilter =
    document.getElementById("regionFilter");

const schoolTypeFilter =
    document.getElementById("schoolTypeFilter");

const schoolSearchBtn =
    document.getElementById("schoolSearchBtn");

const schoolResults =
    document.getElementById("schoolResults");


if (
    schoolSearch &&
    regionFilter &&
    schoolTypeFilter &&
    schoolResults
) {

    function displaySchools() {

        const searchTerm =
            schoolSearch.value
                .toLowerCase()
                .trim();

        const selectedRegion =
            regionFilter.value;

        const selectedType =
            schoolTypeFilter.value;


        const filteredSchools =
            schoolData.filter(school => {

                const name =
                    school.name
                        ? school.name.toLowerCase()
                        : "";

                const region =
                    school.region || "";

                const type =
                    school.type || "";


                const matchesName =
                    name.includes(searchTerm);

                const matchesRegion =
                    selectedRegion === "all" ||
                    region === selectedRegion;

                const matchesType =
                    selectedType === "all" ||
                    type === selectedType;


                return (
                    matchesName &&
                    matchesRegion &&
                    matchesType
                );

            });


        schoolResults.innerHTML = "";


        // NO RESULTS

        if (filteredSchools.length === 0) {

            schoolResults.innerHTML = `
                <div class="school-card">

                    <div class="school-icon">
                        🔍
                    </div>

                    <h3>No schools found</h3>

                    <p>
                        We couldn't find a school
                        matching your search.
                    </p>

                </div>
            `;

            return;
        }


        // SCHOOL CARDS

        filteredSchools.forEach(school => {

            const card =
                document.createElement("a");


            card.className =
                "school-card";


            card.href =
                "school-details.html?school=" +
                encodeURIComponent(school.name);


            card.innerHTML = `
                <div class="school-icon">
                    🏫
                </div>

                <h3>
                    ${school.name}
                </h3>

                <p>
                    📍 Region: ${school.region}
                    <br>
                    🏛️ District: ${school.district}
                    <br>
                    🎓 Type: ${school.type}
                </p>

                <span>
                    View school details →
                </span>
            `;


            schoolResults.appendChild(card);

        });

    }


    // SHOW SCHOOLS ON PAGE LOAD

    displaySchools();


    // SEARCH BUTTON

    if (schoolSearchBtn) {

        schoolSearchBtn.addEventListener(
            "click",
            displaySchools
        );

    }


    // SEARCH WHILE TYPING

    schoolSearch.addEventListener(
        "input",
        displaySchools
    );


    // REGION FILTER

    regionFilter.addEventListener(
        "change",
        displaySchools
    );


    // SCHOOL TYPE FILTER

    schoolTypeFilter.addEventListener(
        "change",
        displaySchools
    );

}


// ======================================
// SCHOOL DETAILS PAGE
// ======================================

const schoolNameElement =
    document.getElementById("schoolName");


if (schoolNameElement) {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const selectedSchool =
        params.get("school");


    const school =
        schoolData.find(item =>
            item.name === selectedSchool
        );


    if (school) {

        // BASIC INFORMATION

        document.title =
            school.name +
            " | EduPath Ghana";


        schoolNameElement.textContent =
            school.name;


        const schoolType =
            document.getElementById("schoolType");

        if (schoolType) {
            schoolType.textContent =
                school.type;
        }


        const schoolRegion =
            document.getElementById("schoolRegion");

        if (schoolRegion) {
            schoolRegion.textContent =
                school.region;
        }


        const schoolDistrict =
            document.getElementById("schoolDistrict");

        if (schoolDistrict) {
            schoolDistrict.textContent =
                school.district;
        }


        const schoolTypeInfo =
            document.getElementById("schoolTypeInfo");

        if (schoolTypeInfo) {
            schoolTypeInfo.textContent =
                school.type;
        }


        // SCHOOL PROFILE

        const schoolLocation =
            document.getElementById("schoolLocation");

        if (schoolLocation) {

            schoolLocation.textContent =
                school.location ||
                "Information coming soon.";

        }


        const schoolGender =
            document.getElementById("schoolGender");

        if (schoolGender) {

            schoolGender.textContent =
                school.gender ||
                "Information coming soon.";

        }


        const schoolAccommodation =
            document.getElementById(
                "schoolAccommodation"
            );

        if (schoolAccommodation) {

            schoolAccommodation.textContent =
                school.accommodation ||
                "Information coming soon.";

        }


        const schoolProgrammes =
            document.getElementById(
                "schoolProgrammes"
            );

        if (schoolProgrammes) {

            if (
                Array.isArray(school.programmes) &&
                school.programmes.length > 0
            ) {

                schoolProgrammes.textContent =
                    school.programmes.join(", ");

            } else {

                schoolProgrammes.textContent =
                    "Information coming soon.";

            }

        }


        // CONTACT

        const schoolContact =
            document.getElementById(
                "schoolContact"
            );

        if (schoolContact) {

            schoolContact.textContent =
                school.contact ||
                "Information coming soon.";

        }


        // EMAIL

        const schoolEmail =
            document.getElementById(
                "schoolEmail"
            );

        if (schoolEmail) {

            schoolEmail.textContent =
                school.email ||
                "Information coming soon.";

        }


        // WEBSITE

        const schoolWebsite =
            document.getElementById(
                "schoolWebsite"
            );

        if (schoolWebsite) {

            if (school.website) {

                schoolWebsite.textContent =
                    school.website;

                schoolWebsite.href =
                    school.website;

            } else {

                schoolWebsite.textContent =
                    "Information coming soon.";

                schoolWebsite.removeAttribute(
                    "href"
                );

            }

        }

    } else {

        schoolNameElement.textContent =
            "School not found";


        const schoolType =
            document.getElementById(
                "schoolType"
            );


        if (schoolType) {

            schoolType.textContent =
                "We couldn't find this school record.";

        }

    }

}
// =========================================
// CONTACT & FEEDBACK FORM
// =========================================

const contactForm = document.getElementById("contactForm");
const contactMessageStatus = document.getElementById("contactMessageStatus");

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        contactMessageStatus.textContent =
            "Thank you for your feedback! Your message has been received.";

        contactForm.reset();

    });

}