// ======================================
// EDUPATH GHANA - SMART CAREER FINDER
// ======================================

const findCareerBtn = document.getElementById("findCareerBtn");
const careerResults = document.getElementById("careerResults");
const careerResultsSection = document.getElementById("career-results");


// ======================================
// PROGRAMME DATABASE
// ======================================

const careerProgrammes = [

    {
        name: "Accounting",
        icon: "🧾",
        description: "Study financial records, reporting, auditing and financial management.",
        careers: "Accountant, Auditor, Financial Analyst, Tax Consultant",
        link: "accounting.html",
        areas: ["Business", "Business / Economics", "Mathematics", "Problem Solving", "Stability"],
        subjects: ["Mathematics", "Business"]
    },

    {
        name: "Agricultural Engineering",
        icon: "🚜",
        description: "Apply engineering principles to agriculture, machinery, irrigation and food production.",
        careers: "Agricultural Engineer, Farm Systems Engineer, Irrigation Engineer",
        link: "agricultural-engineering.html",
        areas: ["Engineering", "Science", "Mathematics", "Practical", "Innovation"],
        subjects: ["Mathematics", "Science", "Agriculture"]
    },

    {
        name: "Agricultural Science",
        icon: "🌱",
        description: "Study crops, animals, soil, farming systems and agricultural production.",
        careers: "Agricultural Scientist, Farm Manager, Agricultural Extension Officer",
        link: "agricultural-science.html",
        areas: ["Science", "Practical", "Impact", "Innovation", "Stability"],
        subjects: ["Science", "Agriculture"]
    },

    {
        name: "Architecture",
        icon: "🏛️",
        description: "Combine design, technology and engineering principles to create buildings and spaces.",
        careers: "Architect, Urban Designer, Architectural Technologist",
        link: "architecture.html",
        areas: ["Engineering", "Mathematics", "Creative", "Practical", "Innovation"],
        subjects: ["Mathematics", "Science", "Creative Arts"]
    },

    {
        name: "Artificial Intelligence",
        icon: "🤖",
        description: "Study intelligent computer systems, machine learning and automation.",
        careers: "AI Engineer, Machine Learning Engineer, AI Researcher",
        link: "artificial-intelligence.html",
        areas: ["Technology", "Mathematics", "Problem Solving", "Innovation", "Flexibility"],
        subjects: ["Mathematics", "Science", "ICT"]
    },

    {
        name: "Business Administration",
        icon: "📊",
        description: "Explore management, finance, marketing and business operations.",
        careers: "Business Manager, Entrepreneur, Marketing Specialist, Financial Analyst",
        link: "business-administration.html",
        areas: ["Business", "Business / Economics", "People", "Flexibility", "Business"],
        subjects: ["Mathematics", "Business", "English"]
    },

    {
        name: "Communication Studies",
        icon: "🎤",
        description: "Study communication, media, journalism, public relations and information sharing.",
        careers: "Journalist, Public Relations Officer, Media Specialist, Communications Officer",
        link: "communication-studies.html",
        areas: ["Arts / Humanities", "Creative", "People", "Impact", "Flexibility"],
        subjects: ["English", "Creative Arts", "Social Studies"]
    },

    {
        name: "Computer Engineering",
        icon: "💻",
        description: "Combine computer science and electrical engineering to build computer hardware and systems.",
        careers: "Computer Engineer, Embedded Systems Engineer, Hardware Engineer",
        link: "computer-engineering.html",
        areas: ["Technology", "Engineering", "Mathematics", "Practical", "Problem Solving"],
        subjects: ["Mathematics", "Science", "ICT"]
    },

    {
        name: "Computing",
        icon: "🖥️",
        description: "Study computing technologies, software, information systems and digital solutions.",
        careers: "Computing Professional, Systems Analyst, IT Specialist",
        link: "computing.html",
        areas: ["Technology", "Mathematics", "Problem Solving", "Innovation", "Flexibility"],
        subjects: ["Mathematics", "ICT", "Science"]
    },

    {
        name: "Cyber Security",
        icon: "🔐",
        description: "Study how to protect computers, networks, systems and information from cyber threats.",
        careers: "Cybersecurity Analyst, Security Engineer, Security Consultant",
        link: "cyber-security.html",
        areas: ["Technology", "Mathematics", "Problem Solving", "Innovation", "Stability"],
        subjects: ["Mathematics", "ICT", "Science"]
    },

    {
        name: "Data Science",
        icon: "📈",
        description: "Use statistics, mathematics and computing to analyse data and solve problems.",
        careers: "Data Scientist, Data Analyst, Business Intelligence Analyst",
        link: "data-science.html",
        areas: ["Technology", "Mathematics", "Business / Economics", "Problem Solving", "Innovation"],
        subjects: ["Mathematics", "ICT", "Science", "Business"]
    },

    {
        name: "Economics",
        icon: "💰",
        description: "Study how people, businesses and governments make decisions about resources.",
        careers: "Economist, Economic Analyst, Policy Analyst, Financial Analyst",
        link: "economics.html",
        areas: ["Business / Economics", "Mathematics", "Problem Solving", "Impact", "Stability"],
        subjects: ["Mathematics", "Business", "Social Studies"]
    },

    {
        name: "Information Technology",
        icon: "🌐",
        description: "Study the use and management of technology to solve organisational problems.",
        careers: "IT Specialist, Network Administrator, IT Consultant",
        link: "information-technology.html",
        areas: ["Technology", "Problem Solving", "Practical", "Flexibility", "Innovation"],
        subjects: ["ICT", "Mathematics", "Science"]
    },

    {
        name: "Information Systems",
        icon: "🗂️",
        description: "Combine business and technology to manage information and improve organisations.",
        careers: "Systems Analyst, Business Analyst, IT Consultant",
        link: "information-systems.html",
        areas: ["Technology", "Business / Economics", "Problem Solving", "Business", "Flexibility"],
        subjects: ["ICT", "Mathematics", "Business"]
    },

    {
        name: "Marketing",
        icon: "📣",
        description: "Study how businesses understand customers and promote products and services.",
        careers: "Marketing Specialist, Brand Manager, Digital Marketer, Sales Manager",
        link: "marketing.html",
        areas: ["Business", "Business / Economics", "Creative", "People", "Flexibility"],
        subjects: ["Business", "English", "Creative Arts"]
    },

    {
        name: "Mechanical Engineering",
        icon: "⚙️",
        description: "Study machines, mechanical systems, manufacturing and engineering design.",
        careers: "Mechanical Engineer, Manufacturing Engineer, Design Engineer",
        link: "mechanical-engineering.html",
        areas: ["Engineering", "Mathematics", "Practical", "Problem Solving", "Innovation"],
        subjects: ["Mathematics", "Science", "ICT"]
    },

    {
        name: "Medical Laboratory Science",
        icon: "🔬",
        description: "Study laboratory methods used to investigate diseases and support medical diagnosis.",
        careers: "Medical Laboratory Scientist, Laboratory Technologist, Researcher",
        link: "medical-laboratory-science.html",
        areas: ["Health", "Science", "Problem Solving", "Practical", "Stability"],
        subjects: ["Science", "Mathematics"]
    },

    {
        name: "Nursing",
        icon: "👩‍⚕️",
        description: "Study patient care, health promotion, disease prevention and clinical practice.",
        careers: "Registered Nurse, Community Health Nurse, Nurse Educator",
        link: "nursing.html",
        areas: ["Health", "Science", "People", "Impact", "Stability"],
        subjects: ["Science", "English"]
    },

    {
        name: "Nutrition & Dietetics",
        icon: "🥗",
        description: "Study nutrition and how food affects health, growth and wellbeing.",
        careers: "Dietitian, Nutritionist, Public Health Nutritionist",
        link: "nutrition-dietetics.html",
        areas: ["Health", "Science", "People", "Impact", "Stability"],
        subjects: ["Science", "English"]
    },

    {
        name: "Pharmacy",
        icon: "💊",
        description: "Study medicines, their effects, safe use and pharmaceutical science.",
        careers: "Pharmacist, Pharmaceutical Scientist, Clinical Pharmacist",
        link: "pharmacy.html",
        areas: ["Health", "Science", "Problem Solving", "Stability"],
        subjects: ["Science", "Mathematics"]
    },

    {
        name: "Political Science",
        icon: "🏛️",
        description: "Study government, politics, public policy and political institutions.",
        careers: "Policy Analyst, Political Researcher, Public Administrator",
        link: "political-science.html",
        areas: ["Arts / Humanities", "People", "Impact", "Law", "Stability"],
        subjects: ["Social Studies", "English"]
    },

    {
        name: "Psychology",
        icon: "🧠",
        description: "Study human behaviour, thoughts, emotions and mental processes.",
        careers: "Psychologist, Counsellor, Human Resources Specialist, Researcher",
        link: "psychology.html",
        areas: ["Arts / Humanities", "Health", "People", "Impact", "Problem Solving"],
        subjects: ["English", "Science", "Social Studies"]
    },

    {
        name: "Public Health",
        icon: "🏥",
        description: "Focus on preventing disease and improving the health of communities.",
        careers: "Public Health Officer, Epidemiologist, Health Promotion Specialist",
        link: "public-health.html",
        areas: ["Health", "Science", "People", "Impact", "Stability"],
        subjects: ["Science", "English", "Social Studies"]
    },

    {
        name: "Software Engineering",
        icon: "👨‍💻",
        description: "Learn how to design, develop, test and maintain software applications.",
        careers: "Software Engineer, Application Developer, Systems Developer",
        link: "software-engineering.html",
        areas: ["Technology", "Mathematics", "Problem Solving", "Innovation", "Flexibility"],
        subjects: ["Mathematics", "ICT", "Science"]
    },

    {
        name: "Medicine",
        icon: "🩺",
        description: "Study human health, diseases, diagnosis and treatment.",
        careers: "Doctor, Medical Researcher, Public Health Professional",
        link: "medicine.html",
        areas: ["Health", "Science", "People", "Impact", "Stability"],
        subjects: ["Science", "Mathematics", "English"]
    },

    {
        name: "Civil Engineering",
        icon: "🏗️",
        description: "Study the design and development of buildings, roads, bridges and infrastructure.",
        careers: "Civil Engineer, Structural Engineer, Construction Manager",
        link: "civil-engineering.html",
        areas: ["Engineering", "Mathematics", "Practical", "Problem Solving", "Innovation"],
        subjects: ["Mathematics", "Science", "ICT"]
    },

    {
        name: "Law",
        icon: "⚖️",
        description: "Study legal systems, justice, rights and responsibilities.",
        careers: "Lawyer, Legal Adviser, Compliance Officer, Policy Professional",
        link: "law.html",
        areas: ["Law", "Arts / Humanities", "People", "Impact", "Stability"],
        subjects: ["English", "Social Studies"]
    },

    {
        name: "Biochemistry",
        icon: "🧪",
        description: "Study the chemical processes that occur in living organisms.",
        careers: "Biochemist, Laboratory Scientist, Researcher, Pharmaceutical Scientist",
        link: "biochemistry.html",
        areas: ["Science", "Health", "Problem Solving", "Innovation", "Stability"],
        subjects: ["Science", "Mathematics"]
    },

    {
        name: "Electrical Engineering",
        icon: "⚡",
        description: "Study electricity, electronics, electrical systems and technology.",
        careers: "Electrical Engineer, Electronics Engineer, Control Systems Engineer",
        link: "electrical-engineering.html",
        areas: ["Engineering", "Mathematics", "Technology", "Practical", "Problem Solving"],
        subjects: ["Mathematics", "Science", "ICT"]
    }

];


