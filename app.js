const express = require('express');
const app = express();
const mongoose = require('mongoose');

const dbURI = 'mongodb+srv://stanleylol:oiuytrewedf@cluster0.hxpeu4r.mongodb.net/fcc-mongodb-and-mongoose?retryWrites=true&w=majority';

mongoose.set('strictQuery', true);
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(3000))
  .catch(err => console.log(err));

