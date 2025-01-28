const router = require("express").Router();
const Medicine = require("../models/medicine");

// View all medicines
router.get("/", async (req, res) => {
    try 
    {
        if(req.session.user) {
            const medicines = await Medicine.find();
            const user = req.session.user;

            res.render("medicines/home.ejs",{ medicines: medicines, user: user });
        } else {
            res.redirect("/");
        }
    } 
    catch (error) 
    {
        console.log(error);
        res.status(500).send("Server Error");
    }
}); 

// If isDoctor, go to create new medicine page
router.get("/new", (req, res) => {
    if(req.session.user && req.session.user.isDoctor) {
        res.render("medicines/new.ejs");
    } else {
        res.redirect('/');
    }
});

// Create new medicine
router.post('/new', async (req, res) => {
    try {
        if(req.session.user && req.session.user.isDoctor) {
            const newMed = req.body;

            await Medicine.create(newMed);

            res.redirect('/');
        } else {
            res.redirect('/');
        }

    } catch (error) {
        console.log(error);
    }
});

// Sharifas tring to show the details of the medicen 
router.get("/:id", async (req, res) => {
    try {
        //  sharifa tring to Find the medicine by its ID and populate owner information
        const foundMedicine = await Medicine.findById(req.params.id);
    } 
    catch (error) 
    {
        console.log(error);
        res.status(500).send("Error fetching medicine details");
    }
});

// Edit medicine page if user isDoctor
router.get('/:id/edit', async (req, res) => {
    if(req.session.user) {
        const medicine = await Medicine.findById(req.params.id);
        res.render('medicines/edit.ejs', { medicine: medicine});
    } else {
        res.redirect('/medicines');
    }
});

// Edit medicine
router.put('/edit/:id', async (req, res) => {
    try {
       if(req.session.user) {
        const medicine = await Medicine.findById(req.params.id);
        const editedMedicine = req.body;

        await Medicine.findByIdAndUpdate(req.params.id, req.body);
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
        await Medicine.findByIdAndDelete(req.params.id);
        res.redirect('/medicines');
    } catch (e) {
        console.log(e);
    }
});

module.exports = router;