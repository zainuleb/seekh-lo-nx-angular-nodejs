const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please Enter Course Description'],
    trim: true,
    maxlength: [100, 'Service Title cannot exceed 100 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please Enter Course Description'],
    trim: true,
    maxlength: [300, 'Description cannot exceed 300 characters'],
  },
  richDescription: {
    type: String,
    required: [true, 'Please Enter Course Rich Description'],
    trim: true,
    maxlength: [1000, 'Rich Description cannot exceed 1000 characters'],
  },
  image: {
    type: String,
    default: '',
  },
  images: [
    {
      type: String,
    },
  ],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  price: {
    type: Number,
    required: [true, 'Please Enter Course Price'],
    default: 0,
  },
  language: {
    type: String,
    required: [true, 'Please Enter Course Language'],
  },
  rating: {
    type: Number,
    default: 0,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  /*   numReviews: {
    type: Number,
    default: 0,
  },
   */
  createdAt: {
    type: Date,
    default: Date.now,
  },

  /*  
learningGoals: [
    {
      name: {
        type: String,
        required: true,
      },
    },
  ],
  requirements: [
    {
      name: {
        type: String,
        required: true,
      },
    },
  ],
  details: {
    type: String,
    required: true,
  },
  courseFor: [
    {
      name: {
        type: String,
        required: true,
      },
    },
  ],
  content: [
    {
      section: [
        {
          file: {
            type: String,
            required: true,
          },
        },
        counts,
      ],
    },
  ], */
});

courseSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

courseSchema.set('toJSON', {
  virtuals: true,
});

exports.Course = mongoose.model('Course', courseSchema);
