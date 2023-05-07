const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  nama: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    default: true
  },
  phone: {
    type: String,
    default: null
  },
  alamat: {
    type: String,
    default: null
  }
}, { timestamps: true });

module.exports = mongoose.model('user', userSchema)
