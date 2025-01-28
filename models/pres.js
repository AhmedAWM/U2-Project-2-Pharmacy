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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Medicine',
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
  instructions: 
  {
    type: String,
  },
});

const Prescription = mongoose.model('Prescription', prescriptionSchema);

module.exports = Prescription;



