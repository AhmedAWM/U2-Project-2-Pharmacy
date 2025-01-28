const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
{
  name:
  {
    type: String,
    required: true,
  },
  email: 
  {
    type: String,
    required: true,
    unique: true,
  },
  password: 
  {
    type: String,
    required: true,
  },
  isDoctor: 
  {
    type: Boolean,
  },
  age:
  {
    type: Number,
    required: true,
  },
  specialty: String,
  photo: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;
