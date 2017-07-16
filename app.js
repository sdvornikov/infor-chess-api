const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const expressValidator = require('express-validator')
const db             = require('./config/db');

const app            = express();

const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err)
  require('./routes')(app, database);
  app.listen(port, () => {
    console.log('Aplication started on port' + port);
  });               
})