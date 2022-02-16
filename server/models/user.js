const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please Enter your Name'],
    maxlength: [30, 'Your Name cannot exceed 30 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please Enter Your Email'],
  },
  passwordHash: {
    type: String,
    required: [true, 'Please Enter Your Password'],
  },
  contact: {
    type: String,
    default: '',
  },
  profilePicture: {
    type: String,
    default: '',
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  street: { type: String, default: '' },
  house: { type: String, default: '' },
  city: { type: String, default: '' },
  state: { type: String, default: '' },
  country: { type: String, default: '' },
  zip: { type: String, default: '' },
  role: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

userSchema.set('toJSON', {
  virtuals: true,
});

exports.User = mongoose.model('User', userSchema);
