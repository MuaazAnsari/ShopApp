const Product = require("../models/product");

// Taken from admin.js file
exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
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
    imageUrl : imageUrl
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
      });
    })
    .catch((err) => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const id = req.body.productId;
  console.log(id);
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDescription = req.body.description;
  const updatedPrice = req.body.price;
  const product = new Product(
    updatedTitle,
    updatedPrice,
    updatedDescription,
    updatedImageUrl,
    id
  );
  // The return product.save(); statement ensures that the next .then() block will only execute after the save Promise resolves.
  //The return statement within the .then block controls the flow of asynchronous operations.
  // Code execution waits for the save operation to complete before moving on to the next .then block.
  product
    .save()
    .then((result) => {
      console.log("UPDATED");
      // This redirects only when the product data is updated.
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

exports.deleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteById(prodId)
    .then((result) => {
      // console.log(result);
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => console.log(err));
};
