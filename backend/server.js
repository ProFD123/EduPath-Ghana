const express = require("express");
const session = require("express-session");
const path = require("path");

const database = require("./database");
const programmesDb = require("./programmes");
const schoolsDb = require("./schools");
const scholarshipsDb = require("./scholarships");
const usersDb = require("./users");

const app = express();

const PORT = process.env.PORT || 3000;


// ==================================================
// MIDDLEWARE
// ==================================================

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true
    })
);

app.use(
    session({
        secret: "edupath-ghana-secret-2026",
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            sameSite: "lax"
        }
    })
);


// ==================================================
// FRONTEND
// ==================================================

app.use(
    express.static(
        path.join(__dirname, "..")
    )
);


// ==================================================
// HOME
// ==================================================

app.get("/", (req, res) => {

    res.sendFile(
        path.join(
            __dirname,
            "..",
            "index.html"
        )
    );

});


// ==================================================
// TEST API
// ==================================================

app.get(
    "/api/test",
    (req, res) => {

        res.json({
            success: true,
            message:
                "EduPath Ghana backend is working."
        });

    }
);


// ==================================================
// REVIEW ARENA
// ==================================================

app.post(
    "/api/reviews",
    (req, res) => {

        try {

            const {
                name,
                email,
                type,
                message
            } = req.body;

            if (!message) {

                return res.status(400).json({
                    success: false,
                    message:
                        "Name and message are required."
                });

            }

            const submission =
                database.addSubmission({
                  name: name || "Anonymous",
                    email,
                    type,
                    message
                });

            res.status(201).json({
                success: true,
                message:
                    "Review submitted successfully.",
                submission
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                success: false,
                message:
                    "Could not submit review."
            });

        }

    }
);


// ==================================================
// ADMIN AUTHENTICATION
// ==================================================

const ADMIN_USERNAME = "admin";

const ADMIN_PASSWORD =
    "EduPathAdmin2026!";


app.post(
    "/api/admin/login",
    (req, res) => {

        const {
            username,
            password
        } = req.body;

        if (
            username === ADMIN_USERNAME &&
            password === ADMIN_PASSWORD
        ) {

            req.session.admin = true;

            return res.json({
                success: true,
                message:
                    "Admin login successful."
            });

        }

        res.status(401).json({
            success: false,
            message:
                "Invalid admin credentials."
        });

    }
);


app.get(
    "/api/admin/session",
    (req, res) => {

        res.json({
            success: true,
            loggedIn:
                !!req.session.admin
        });

    }
);


app.post(
    "/api/admin/logout",
    (req, res) => {

        req.session.destroy(() => {

            res.json({
                success: true,
                message:
                    "Logged out successfully."
            });

        });

    }
);


function requireAdmin(
    req,
    res,
    next
) {

    if (!req.session.admin) {

        return res.status(401).json({
            success: false,
            message:
                "Admin authentication required."
        });

    }

    next();

}


// ==================================================
// ADMIN REVIEW ARENA
// ==================================================

app.get(
    "/api/admin/submissions",
    requireAdmin,
    (req, res) => {

        try {

            const submissions =
                database.getSubmissions();

            res.json({
                success: true,
                submissions
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                success: false,
                message:
                    "Could not load submissions."
            });

        }

    }
);


app.patch(
    "/api/admin/submissions/:id",
    requireAdmin,
    (req, res) => {

        try {

            const submission =
                database.updateSubmissionStatus(
                    req.params.id,
                    req.body.status
                );

            if (!submission) {

                return res.status(404).json({
                    success: false,
                    message:
                        "Submission not found."
                });

            }

            res.json({
                success: true,
                submission
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                success: false,
                message:
                    "Could not update submission."
            });

        }

    }
);


app.delete(
    "/api/admin/submissions/:id",
    requireAdmin,
    (req, res) => {

        try {

            const deleted =
                database.deleteSubmission(
                    req.params.id
                );

            if (!deleted) {

                return res.status(404).json({
                    success: false,
                    message:
                        "Submission not found."
                });

            }

            res.json({
                success: true,
                message:
                    "Submission deleted successfully."
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                success: false,
                message:
                    "Could not delete submission."
            });

        }

    }
);


// ==================================================
// PROGRAMMES
// ==================================================

app.get(
    "/api/programmes",
    (req, res) => {

        try {

            const programmes =
                programmesDb.getProgrammes();

            res.json({
                success: true,
                count:
                    programmes.length,
                programmes
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                success: false,
                message:
                    "Could not load programmes."
            });

        }

    }
);


