const { request } = require('express');
const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
var fs = require('fs');
const path = require('path');
require('dotenv/config');
var imageUrl;
//const upload = multer({dest: 'uploads/'});
let Product = require('../model/product.model')
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname + '-' + Date.now() + '.png')
        imageUrl = file.originalname + '-' + Date.now() + '.png';
    }
})

var upload = multer({ storage: storage })
router.get('/product', (req, res) => {
    res.render("product/AddProduct", {
        product: ""
    });
});
router.get('/', (req, res) => {
    res.redirect('product/list');
});

router.post('/product', upload.single('myFile'), (req, res) => {
    console.log(req.body.name);
    const file = req.file
    if (!file) {
        const error = new Error('Please upload a file');
        error.httpStatusCode = 400;
        console.log("has error : " + error)
    }
    console.log("send file success : " + req.body._id);
    if (req.body._id == '')
        insertRecord(req, res);
    else
        updateRecord(req, res);
});
router.post('/product/search', (req, res) => {
    Product.find({ name: req.body.name }, (err, docs) => {
        if (!err) {
            res.render("product/ListProduct", {
                list: docs
            });
        } else {
            console.log('Error in retrieving product list :' + err);
        }
    });
});

function insertRecord(req, res) {
    const newProduct = new Product({
        name: req.body.name,
        city: req.body.city,
        price: req.body.price,
        img: {
            data: imageUrl,
            contentType: 'image/png'
        }
    });
    newProduct.save((err) => {
        if (!err) {
            console.log("insert success");
            res.redirect('product/list');
        } else {
            console.log(err);
        }
    });
}

function updateRecord(req, res) {
    Product.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('product/list'); } else {
            console.log('Error during record update : ' + err);
        }
    });
}


router.get('/product/list', (req, res) => {
    Product.find((err, docs) => {
        if (!err) {
            res.render("product/ListProduct", {
                list: docs
            });
        } else {
            console.log('Error in retrieving product list :' + err);
        }
    });
});

router.get('/product/:id', (req, res) => {
    Product.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("product/AddProduct", {
                product: doc
            });
        } else {
            console.log("Update error : " + err)
        }
    });
});

router.get('/product/delete/:id', (req, res) => {
    Product.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/product/list');
        } else { console.log('Error in product delete :' + err); }
    });
});

module.exports = router;