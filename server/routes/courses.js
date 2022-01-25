const { Course } = require('../models/course');
const { Category } = require('../models/category');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const multer = require('multer');

/* Image File Section */
const FILE_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg',
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error('invalid image type');

    if (isValid) {
      uploadError = null;
    }
    cb(uploadError, 'public/uploads');
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(' ').join('-');
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${extension}`);
  },
});

const uploadOptions = multer({ storage: storage });
/* Image File Section End */

//Get All Course
router.get(`/`, async (req, res) => {
  let filter = {};

  if (req.query.categories)
    filter = { category: req.query.categories.split(',') };

  const courseList = await Course.find(filter).populate('category');

  if (!courseList) {
    res.status(500).json({ success: false });
  }
  res.send(courseList);
});

//Get Course
router.get('/:id', async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send('Invalid course Id');
  }

  const course = await Course.findById(req.params.id).populate('category');

  if (!course)
    res.send(500).json({ success: false, message: 'No Such Course Exist' });

  res.status(200).send(course);
});

//Add Single Course
router.post(`/`, uploadOptions.single('image'), async (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).send('No image in the request');

  const fileName = file.filename;
  const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

  let course = new Course({
    title: req.body.title,
    description: req.body.description,
    richDescription: req.body.richDescription,
    image: `${basePath}${fileName}`,
    images: req.body.images,
    category: req.body.category,
    price: req.body.price,
    language: req.body.language,
    rating: req.body.rating,
    isFeatured: req.body.isFeatured,
  });

  course = await course.save();

  if (!course)
    return res.status(500).json({
      success: false,
      message: 'Course creation failed',
    });

  res.status(201).json(course);
});

//Update Single Course
router.put('/:id', uploadOptions.single('image'), async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send('Invalid Course Id');
  }

  const category = await Category.findById(req.body.category);
  if (!category) return res.status(400).send('Invalid Category');

  const course = await Course.findById(req.params.id);
  if (!course) return res.status(400).send('Invalid Course!');

  const file = req.file;
  let imagepath;

  if (file) {
    const fileName = file.filename;
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
    imagepath = `${basePath}${fileName}`;
  } else {
    imagepath = course.image;
  }

  const updatedCourse = await Course.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: imagepath,
      images: req.body.images,
      category: req.body.category,
      price: req.body.price,
      language: req.body.language,
      rating: req.body.rating,
      isFeatured: req.body.isFeatured,
    },
    { new: true }
  );
  if (!updatedCourse)
    return res.status(400).send('Empty Course cannot be updated');

  res.status(200).send(updatedCourse);
});

//Delete Single Course
router.delete('/:id', async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send('Invalid Course Id');
  }

  try {
    const deleteStatus = await Course.findByIdAndRemove(req.params.id);
    if (deleteStatus)
      return res.status(200).json({
        success: true,
        message: 'Course Removed Successfully',
        deleteStatus,
      });
    if (!deleteStatus)
      return res
        .status(404)
        .json({ success: true, message: 'Course Not Found' });
  } catch (err) {
    return res.status(500).json({ success: false, error: err });
  }
});

//Get Course Total Count
router.get('/get/count', async (req, res) => {
  const coursesCount = await Course.countDocuments();
  if (!coursesCount) res.send(500).json({ success: false });

  res.status(200).send({ count: coursesCount });
});

//Get Featured Course Count
router.get('/get/featured/:count', async (req, res) => {
  const count = req.params.count ? req.params.count : 0;
  console.log(typeof count);
  const coursesFeatured = await Course.find({ isFeatured: true }).limit(+count);

  if (!coursesFeatured) res.send(500).json({ success: false });

  res.status(200).send(coursesFeatured);
});

router.put(
  '/gallary-images/:id',
  uploadOptions.array('images', 10),
  async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send('Invalid Course Id');
    }

    const files = req.files;
    let imagesPaths = [];
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

    if (files) {
      files.map((file) => {
        imagesPaths.push(`${basePath}${file.fileName}`);
      });
    }

    const course = await Course.findByIdAndUpdate(
      req.params.id,
      {
        images: imagePaths,
      },
      { new: true }
    );
    if (!course) return res.status(400).send('Empty Course cannot be updated');

    res.status(200).send({ course, message: 'Course Updated' });
  }
);

module.exports = router;
