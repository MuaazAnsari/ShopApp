const Product = require('../models/product');
const path = require('../util/path');


exports.getIndex = (req,res,next) =>{
    Product.fetchAll((products) =>{
        res.render('shop/index', {prods: products, pageTitle:'Shop', path: '/'});
    });
};

// Taken From shop.js File
exports.getProducts = (req,res,next) =>{
    // Fetching all products using FetchAll method of class and passing as argument in render.
    Product.fetchAll((products) =>{
        res.render('shop/product-list', {prods: products, pageTitle:'All Products', path: '/products'});
    });
    
};

exports.getCart = (req,res,next) =>{
    res.render('shop/cart', {pageTitle : 'My Cart', path:'/cart'});
};

exports.getOrders = (req,res,next) =>{
    res.render('shop/orders', {pageTitle : 'My Orders', path:'/orders'});
};

exports.getCheckout = (req,res,next) =>{
    res.render('res/checkout', {pageTitle:'Checkout', path:'/checkout'});
}

