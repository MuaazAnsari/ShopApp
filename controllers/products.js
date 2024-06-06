//Array to store products obtained from req.body
const products = []

// Taken from admin.js file
exports.getAddProduct = (req,res,next) => {
    res.render('add-product', {pageTitle: 'Add Product', path : '/admin/add-product'});
};

exports.postAddProduct = (req,res,next) =>{
    products.push({title : req.body.title});
    res.redirect('/');
};

// Taken From shop.js File
exports.getProducts = (req,res,next) =>{
    res.render('shop', {prods: products, pageTitle:'Shop', path: '/'});
};