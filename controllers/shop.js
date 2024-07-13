const Product = require("../models/product");
const Order = require("../models/order");

// PRODUCTS SECTION

exports.getIndex = (req, res, next) => {
  // Mongoose provides find method inbuilt
  Product.find()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
        isAuthenticated : req.session.isLoggedIn
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Taken From shop.js File
exports.getProducts = (req, res, next) => {
  // Mongoose provides find method inbuilt
  Product.find()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
        isAuthenticated : req.session.isLoggedIn
      });
    })
    .catch(() => {
      console.log(err);
    });
};

// To extract single product details using id

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  // Mongoose provides findById method inbuilt
  Product.findById(prodId)
    .then((product) => {
      // console.log(product);
      res.render("shop/product-details", {
        product: product,
        pageTitle: "Product Details",
        path: "/products",
        isAuthenticated : req.session.isLoggedIn
      });
    })
    .catch((err) => console.log(err));
};

// CART SECTION

exports.getCart = async (req, res, next) => {
  try {
    // Populate the product details in the cart items and await completion
    await req.user.populate('cart.items.productId');

    // Access the populated cart items
    const cartProducts = req.user.cart.items.map(item => {
      return {
        product: item.productId, // This will be the populated product document
        quantity: item.quantity
      };
    });
    // console.log(cartProducts);
    res.render("shop/cart", {
      pageTitle: "My Cart",
      path: "/cart",
      cartProducts: cartProducts,
      isAuthenticated : req.session.isLoggedIn
    });
  }
  catch(err){
    console.log(err);
    next(err);
  }
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((result) => {
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};

exports.deleteProductCart = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .deleteFromCart(prodId)
    .then(() => {
      console.log("DELETED PRODUCT");
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};

// ORDERS SECTION

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({'user.userId': req.user._id});
    res.render("shop/orders", {
      pageTitle: "My Orders",
      path: "/orders",
      orders: orders,
      isAuthenticated : req.session.isLoggedIn
    });
  } catch (err) {
    console.log(err);
  }
};

exports.postOrders = async (req, res, next) => {
  try {
        await req.user.populate('cart.items.productId');

        // Get cartProducts with fully populated product details
        const cartProducts = req.user.cart.items.map(item => ({
          product: { ...item.productId._doc },
          quantity: item.quantity
        }));

        // console.log(cartProducts);
      const order = new Order({
        user : {
          name : req.user.name,
          userId : req.user._id
        },
        products: cartProducts
      });

      await order.save();

      // clear Cart
      await req.user.clearCart();

      res.redirect("/orders");
   } catch(err) {
        console.log(err);
        next(err);
   }

};
