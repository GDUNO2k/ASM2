require('./model/db');
const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
  extended: true
}));
app.use(bodyparser.json());
app.use(express.static("public"));
const toyController = require('./controllers/controller');
app.listen(process.env.PORT || 3000, function() {
    console.log('listening on 3000')
  })
app.set('view engine', 'ejs');
app.use('/', toyController);