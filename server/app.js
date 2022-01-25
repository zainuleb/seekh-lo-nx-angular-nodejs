const express = require('express');
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//Utilities
const authJWT = require('./helpers/auth.js');
const errorHandler = require('./helpers/errorHandler.js');

const app = express();

const cors = require('cors');
require('dotenv/config');
app.use(cors());
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));
app.options('*', cors());

//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));

/* app.use(authJWT()); */
app.use(errorHandler);
//Routes Import
const coursesRoutes = require('./routes/courses');
const usersRoutes = require('./routes/users');
const categoriesRoutes = require('./routes/categories.js');

const api = process.env.API_URL;

app.use(`${api}/courses`, coursesRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/categories`, categoriesRoutes);

//Database
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log('Database Connection is ready...');
  })
  .catch((err) => {
    console.log(err);
  });

//Server
app.listen(3000, () => {
  console.log('server is running http://localhost:3000');
});
