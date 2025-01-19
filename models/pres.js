const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema
(
{
  patient: 
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  medications: 
  {
    type: String, 
    required: true,
  },
  dosage: 
  {
    type: String,
    required: true,
  },
  doctor: 
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  issueDate: 
  {
    type: Date,
    default: Date.now,
  },
  expirationDate: 
  {
    type: Date, 
  },
  instructionsForThePation: 
  {
    type: String,
  },
});

const Prescription = mongoose.model('Prescription', prescriptionSchema);

module.exports = Prescription;