app.get(
    "/api/programmes/:id",
    (req, res) => {

        try {

            const programme =
                programmesDb.getProgrammeById(
                    req.params.id
                );

            if (!programme) {

                return res.status(404).json({
                    success: false,
                    message:
                        "Programme not found."
                });

            }

            res.json({
                success: true,
                programme
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                success: false,
                message:
                    "Could not load programme."
            });

        }

    }
);


app.post(
    "/api/admin/programmes",
    requireAdmin,
    (req, res) => {

        try {

            const programme =
                programmesDb.addProgramme(
                    req.body
                );

            res.status(201).json({
                success: true,
                programme
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                success: false,
                message:
                    "Could not add programme."
            });

        }

    }
);


app.patch(
    "/api/admin/programmes/:id",
    requireAdmin,
    (req, res) => {

        try {

            const programme =
                programmesDb.updateProgramme(
                    req.params.id,
                    req.body
                );

            if (!programme) {

                return res.status(404).json({
                    success: false,
                    message:
                        "Programme not found."
                });

            }

            res.json({
                success: true,
                programme
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                success: false,
                message:
                    "Could not update programme."
            });

        }

    }
);


app.delete(
    "/api/admin/programmes/:id",
    requireAdmin,
    (req, res) => {

        try {

            const deleted =
                programmesDb.deleteProgramme(
                    req.params.id
                );

            if (!deleted) {

                return res.status(404).json({
                    success: false,
                    message:
                        "Programme not found."
                });

            }

            res.json({
                success: true,
                message:
                    "Programme deleted successfully."
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                success: false,
                message:
                    "Could not delete programme."
            });

        }

    }
);


// ==================================================
// SCHOOLS
// ==================================================

app.get(
    "/api/schools",
    (req, res) => {

        try {

            const schools =
                schoolsDb.getSchools();

            res.json({
                success: true,
                count: schools.length,
                schools
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                success: false,
                message:
                    "Could not load schools."
            });

        }

    }
);


app.get(
    "/api/schools/:id",
    (req, res) => {

        try {

            const school =
                schoolsDb.getSchoolById(
                    req.params.id
                );

            if (!school) {

                return res.status(404).json({
                    success: false,
                    message:
                        "School not found."
                });

            }

            res.json({
                success: true,
                school
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                success: false,
                message:
                    "Could not load school."
            });

        }

    }
);


app.post(
    "/api/admin/schools",
    requireAdmin,
    (req, res) => {

        try {

            const school =
                schoolsDb.addSchool(
                    req.body
                );

            res.status(201).json({
                success: true,
                school
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                success: false,
                message:
                    "Could not add school."
            });

        }

    }
);


app.patch(
    "/api/admin/schools/:id",
    requireAdmin,
    (req, res) => {

        try {

            const school =
                schoolsDb.updateSchool(
                    req.params.id,
                    req.body
                );

            if (!school) {

                return res.status(404).json({
                    success: false,
                    message:
                        "School not found."
                });

            }

            res.json({
                success: true,
                school
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                success: false,
                message:
                    "Could not update school."
            });

        }

    }
);


app.delete(
    "/api/admin/schools/:id",
    requireAdmin,
    (req, res) => {

        try {

            const deleted =
                schoolsDb.deleteSchool(
                    req.params.id
                );

            if (!deleted) {

                return res.status(404).json({
                    success: false,
                    message:
                        "School not found."
                });

            }

            res.json({
                success: true,
                message:
                    "School deleted successfully."
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                success: false,
                message:
                    "Could not delete school."
            });

        }

    }
);


// ==================================================
// SCHOLARSHIPS
// ==================================================

app.get(
    "/api/scholarships",
    (req, res) => {

        try {

            const scholarships =
                scholarshipsDb.getScholarships();

            res.json({
                success: true,
                count:
                    scholarships.length,
                scholarships
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                success: false,
                message:
                    "Could not load scholarships."
            });

        }

    }
);


app.get(
    "/api/scholarships/:id",
    (req, res) => {

        try {

            const scholarship =
                scholarshipsDb.getScholarshipById(
                    req.params.id
                );

            if (!scholarship) {

                return res.status(404).json({
                    success: false,
                    message:
                        "Scholarship not found."
                });

            }

            res.json({
                success: true,
                scholarship
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                success: false,
                message:
                    "Could not load scholarship."
            });

        }

    }
);


// ==================================================
// USERS — REGISTER
// ==================================================

