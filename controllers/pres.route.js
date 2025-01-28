const router = require("express").Router();
const Pres = require("../models/pres");
const User = require("../models/user");
const Medicine = require("../models/medicine");

// View all prescriptions
router.get("/", async (req, res) => {
    try {
        let allPres;
        let pres = [];
        if(req.session.user) {
            if(req.session.user.isDoctor) {
                allPres = await Pres.find( { doctor: req.session.user._id } );
            } else { // If patient
                allPres = await Pres.find({ patient: req.session.user._id });
            }

            for(let i = 0; i < allPres.length; ++i) {
                const patient = await User.findById(allPres[i].patient);
                const doctor = await User.findById(allPres[i].doctor);
                const medicine = await Medicine.findById(allPres[i].medications);
                const id = allPres[i].id;
                const issueDate = allPres[i].issueDate.toISOString().split('T')[0];
                const instructions = allPres[i].instructions;

                pres.push({ id: id, patient: patient.name, doctor: doctor.name, medicine: medicine.commercialName, issueDate: issueDate, instructions: instructions});
            };

            res.render("pres/home.ejs", { pres: pres, user: req.session.user });
        } else {
            res.redirect("/");
        }
    } catch (error) {
        console.log(error);
    }
}); 

// If isDoctor, go to create new prescrition page
router.get("/new", async (req, res) => {
    if(req.session.user && req.session.user.isDoctor) {
        const patients = await User.find({ isDoctor: false }); // Retreive all patients
        const medicines = await Medicine.find();

        res.render("pres/new.ejs", { patients: patients, medicines: medicines });
    } else {
        res.redirect('/');
    }
});

// Create new prescription
router.post('/new', async (req, res) => {
    try {
        if(req.session.user && req.session.user.isDoctor) {
            const newPres = req.body;

            newPres.doctor = req.session.user._id; // Doctor's ID

            await Pres.create(newPres);

            res.redirect('/pres');
        } else {
            res.redirect('/');
        }

    } catch (error) {
        console.log(error);
    }
});

// Delete prescription if user isDoctor
router.delete('/:id/delete', async (req, res) => {
    try {
        if(req.session.user && req.session.user.isDoctor) {
            await Pres.findByIdAndDelete(req.params.id);
            res.redirect('/pres');
        } else {
            res.redirect('/');
        }
    } catch (e) {
        console.log(e);
    }
});

module.exports = router;