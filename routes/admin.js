const path = require('path');
const rootDir = require('../util/path');

const express = require('express');

const router = express.Router();

//Array to store products obtained from req.body
const products = []

// There can be same path but the method( GET or POST) needs to be different

// GET requests to /admin/add-product
router.get('/add-product', (req,res,next) => {
    res.render('add-product', {pageTitle: 'Add Product', path : '/admin/add-product'});
});

// POST requests to /admin/add-product
router.post('/add-product', (req,res,next) =>{
    products.push({title : req.body.title});
    res.redirect('/');
});


exports.routes = router;
exports.products = products;