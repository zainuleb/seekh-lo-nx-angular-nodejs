const { Course } = require('../models/course');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

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

router.get('/:id', async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send('Invalid Product Id');
  }

  const course = await Course.findById(req.params.id).populate('category');

  if (!course)
    res.send(500).json({ success: false, message: 'No Such Course Exist' });

  res.status(200).send(course);
});

router.post(`/`, async (req, res) => {
  let course = new Course({
    title: req.body.title,
    description: req.body.description,
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

router.put('/:id', async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send('Invalid Product Id');
  }

  const course = await Course.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      language: req.body.language,
      rating: req.body.rating,
      isFeatured: req.body.isFeatured,
    },
    { new: true }
  );
  if (!course) return res.status(400).send('Empty Course cannot be updated');

  res.status(200).send({ course, message: 'Course Updated' });
});

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

router.get('/get/count', async (req, res) => {
  const coursesCount = await Course.countDocuments();
  if (!coursesCount) res.send(500).json({ success: false });

  res.status(200).send({ count: coursesCount });
});

router.get('/get/featured/:count', async (req, res) => {
  const count = req.params.count ? req.params.count : 0;
  console.log(typeof count);
  const coursesFeatured = await Course.find({ isFeatured: true }).limit(+count);

  if (!coursesFeatured) res.send(500).json({ success: false });

  res.status(200).send(coursesFeatured);
});

module.exports = router;
