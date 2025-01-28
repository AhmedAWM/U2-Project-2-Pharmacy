const router = require("express").Router();
const bcrypt = require("bcrypt");
const Doctor = require("../models/user");
const Pres = require('../models/pres');

// View all doctors for all users
router.get("/", async (req, res) => {
    try {
        const doctors = await Doctor.find({ isDoctor: true });
        res.render("doctors/home.ejs", { doctors });
    } catch (error) {
        console.error(error);
    }
});

// Add new doctor page if user isDoctor
router.get("/new", (req, res) => {
    if(req.session.user && req.session.user.isDoctor) {
        res.render("doctors/new.ejs");
    } else {
        res.redirect("/");
    }
});

// Add new doctor if user isDoctor
router.post("/new", async (req, res) => {
    try {
        if(req.session.user && req.session.user.isDoctor) {
            const newDoctor = req.body;
            newDoctor.isDoctor = true;

            const hashedPassword = await bcrypt.hash(newDoctor.password, 11);
            newDoctor.password = hashedPassword;;

            await Doctor.create(newDoctor);

            res.redirect('/doctors');
        } else {
            res.redirect('/');
        }

    } catch (error) {
        console.log(error);
    }
});

// Edit doctors page
router.get('/:id/edit', async (req, res) => {
    if(req.session.user && req.session.user.isDoctor) {
        const doctor = await Doctor.findById(req.params.id);
        res.render('doctors/edit.ejs', { doctor: doctor});
    } else {
        res.redirect('/');
    }
});

// Edit doctors if user isDoctor
router.put('/edit/:id', async (req, res) => {
    try {
       if(req.session.user && req.session.user.isDoctor) {
        const doctor = await Doctor.findById(req.params.id);
        const editedDoctor = req.body;

        // Encrypt password
        const hashedPassword = await bcrypt.hash(editedDoctor.password, 11);
        editedDoctor.password = hashedPassword;

        await Doctor.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/doctors');
       } else {
        res.redirect('/');
       }
    } catch (error) {
        console.log(error);
    }
});

// Delete doctors if user isDoctor
router.delete('/:id/delete', async (req, res) => {
    try {
        if(req.session.user && req.session.user.isDoctor) {
            await Doctor.findByIdAndDelete(req.params.id);
            await Pres.deleteMany({ doctor: req.params.id })
            res.redirect('/doctors');
        } else {
            res.redirect('/');
        }
    } catch (e) {
        console.log(e);
    }
});
module.exports = router;