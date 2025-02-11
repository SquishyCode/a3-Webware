const express = require("express");
const passport = require("passport");
const {ObjectId} = require("mongodb");

function checckAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        console.log("User is authenticated");
        return next();
    }
    res.redirect('/login');
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect("/results");
    }
    next();
}

module.exports = (usersCollection, dataCollection) => {
    const router = express.Router();

    // Root route
    router.get("/", (req, res) => {
        res.redirect("/login");
    });

    // Register Page
    router.get("/register", (req, res) => res.render("register"));

    // Register Logic
    router.post("/register", async (req, res) => {
        const existingUser = await usersCollection.findOne({ username: req.body.username });
        if (existingUser) {
            return res.send("User already exists");
        }
        await usersCollection.insertOne({ username: req.body.username, password: req.body.password });
        res.redirect("/login");
    });

    // Login Page
    router.get("/login", (req, res) => {
        res.render("login", { error: req.flash("error"), success: req.flash("success") });
    });

    // Login Logic
    router.post("/login", (req, res, next) => {
        passport.authenticate("local", (err, user, info) => {
            if (err) {
                console.error("Authentication error:", err);
                return next(err);
            }
            if (!user) {
                console.log("Login failed:", info.message);
                return res.redirect("/login");
            }
            req.logIn(user, (err) => {
                if (err) {
                    console.error("Login error:", err);
                    return next(err);
                }
                console.log("Login successful, redirecting...");
                return res.redirect("/results");
            });
        })(req, res, next);
    });

    // Logout Route
    router.get("/logout", (req, res, next) => {
        req.logout(err => {
            if (err) return next(err);
            res.redirect("/");
        });
    });

    //Route for Debug
    router.get("/session", (req, res) => {
        console.log("Session Data", req.session);
        res.json(req.session);
    })

    //Results Page
    function isAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            console.log("User is authenticated, proceeding to results page");
            return next();
        }
        console.log("User is not authenticated, redirecting to login");
        res.redirect("/login");
    }

    router.get("/results", isAuthenticated, async (req, res) => {
        try {
            console.log("Fetching data for user:", req.user._id);

            const userData = await dataCollection.find({ userId: req.user._id.toString() }).toArray();
            console.log("Fetched userData:", userData);

            const user = await usersCollection.findOne({ _id: new ObjectId(req.user._id) });
            console.log("Fetched user:", user);

            if (!user) {
                console.error("User not found in database.");
                return res.status(404).send("User not found.");
            }

            res.render("results", { userData, user });
        } catch (error) {
            console.error("Error fetching results:", error);
            res.status(500).send("Internal Server Error");
        }
    });



    // Route to add
    router.post("/add", isAuthenticated, async (req, res) => {
        try {
            console.log("User in request before insert:", req.user);

            if (!req.user || !req.user._id) {
                console.error("Error: User ID is missing before inserting data.");
                return res.status(400).send("User not authenticated.");
            }

            const userId = req.user._id.toString();

            const newData = {
                userId: userId,
                title: req.body.title,
                description: req.body.description,
                timestamp: new Date().toISOString()
            };

            console.log("Data being inserted:", newData);

            await dataCollection.insertOne(newData);

            console.log("Data successfully inserted.");
            res.redirect("/results");
        } catch (error) {
            console.error("Error adding data:", error);
            res.status(500).send("Internal Server Error");
        }
    });


    // Route to edit
    router.post("/edit/:id", isAuthenticated, async (req, res) => {
        try {
            console.log("Editing entry:", req.params.id);

            const result = await dataCollection.updateOne(
                { _id: new ObjectId(req.params.id), userId: req.user._id.toString() },
                { $set: { title: req.body.title, description: req.body.description } }
            );

            if (result.matchedCount === 0) {
                console.error("No matching document found for update.");
                return res.status(404).send("Entry not found.");
            }

            res.redirect("/results");
        } catch (error) {
            console.error("Error updating entry:", error);
            res.status(500).send("Internal Server Error");
        }
    });

    // Route to delete
    router.post("/delete/:id", isAuthenticated, async (req, res) => {
        try {
            await dataCollection.deleteOne({ _id: new ObjectId(req.params.id) });

            res.redirect("/results");

        } catch (error) {
            console.error("Error deleting data:", error);
            res.status(500).send("Something went wrong.");
        }
    });



    return router;
};
