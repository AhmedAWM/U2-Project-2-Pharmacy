const pharmasys = require("mongoose");

const pharmacySchema = new pharmasys.Schema(
    {
    price: 
    {
        type: Number,
        required: true,
        min: 0
    },
    commercialName:
    {
        type: Number,
        required: true,
    } ,
    medicinName:
    {
        type: Number,
        required: true,
    } 

});

const Pharmacy = pharmasys.model("Pharmacy", pharmacySchema);

module.exports = Pharmacy;
