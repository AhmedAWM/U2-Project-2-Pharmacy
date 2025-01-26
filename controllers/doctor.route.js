const router = require("express").Router();
const Medicine = require("../models/medicine");

router.get("/", async (req, res) => 
{
    try 
    {
        const medicines = await Medicine.find();
        res.render("doctors/home.ejs", { medicines });
    } 
    catch (error) 
    {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

router.get("/new", (req, res) => 
{
    res.render("medicine/new.ejs");
});

router.get("/:medicineId", async (req, res) => 
{
    try 
    {
        const foundMedicine = await Medicine.findById(req.params.medicineId);
        res.render("medicine/show.ejs", { medicine: foundMedicine });
    } 
    catch (error) 
    {
        console.error(error);
        res.status(500).send("Error fetching medicine details");
    }
});

module.exports = router;
