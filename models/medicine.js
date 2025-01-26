const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema(
{
    medicinName: {
        type: String,
        required: true,
    },
    commercialName: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0,
        max: 1000,
    },
    expiryDate: {
      type: Date, 
    }
    // We must add an OWNER here, in order to show medicines that belong to a specific user
});

const Medicine = mongoose.model("Medicine", medicineSchema);

module.exports = Medicine;