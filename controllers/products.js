const Product = require('../models/product');

// Taken from admin.js file
exports.getAddProduct = (req,res,next) => {
    res.render('add-product', {pageTitle: 'Add Product', path : '/admin/add-product'});
};

exports.postAddProduct = (req,res,next) =>{
    //creating object of the class and passing the title to it and saving it.
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
};

// Taken From shop.js File
exports.getProducts = (req,res,next) =>{
    // Fetching all products using FetchAll method of class and passing as argument in render.
    const products = Product.fetchAll((products) =>{
        res.render('shop', {prods: products, pageTitle:'Shop', path: '/'});
    });
    
};