app.post(
    "/api/users/register",
    (req, res) => {

        try {

            const {
                name,
                email,
                password
            } = req.body;

            if (
                !name ||
                !email ||
                !password
            ) {

                return res.status(400).json({
                    success: false,
                    message:
                        "Name, email and password are required."
                });

            }

            const existingUser =
                usersDb.getUserByEmail(
                    email
                );

            if (existingUser) {

                return res.status(409).json({
                    success: false,
                    message:
                        "An account with this email already exists."
                });

            }

            const user =
                usersDb.addUser({
                    name,
                    email,
                    password
                });

            res.status(201).json({
                success: true,
                message:
                    "Account created successfully.",
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    favourites:
                        user.favourites
                }
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                success: false,
                message:
                    "Could not create account."
            });

        }

    }
);


// ==================================================
// USERS — LOGIN
// ==================================================

app.post(
    "/api/users/login",
    (req, res) => {

        try {

            const {
                email,
                password
            } = req.body;

            if (!email || !password) {

                return res.status(400).json({
                    success: false,
                    message:
                        "Email and password are required."
                });

            }

            const user =
                usersDb.getUserByEmail(
                    email
                );

            if (
                !user ||
                !usersDb.verifyPassword(
                    password,
                    user.password
                )
            ) {

                return res.status(401).json({
                    success: false,
                    message:
                        "Invalid email or password."
                });

            }

            res.json({
                success: true,
                message:
                    "Login successful.",
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    favourites:
                        user.favourites
                }
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                success: false,
                message:
                    "Could not log in."
            });

        }

    }
);


// ==================================================
// GET USER
// ==================================================

app.get(
    "/api/users/:id",
    (req, res) => {

        try {

            const user =
                usersDb.getUserById(
                    req.params.id
                );

            if (!user) {

                return res.status(404).json({
                    success: false,
                    message:
                        "User not found."
                });

            }

            res.json({
                success: true,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    favourites:
                        user.favourites,
                    careerGuidanceResult:
                        user.careerGuidanceResult ||
                        null
                }
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                success: false,
                message:
                    "Could not load user."
            });

        }

    }
);


// ==================================================
// SCHOOL FAVOURITES
// ==================================================

// CHECK SCHOOL FAVOURITE

app.get(
    "/api/users/:id/favourites/schools/:schoolId",
    (req, res) => {

        try {

            const user =
                usersDb.getUserById(
                    req.params.id
                );

            if (!user) {

                return res.status(404).json({
                    success: false,
                    message:
                        "User not found."
                });

            }

            const favourite =
                usersDb.isSchoolFavourite(
                    req.params.id,
                    req.params.schoolId
                );

            res.json({
                success: true,
                favourite
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                success: false,
                message:
                    "Could not check school favourite."
            });

        }

    }
);


// ADD SCHOOL FAVOURITE

app.post(
    "/api/users/:id/favourites/schools/:schoolId",
    (req, res) => {

        try {

            const user =
                usersDb.getUserById(
                    req.params.id
                );

            if (!user) {

                return res.status(404).json({
                    success: false,
                    message:
                        "User not found."
                });

            }

            usersDb.addSchoolFavourite(
                req.params.id,
                req.params.schoolId
            );

            res.json({
                success: true,
                favourite: true
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                success: false,
                message:
                    "Could not save school favourite."
            });

        }

    }
);


// REMOVE SCHOOL FAVOURITE

app.delete(
    "/api/users/:id/favourites/schools/:schoolId",
    (req, res) => {

        try {

            const user =
                usersDb.getUserById(
                    req.params.id
                );

            if (!user) {

                return res.status(404).json({
                    success: false,
                    message:
                        "User not found."
                });

            }

            usersDb.removeSchoolFavourite(
                req.params.id,
                req.params.schoolId
            );

            res.json({
                success: true,
                favourite: false
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                success: false,
                message:
                    "Could not remove school favourite."
            });

        }

    }
);


// ==================================================
// PROGRAMME FAVOURITES
// ==================================================

app.get(
    "/api/users/:id/favourites/programmes/:programmeId",
    (req, res) => {

        try {

            const user =
                usersDb.getUserById(
                    req.params.id
                );

            if (!user) {

                return res.status(404).json({
                    success: false,
                    message:
                        "User not found."
                });

            }

            const favourite =
                usersDb.isProgrammeFavourite(
                    req.params.id,
                    req.params.programmeId
                );

            res.json({
                success: true,
                favourite
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                success: false,
                message:
                    "Could not check programme favourite."
            });

        }

    }
);


