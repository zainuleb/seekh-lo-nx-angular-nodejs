const mongoose = require('mongoose');

const enrollSchema = mongoose.Schema({
  coursesEnrolled: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
    },
  ],
});
