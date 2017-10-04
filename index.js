const express = require('express');

const app = express();
const port = 3000;

const bodyParser = require('body-parser');

const mongoose = require('mongoose');
mongoose.createConnection('mongodb://localhost/cats');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}))

const cats = require('./cats.js')(app);

app.listen(port, function(error) {
  if(error) return;
  console.log(`Server running on port ${3000}`)
})
