const { Int32 } = require('mongodb');
const mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    name: {
        type: String,
        require : true
    },
    price: {
        type: Number
    },
    city: {
        type: String
    },
    img: {
        data: String,
        contentType: String
    }
});

module.exports = mongoose.model('Product', productSchema);