app.post(
    "/api/users/:id/favourites/programmes/:programmeId",
    (req, res) => {

        try {

            const user =
                usersDb.getUserById(
                    req.params.id
                );

            if (!user) {

                return res.status(404).json({
                    success: false,
                    message:
                        "User not found."
                });

            }

            usersDb.addProgrammeFavourite(
                req.params.id,
                req.params.programmeId
            );

            res.json({
                success: true,
                favourite: true
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                success: false,
                message:
                    "Could not save programme favourite."
            });

        }

    }
);


app.delete(
    "/api/users/:id/favourites/programmes/:programmeId",
    (req, res) => {

        try {

            const user =
                usersDb.getUserById(
                    req.params.id
                );

            if (!user) {

                return res.status(404).json({
                    success: false,
                    message:
                        "User not found."
                });

            }

            usersDb.removeProgrammeFavourite(
                req.params.id,
                req.params.programmeId
            );

            res.json({
                success: true,
                favourite: false
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                success: false,
                message:
                    "Could not remove programme favourite."
            });

        }

    }
);


// ==================================================
// SCHOLARSHIP FAVOURITES
// ==================================================

app.get(
    "/api/users/:id/favourites/scholarships/:scholarshipId",
    (req, res) => {

        try {

            const user =
                usersDb.getUserById(
                    req.params.id
                );

            if (!user) {

                return res.status(404).json({
                    success: false,
                    message:
                        "User not found."
                });

            }

            const favourite =
                usersDb.isScholarshipFavourite(
                    req.params.id,
                    req.params.scholarshipId
                );

            res.json({
                success: true,
                favourite
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                success: false,
                message:
                    "Could not check scholarship favourite."
            });

        }

    }
);


app.post(
    "/api/users/:id/favourites/scholarships/:scholarshipId",
    (req, res) => {

        try {

            const user =
                usersDb.getUserById(
                    req.params.id
                );

            if (!user) {

                return res.status(404).json({
                    success: false,
                    message:
                        "User not found."
                });

            }

            usersDb.addScholarshipFavourite(
                req.params.id,
                req.params.scholarshipId
            );

            res.json({
                success: true,
                favourite: true
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                success: false,
                message:
                    "Could not save scholarship favourite."
            });

        }

    }
);


app.delete(
    "/api/users/:id/favourites/scholarships/:scholarshipId",
    (req, res) => {

        try {

            const user =
                usersDb.getUserById(
                    req.params.id
                );

            if (!user) {

                return res.status(404).json({
                    success: false,
                    message:
                        "User not found."
                });

            }

            usersDb.removeScholarshipFavourite(
                req.params.id,
                req.params.scholarshipId
            );

            res.json({
                success: true,
                favourite: false
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                success: false,
                message:
                    "Could not remove scholarship favourite."
            });

        }

    }
);


// ==================================================
// CAREER GUIDANCE
// ==================================================

// SAVE CAREER GUIDANCE RESULT

app.post(
    "/api/users/:id/career-guidance",
    (req, res) => {

        try {

            const user =
                usersDb.getUserById(
                    req.params.id
                );

            if (!user) {

                return res.status(404).json({
                    success: false,
                    message:
                        "Student not found."
                });

            }

            const result =
                req.body.result ||
                req.body.careerGuidanceResult ||
                req.body;

            const updatedUser =
                usersDb.saveCareerGuidanceResult(
                    req.params.id,
                    result
                );

            res.json({
                success: true,
                message:
                    "Career result saved successfully.",
                careerGuidanceResult:
                    updatedUser.careerGuidanceResult
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                success: false,
                message:
                    "Could not save career result."
            });

        }

    }
);


// GET CAREER GUIDANCE RESULT

app.get(
    "/api/users/:id/career-guidance",
    (req, res) => {

        try {

            const user =
                usersDb.getUserById(
                    req.params.id
                );

            if (!user) {

                return res.status(404).json({
                    success: false,
                    message:
                        "Student not found."
                });

            }

            res.json({
                success: true,
                careerGuidanceResult:
                    usersDb.getCareerGuidanceResult(
                        req.params.id
                    )
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                success: false,
                message:
                    "Could not load career result."
            });

        }

    }
);


// ==================================================
// START SERVER
// ==================================================

app.listen(
    PORT,
    "0.0.0.0",
    () => {

        console.log(
            "EduPath Ghana backend running on port 3000"
        );

    }
);