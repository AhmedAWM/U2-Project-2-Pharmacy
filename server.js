// Import NPMs
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const methodOverride = require("method-override");
const session = require("express-session");

// Import controllers
const authController = require("./controllers/auth");
const medicineController = require("./controllers/medicine.route");
const doctorController = require("./controllers/doctor.route")
//const presController = require('./controllers/pres');

// Inizializations
const app = express();
dotenv.config();

// Models
const User = require("./models/user");
const Medicine = require("./models/medicine");
// Middlewares
app.use(express.static("public")); // Load images and static files in pages with "public" directory
app.use(express.urlencoded({ extended: false })); // Allow to transfer the objects to another route through request.body
app.use(methodOverride("_method")); // Allow PUT/DELETE in forms
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
);
const isSignedIn = require("./middleware/is-signed-in.js"); 
const passUserToView = require("./middleware/pass-user-to-view.js"); // Pass "user model" to all views, important for the navbar functionality

// DB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((e) => {
    console.log("Error connecting to DB", e);
  });

// Routes and files
app.use(passUserToView)
app.use("/auth", authController);

// Home page
app.get("/", async(req, res) => {
    // This code makes sure that a signed-in user wont see the welcome page, 
    // since the welcome page is for guest users only.    
  try 
  {
      if(req.session.user) {
        const medicines = await Medicine.find();
        const user = req.session.user;

        res.render("home.ejs",{ medicines: medicines, user: user });
      } else {
        res.render("../auth/signin.ejs", { user: null });
      }
  } 
  catch (error) 
  {
      console.log(error);
  }
});

app.use("/medicines", medicineController);

app.use("/doctors", doctorController);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
