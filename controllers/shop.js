const Product = require('../models/product');
const Cart = require('../models/cart');
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

// To extract single product details using id

exports.getProduct = (req,res,next) =>{
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        res.render('shop/product-details', {product : product , pageTitle:'Product Details', path:'/products'});
    })
    
}

exports.getCart = (req,res,next) =>{
    res.render('shop/cart', {pageTitle : 'My Cart', path:'/cart'});
};

exports.getOrders = (req,res,next) =>{
    res.render('shop/orders', {pageTitle : 'My Orders', path:'/orders'});
};

exports.postCart = (req,res,next) =>{
    const prodId = req.body.productId;
    // obtain the product by taking the above id using findBYId in product model
    Product.findById(prodId, (product) => {
        Cart.addProduct(product.id, product.price);
    })
    res.redirect('/cart');
}

exports.getCheckout = (req,res,next) =>{
    res.render('res/checkout', {pageTitle:'Checkout', path:'/checkout'});
}

