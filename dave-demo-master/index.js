require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const mongoose = require('mongoose'); 
const Routes = require('./routes/routes');
const fetch = require('node-fetch');
const secret = require('./secret')
const multer = require('multer')
const upload = multer({ dest: 'images/' })
const Recipes = require('./models/recipe');
const { EnvironmentCredentials } = require('aws-sdk');

const app = express();
app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'client', 'build')));
}
app.get('/test', (req, res) => res.send('howdy doody'));


mongoose.connect('mongodb+srv://david:alisacara1@cluster0.mggk8.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then((result) => app.listen(process.env.PORT))
  .then(res => console.log(`Server running on http://localhost:${process.env.PORT}`))
  .catch((err) => console.log(err));

  app.use(Routes);
