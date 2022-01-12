const { Category } = require('../models/category.js');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const categoryList = await Category.find();
  if (!categoryList) res.send(500).json({ success: false });

  res.status(200).send(categoryList);
});

router.get('/:id', async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category)
    res.send(500).json({ success: false, message: 'No Such Category Exist' });

  res.status(200).send(category);
});

router.post('/', async (req, res) => {
  let category = new Category({
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color,
  });

  category = await category.save();

  if (!category)
    return res.status(400).send('Empty Category cannot be created');

  res.status(200).send(category);
});

router.put('/:id', async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      icon: req.body.icon || category.icon,
      color: req.body.color,
    },
    { new: true }
  );
  if (!category)
    return res.status(400).send('Empty Category cannot be updated');

  res.status(200).send(category);
});

router.delete('/:id', async (req, res) => {
  try {
    const deleteStatus = await Category.findByIdAndRemove(req.params.id);
    if (deleteStatus)
      return res.status(200).json({
        success: true,
        message: 'Category Removed Successfully',
        deleteStatus,
      });
    if (!deleteStatus)
      return res
        .status(404)
        .json({ success: true, message: 'Category Not Found' });
  } catch (err) {
    return res.status(500).json({ success: false, error: err });
  }
});

module.exports = router;
