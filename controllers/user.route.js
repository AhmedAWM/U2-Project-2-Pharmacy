const router = require("express").Router();
const User = require("../models/user");


router.get("/", async (req, res) => 
{
    try 
    {
        const doctors = await User.find( { isDoctor: true } );
        res.render("doctors/home.ejs", { doctors });
    } 
    catch (error) 
    {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

router.get("/new", (req, res) =>
{
    res.render("doctor/new.ejs");
});

router.get("/:doctorId", async (req, res) => 
{
    try 
    {
        const foundDoctor = await User.findById(req.params.doctorId);
        res.render("doctor/show.ejs", { doctor: foundDoctor });
    } 
    catch
     (error) 
    {
        console.error(error);
        res.status(500).send("Error fetching doctor details");
    }
});

module.exports = router;
