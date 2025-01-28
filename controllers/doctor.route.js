const router = require("express").Router();
const Doctor = require("../models/user");

// View all doctors
router.get("/", async (req, res) => {
    try {
        const doctors = await Doctor.find({ isDoctor: true });
        res.render("doctors/home.ejs", { doctors });
    } 
    catch (error) {
        console.error(error);
    }
});

// Add new doctor page
router.get("/new", (req, res) => {
    if(req.session.user && req.session.user.isDoctor) {
        res.render("doctors/new.ejs");
    } else {
        res.redirect("/");
    }
});

// Add new doctor
router.post("/new", async (req, res) => {
    try {
        if(req.session.user && req.session.user.isDoctor) {
            const newDoctor = req.body;
            newDoctor.isDoctor = true;
            await Doctor.create(newDoctor);

            res.redirect('/doctors');
        } else {
            res.redirect('/');
        }

    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
