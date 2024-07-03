const Product = require("../models/product");

exports.getIndex = (req, res, next) => {
  // Mongoose provides find method inbuilt
  Product.find()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
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
      });
    })
    .catch((err) => console.log(err));
};

exports.getCart = (req, res, next) => {
  req.user.getCart().then((products) => {
    res.render("shop/cart", {
      pageTitle: "My Cart",
      path: "/cart",
      cartProducts: products,
    });
  });

  // req.user.getCart()
  //       .then((products) => {
  //         res.render("shop/cart", {
  //           pageTitle: "My Cart",
  //           path: "/cart",
  //           cartProducts: products,
  //         });
  //       })
  //       .catch((err) => console.log(err));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((result) => {
      // console.log(result);
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
  // let fetchedCart;
  // let newQuantity = 1;

  // // getting a cart for a user
  // req.user
  //   .getCart()
  //   .then((cart) => {
  //     fetchedCart = cart;
  //     return cart.getProducts({ where: { id: prodId } });
  //   })
  //   .then((products) => {
  //     let product;
  //     if (products.length > 0) {
  //       product = products[0];
  //     }

  //     if (product) {
  //       //.. if product exists in cart
  //       const oldQuantity = product.cartItem.quantity;
  //       newQuantity = oldQuantity + 1;
  //       return product;
  //     }
  //     //else
  //     return Product.findByPk(prodId);
  //   })
  //   .then((product) => {
  //     return fetchedCart.addProduct(product, {
  //       through: { quantity: newQuantity },
  //     });
  //   })
  //   .then(() => {
  //     res.redirect("/cart");
  //   })
  //   .catch((err) => console.log(err));
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

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await req.user.getOrders();
    console.log(orders);
    res.render("shop/orders", {
      pageTitle: "My Orders",
      path: "/orders",
      orders: orders,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.postOrders = async (req, res, next) => {
  req.user.addOrder()
    .then((result) => {
      res.redirect("/orders");
    })
    .catch((err) => console.log(err));
};
