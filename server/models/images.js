const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
  imageData: {},
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

exports.Image = mongoose.model('Image', imageSchema);
