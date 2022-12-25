const MongoClient = require('mongodb').MongoClient
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(
        "mongodb+srv://admin:admin@cluster0.8mgr7qd.mongodb.net/test", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Database connected');
    })
    .catch((error) => {
        console.log('Error connecting to database : ' + error);
    });
require('./product.model');