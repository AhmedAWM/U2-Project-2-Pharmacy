const mongoose = require("mongoose");

const medicineSchema = new pharmasys.Schema(
{
    medicinName:
    {
        type: String,
        required: true,
    },
    commercialName:
    {
        type: String,
        required: true,
    },
    price: 
    {
        type: Number,
        required: true,
        min: 0,
        max: 1000,
    },
    expirationDate: 
    {
      type: Date, 
    },
});

const Medicine = mongoose.model("Medicine", medicineSchema);

module.exports = Medicine;
