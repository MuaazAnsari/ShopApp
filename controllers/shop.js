const Product = require("../models/product");
const Cart = require("../models/cart");
const path = require("../util/path");

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
  .then(([rows, metaData]) => {  
    // Here rows is an array of object which contains the object values such as [{id : 1}] etc.
    // fieldData contains the meta data information such as Data type , primary key etc. 
    res.render("shop/index", { prods: rows, pageTitle: "Shop", path: "/" });
  })
  .catch((err) => {
    console.log(err);
  })
};

// Taken From shop.js File
exports.getProducts = (req, res, next) => {
  Product.fetchAll()
  .then(([rows, metaData]) => {
    res.render("shop/product-list", {
      prods: rows,
      pageTitle: "All Products",
      path: "/products",
  })
  })
  .catch(() => {
    console.log(err);
  });
  
};

// To extract single product details using id

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
  .then(([product]) => {
    console.log(product);
    res.render("shop/product-details", {
      product: product[0],
      pageTitle: "Product Details",
      path: "/products",
  })

})
  .catch(err => console.log(err));
};

exports.getCart = (req, res, next) => {
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];
      for (product of products) {
        //check if the product is in cart as well or not.
        const cartProduct = cart.products.find(
          (prod) => prod.id === product.id
        );
        if (cartProduct) {
          cartProducts.push({ productData: product, qty: cartProduct.qty });
        }
      }
      res.render("shop/cart", {
        pageTitle: "My Cart",
        path: "/cart",
        cartProducts: cartProducts,
      });
    });
  });
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", { pageTitle: "My Orders", path: "/orders" });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  // obtain the product by taking the above id using findBYId in product model
  Product.findById(prodId, (product) => {
    Cart.addProduct(product.id, product.price);
  });
  res.redirect("/cart");
};

exports.deleteProductCart = (req,res,next) =>{
  const prodId = req.body.productId;

  Product.findById(prodId, product => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
  })
};


exports.getCheckout = (req, res, next) => {
  res.render("res/checkout", { pageTitle: "Checkout", path: "/checkout" });
};
