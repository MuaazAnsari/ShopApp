const Product = require("../models/product");

// Taken from admin.js file
exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    isAuthenticated : req.session.isLoggedIn
  });
};

exports.postAddProduct = (req, res, next) => {
  //creating object of the class and passing the content to it and saving it.
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const price = req.body.price;
  // Utilise req.user object.   Because of the association, createproduct() is available for user .
  const product = new Product({
    title: title,
    price : price,
    description : description,
    imageUrl : imageUrl,
    userId : req.user._id
  });
  product
    .save()
    .then((result) => {
      // console.log(result);
      console.log("Inserted Product");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  // get product
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
        isAuthenticated : req.session.isLoggedIn
      });
    })
    .catch((err) => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const id = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDescription = req.body.description;
  const updatedPrice = req.body.price;
  Product.findByIdAndUpdate(id, {
    title : updatedTitle,
    price : updatedPrice,
    description : updatedDescription,
    imageUrl : updatedImageUrl,
  }, {new : true})
  .then((result) => {
        console.log("UPDATED");
        // This redirects only when the product data is updated.
        res.redirect("/admin/products");
      })
  .catch((err) => console.log(err));

};

exports.deleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByIdAndDelete(prodId)
    .then((result) => {
      console.log("DELETED SUCCESSFULLY!");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.find()
            // using select, we can select and limit the data we are getting from database.
            // In this case, we want title and price, do not want _id
    // .select('title price -_id')
          // Using populate , we can get the entire user object from the userId
    // .populate('userId')
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
        isAuthenticated : req.session.isLoggedIn
      });
    })
    .catch((err) => console.log(err));
};
