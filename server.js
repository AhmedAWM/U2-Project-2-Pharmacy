// Import NPMs
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const methodOverride = require("method-override");
const session = require("express-session");

// Import controllers
const authController = require("./controllers/auth");
const medicineController = require("./controllers/auth");
//const presController = require('./controllers/pres');

// Inizializations
const app = express();
dotenv.config();

// Models
const User = require("./models/user");

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
app.use("/auth", authController);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});