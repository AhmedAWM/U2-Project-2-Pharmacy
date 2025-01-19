// Imports
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

// Models
const User = require("../models/user");

// Routes
// Signin
router.get("/signin", (request, response) => {
    if (request.session.user) {
      response.redirect("../../"); // Go to homepage
    } else {
      response.render("../auth/signin.ejs", { user: null });
    }
});

// Signup page
router.get("/signup", (request, response) => {
    if (request.session.user) {
      response.redirect("../../"); // Go to homepage
    } else {
      response.render("../auth/signup.ejs", { user: null });
    }
});

// Create new user
router.post("/signup", async (request, response) => {
    try {
      const signupInfo = request.body;
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
    } catch (e) {
      console.log(e);
    }
});

// Signout
router.get("/signout", (request, response) => {
    try {
      request.session.destroy();
      response.redirect("/");
    } catch (e) {
      console.log(e);
    }
});

module.exports = router;