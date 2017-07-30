const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const expressValidator = require('express-validator')
const dbConfig = require('./config/db');
var cors = require('cors')

const app = express();

const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(cors())

MongoClient.connect(dbConfig.url, (err, database) => {
  if (err) return console.log(err)
  require('./routes')(app, database);
  app.listen(port, () => {
    console.log('Aplication started on port' + port);
  });               
})