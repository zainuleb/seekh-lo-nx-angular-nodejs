const { User } = require('../models/user.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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

//Get All Users
router.get(`/`, async (req, res) => {
  const userList = await User.find().select('-passwordHash');

  if (!userList) {
    res.status(500).json({ success: false });
  }
  res.send(userList);
});

router.post(`/`, uploadOptions.single('profilePicture'), async (req, res) => {
  const file = req.file;
  const fileName = file.filename;
  const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

  try {
    let user = new User({
      name: req.body.name,
      email: req.body.email,
      passwordHash: bcrypt.hashSync(req.body.passwordHash, 10),
      contact: req.body.contact,
      profilePicture: `${basePath}${fileName}`,
      isAdmin: req.body.isAdmin,
      street: req.body.street,
      house: req.body.house,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      zip: req.body.zip,
      role: req.body.role,
    });

    user = await user.save();

    if (!user)
      return res.status(500).json({
        success: false,
        message: 'Registration Failed',
      });

    res.status(201).send({ user, message: 'User Created' });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error,
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-passwordHash');

    if (!user)
      return res
        .status(500)
        .send({ success: false, message: 'No Such User Exist' });

    res.status(200).send(user);
  } catch (error) {
    return res.status(401).send({ success: false, message: error });
  }
});

router.put('/:id', async (req, res) => {
  const userExist = User.findById(req.params.id);
  let newPassword;

  if (userExist) newPassword = bcrypt.hashSync(req.body.passwordHash, 10);
  else newPassword = userExist.passwordHash;

  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      email: req.body.email,
      passwordHash: newPassword,
      contact: req.body.contact,
      isAdmin: req.body.isAdmin,
      street: req.body.street,
      house: req.body.house,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      zip: req.body.zip,
      role: req.body.role,
    },
    { new: true }
  );
  if (!user) return res.status(400).send('Empty User cannot be updated');

  res.status(200).send({ user, message: 'User Updated' });
});

router.delete('/:id', async (req, res) => {
  try {
    const deleteStatus = await User.findByIdAndRemove(req.params.id);
    if (deleteStatus)
      return res.status(200).json({
        success: true,
        message: 'User Removed Successfully',
        deleteStatus,
      });
    if (!deleteStatus)
      return res.status(404).json({ success: true, message: 'User Not Found' });
  } catch (err) {
    return res.status(500).json({ success: false, error: err });
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res
        .status(500)
        .send({ success: false, message: 'Email not Registered' });

    if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
      const token = jwt.sign(
        { userId: user.id, isAdmin: user.isAdmin },
        process.env.userTokenSecretKey,
        { expiresIn: '1d' }
      );
      return res
        .status(200)
        .send({ success: true, user: user.email, token: token });
    } else
      return res
        .status(401)
        .send({ success: false, message: 'Password Incorrect' });
  } catch (error) {
    return res.status(400).send({ success: false, error });
  }
});

router.get('/get/count', async (req, res) => {
  const userCount = await User.countDocuments();
  if (!userCount) res.send(500).json({ success: false });

  res.status(200).send({ userCount: userCount });
});

module.exports = router;
