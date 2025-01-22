const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const Pharmacy = require('../models/pharmacy.js'); // We should cheack this Link

router.get('/sign-up', (req, res) =>
{
  res.render('auth/sign-up.ejs');
});

router.get('/sign-in', (req, res) =>
{
  res.render('auth/sign-in.ejs');
});

/* Sign out, destroying the session for pharmacy - So i will explain this in shourt this code logs the 
pharmacy out and then takes them back to the homepage.*/
router.get('/sign-out', (req, res) => 
{
  req.session.destroy();
  res.redirect('/');
});

// Handle pharmacy sign-up
router.post('/sign-up', async (req, res) => 
{
  try {
    // Here iam tring to check if the pharmacy name or email is already taken
    const pharmacyInDatabase = await Pharmacy.findOne({ email: req.body.email });
    if (pharmacyInDatabase) 
    {
      return res.send('Email is already registered.');
    }

    // Ensure the passwords match
    if (req.body.password !== req.body.confirmPassword) 
    {
      return res.send('Password and Confirm Password must match');
    }

    // Hash the password before storing it in the database for more secuir
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hashedPassword;

    await Pharmacy.create(req.body);

    res.redirect('/auth/sign-in');
  }
   catch (error) 
   {
    console.log(error);
    res.redirect('/');
  }

});

router.post('/sign-in', async (req, res) => 
{
  try {
    const pharmacyInDatabase = await Pharmacy.findOne({ email: req.body.email });
    if (!pharmacyInDatabase) 
    {
      return res.send('Login failed. Please try again.');
    }

    // Checking using bcrypt
    const validPassword = bcrypt.compareSync
    (
      req.body.password,
      pharmacyInDatabase.password
    );
    if (!validPassword) 
    {
      return res.send('Login failed. Please try again.');
    }
    /*Create a session for the logged-in pharmacy---- This code logs the pharmacy in by saving their name 
    and ID, and then takes them to the homepage. If there's a mistake, it catches the error and sends them
     back to the homepage.*/
    req.session.pharmacy = 
    {
      pharmacyName: pharmacyInDatabase.pharmacyName,
      _id: pharmacyInDatabase._id
    };

    res.redirect('/');
  }
   catch (error) 
  {
    console.log(error);
    res.redirect('/');
  }
});

module.exports = router;
