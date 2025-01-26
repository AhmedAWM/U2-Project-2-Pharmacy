const router = require("express").Router();
const Medicine = require("../models/medicine");

router.get("/", async (req, res) => 
{
    try 
    {
        const medicines = await Medicine.find();
        const user = req.session.user;

        console.log(medicines);
        res.render("medicines/home.ejs",{ medicines: medicines, user: user });
    } 
    catch (error) 
    {
        console.log(error);
        res.status(500).send("Server Error");
    }
}); 
router.get("/new", (req, res) => 
{
    res.render("medicines/new.ejs");
});
// Sharifas tring to show the details of the medicen 

router.get("/:medicineId", async (req, res) => 
{
    try {
        //  sharifa tring to Find the medicine by its ID and populate owner information
        const foundMedicine = await Medicine.findById(req.params.medicineId);
        // i will put extra metode which shows if the pationt have some favorit medicine
    //  const userHasFavorited = foundMedicine.favoritedByUser.some(user => user.equals(req.session.user._id));

    //     console.log(foundMedicine);
    //     res.render("medicine/show.ejs", { medicine: foundMedicine, userHasFavorited: userHasFavorited });
    } 
    catch (error) 
    {
        console.log(error);
        res.status(500).send("Error fetching medicine details");
    }
});

// // iam tring to show if there is a medicines marked as "favorite" by the logged-in user
// router.get("/:userId/favorites", async (req, res) => 
// {
//     try 
//     {
//         //  Fetch all medicines that are favorited by the user
//      const favoriteMedicines = await Medicine.find({ favoritedByUser: req.params.userId }).populate("owner");

//         console.log(favoriteMedicines);
//         res.render("medicine/favorites.ejs", { medicines: favoriteMedicines });
//     }
//      catch (error) 
//     {
//         console.log(error);
//         res.status(500).send("Error fetching favorite medicines");
//     }
// });
// // i will use userId to show all medicines marked as favrites by the logged-in user
// router.get("/favorites", async (req, res) => 
// {
//     try {
//         const userId = req.session.user._id;
        
//         // iam tring to Fetch all medicines that are favorited by the user
//         const favoriteMedicines = await Medicine.find({ favoritedByUser: userId }).populate("owner");

//         res.render("medicine/favorites.ejs", { medicines: favoriteMedicines });
//     } catch (error)
//     {
//         console.log(error);
//         res.status(500).send("Error fetching favorite medicines");
//     }
// });

module.exports = router;