// ======================================
// GET SELECTED ANSWERS
// ======================================

function getSelectedAnswers() {

    const studyLevel =
        document.querySelector(
            'input[name="studyLevel"]:checked'
        );

    const careerArea =
        document.querySelector(
            'input[name="careerArea"]:checked'
        );

    const workStyle =
        document.querySelector(
            'input[name="workStyle"]:checked'
        );

    const careerGoal =
        document.querySelector(
            'input[name="careerGoal"]:checked'
        );

    const interests =
        document.querySelectorAll(
            'input[name="interest"]:checked'
        );

    const subjects =
        document.querySelectorAll(
            'input[name="subject"]:checked'
        );

    return {

        studyLevel:
            studyLevel ? studyLevel.value : "",

        careerArea:
            careerArea ? careerArea.value : "",

        workStyle:
            workStyle ? workStyle.value : "",

        careerGoal:
            careerGoal ? careerGoal.value : "",

        interests:
            Array.from(interests)
                .map(item => item.value),

        subjects:
            Array.from(subjects)
                .map(item => item.value)

    };

}


// ======================================
// CALCULATE RECOMMENDATIONS
// ======================================

function calculateRecommendations(answers) {

    const results =
        careerProgrammes.map(programme => {

            let score = 0;

            let matchedReasons = [];


            // ------------------------------
            // CAREER AREA
            // ------------------------------

            if (
                answers.careerArea &&
                programme.areas.includes(
                    answers.careerArea
                )
            ) {

                score += 4;

                matchedReasons.push(
                    answers.careerArea
                );

            }


            // ------------------------------
            // WORK STYLE
            // ------------------------------

            if (
                answers.workStyle &&
                programme.areas.includes(
                    answers.workStyle
                )
            ) {

                score += 3;

                matchedReasons.push(
                    answers.workStyle
                );

            }


            // ------------------------------
            // CAREER GOAL
            // ------------------------------

            if (
                answers.careerGoal &&
                programme.areas.includes(
                    answers.careerGoal
                )
            ) {

                score += 3;

                matchedReasons.push(
                    answers.careerGoal
                );

            }


            // ------------------------------
            // INTERESTS
            // ------------------------------

            answers.interests.forEach(
                interest => {

                    if (
                        programme.areas.includes(
                            interest
                        )
                    ) {

                        score += 2;

                        matchedReasons.push(
                            interest
                        );

                    }

                }
            );


            // ------------------------------
            // SUBJECTS
            // ------------------------------

            answers.subjects.forEach(
                subject => {

                    if (
                        programme.subjects.includes(
                            subject
                        )
                    ) {

                        score += 4;

                        matchedReasons.push(
                            subject
                        );

                    }

                }
            );


            // Remove duplicate reasons

            matchedReasons =
                [...new Set(matchedReasons)];


            return {

                ...programme,

                score: score,

                matchedReasons:
                    matchedReasons

            };

        });


    return results
        .sort(
            (a, b) =>
                b.score - a.score
        )
        .slice(0, 3);

}


