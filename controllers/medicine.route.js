const router = require("express").Router();
const Medicine = require("../models/medicine");

// View all medicines
router.get("/", async (req, res) => {
    try {
        if(req.session.user) {
            const medicines = await Medicine.find();
            const user = req.session.user;

            res.render("medicines/home.ejs", { medicines: medicines, user: user });
        } else {
            res.redirect("/");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
}); 

// If isDoctor, go to create new medicine page
router.get("/new", (req, res) => {
    if(req.session.user) {
        if(req.session.user.isDoctor) { 
            res.render("medicines/new.ejs");
        } else {
            res.redirect('/medicines');
        }
    } else {
        res.redirect('/');
    }
});

// Create new medicine
router.post('/new', async (req, res) => {
    try {
        if(req.session.user) {
            if(req.session.user.isDoctor) {
                const newMed = req.body;

                await Medicine.create(newMed);

                res.redirect('/medicines');
            } else {
                res.redirect('/medicines');
            }
        } else {
            res.redirect('/');
        }

    } catch (error) {
        console.log(error);
    }
});

// Edit medicine page if user isDoctor
router.get('/:id/edit', async (req, res) => {
    if(req.session.user) {
        if(req.session.user.isDoctor) {
            const medicine = await Medicine.findById(req.params.id);
            res.render('medicines/edit.ejs', { medicine: medicine });
        } else {
            res.redirect('/medicines');
        }
    } else {
        res.redirect('/');
    }
});

// Edit medicine
router.put('/edit/:id', async (req, res) => {
    try {
       if(req.session.user) {
        if(req.session.user.isDoctor) {
            const medicine = await Medicine.findById(req.params.id);
            const editedMedicine = req.body;
            await Medicine.findByIdAndUpdate(req.params.id, req.body);
        }

        res.redirect('/medicines');
       } else {
        res.redirect('/');
       }
    } catch (error) {
        console.log(error);
    }
});

// Delete medicine if user isDoctor
router.delete('/:id/delete', async (req, res) => {
    try {
        if(req.session.user) {
            if(req.session.user.isDoctor) {
                await Medicine.findByIdAndDelete(req.params.id);
            }
            
            res.redirect('/medicines');
        } else {
            res.redirect('/');
        }
    } catch (e) {
        console.log(e);
    }
});

module.exports = router;