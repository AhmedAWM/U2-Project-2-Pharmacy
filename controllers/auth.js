// Imports
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

// Models
const User = require("../models/user");

// Routes
// Signin page
router.get("/signin", (req, res) => {
    if (req.session.user) {
      res.redirect("../../"); // Go to homepage
    } else {
      res.render("../auth/signin.ejs", { user: null });
    }
});

// Signin
router.post('/signin', async (req, res) => {
  try {
    const signinInfo = req.body;
    const userExists = await User.findOne({ email: signinInfo.email });

    if(!userExists) {
      res.send("Login failed!");
      return;
    }

    const signinPassword = bcrypt.compareSync(signinInfo.password, userExists.password);

    if(!signinPassword) {
      res.send("Login failed!");
      return;
    }

    // If all above is valid, create login session
    req.session.user = {
      name: userExists.name,
      email: userExists.email,
      _id: userExists._id,
    };

    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

// Signup page
router.get("/signup", (req, response) => {
    if (req.session.user) {
      res.redirect("../../"); // Go to homepage
    } else {
      res.render("../auth/signup.ejs", { user: null });
    }
});

// Create new user
router.post("/signup", async (request, response) => {
    try {
      const signupInfo = req.body;
      const userExists = await User.findOne({ email: signupInfo.email });

        // Check if the passwords matches
        if (signupInfo.password !== signupInfo.confirmPassword) {
            // Alert
            return;
        }
  
        // Check if user exists
        if (userExists) {
            // Alert
            return;
        }
  
        // If all good, create new user
        // Encrypt the password
        const hashedPassword = await bcrypt.hash(signupInfo.password, 11);
        signupInfo.password = hashedPassword;
    
        // Create the user
        await User.create(signupInfo);
    
        // Redirect to signin page
        response.redirect("/auth/signin");
    } catch (error) {
      console.log(error);
    }
});

// Signout
router.get("/signout", (req, response) => {
    try {
      req.session.destroy();
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
});

module.exports = router;
