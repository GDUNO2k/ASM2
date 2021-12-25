const MongoClient = require('mongodb').MongoClient
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb+srv://duongvabop2000:17082000@cluster0.hidub.mongodb.net/Database?retryWrites=true&w=majority",
   { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> {
    console.log('Database connected');
  })
  .catch((error)=> {
    console.log('Error connecting to database : ' + error);
  });
  require('./product.model');