// ======================================
// CREATE REASON TEXT
// ======================================

function createReasonText(programme) {

    if (
        !programme.matchedReasons ||
        programme.matchedReasons.length === 0
    ) {

        return "This programme may be worth exploring based on your answers.";

    }


    const reasons =
        programme.matchedReasons
            .slice(0, 4)
            .join(", ");


    return `Your answers match this programme in areas such as ${reasons}.`;

}


// ======================================
// DISPLAY RESULTS
// ======================================

function displayCareerResults(
    recommendations
) {

    careerResults.innerHTML = "";


    recommendations.forEach(
        (programme, index) => {

            const card =
                document.createElement("div");


            card.className =
                "career-result-card";


            const matchText =
                index === 0
                    ? "⭐ Best match"
                    : "Good match";


            const reason =
                createReasonText(
                    programme
                );


            card.innerHTML = `

                <div class="career-result-icon">
                    ${programme.icon}
                </div>

                <span class="career-match">
                    ${matchText}
                </span>

                <h3>
                    ${programme.name}
                </h3>

                <p>
                    ${programme.description}
                </p>

                <p class="career-why">
                    <strong>
                        Why this was recommended:
                    </strong>
                    ${reason}
                </p>

                <p>
                    <strong>
                        Possible careers:
                    </strong>
                    ${programme.careers}
                </p>

                <a href="${programme.link}">
                    Explore Programme →
                </a>

            `;


            careerResults.appendChild(card);

        }
    );


    careerResultsSection.scrollIntoView({
        behavior: "smooth"
    });

}


// ======================================
// BUTTON ACTION
// ======================================

if (findCareerBtn) {

    findCareerBtn.addEventListener(
        "click",
        () => {

            const answers =
                getSelectedAnswers();


            if (
                !answers.studyLevel ||
                !answers.careerArea ||
                !answers.workStyle ||
                !answers.careerGoal
            ) {

                alert(
                    "Please answer all the required questions before finding your career path."
                );

                return;

            }


            const recommendations =
                calculateRecommendations(
                    answers
                );


            displayCareerResults(
                recommendations
            );

        }
    );

}