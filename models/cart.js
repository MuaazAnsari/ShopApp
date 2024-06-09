const fs = require("fs");
const path = require("path");
const rootDir = require("../util/path");
const p = path.join(rootDir, "data", "cart.json");

module.exports = class Cart {


  static addProduct(id, productPrice) {
    // step 1 Fetch the Previous cart
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      // step 2 Analyse the cart  => find existing product
      const existingProductIndex = cart.products.findIndex((p) => p.id === id);
      const existingProduct = cart.products[existingProductIndex];
      // step 3  If product is new, add it. if it is existing, then increase the quantity
      let updatedProduct;
      if (existingProduct) {
        updatedProduct = { ...existingProduct }; //spread operator used to copy the object
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }

      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }



  static deleteProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      if(err){
        return;
      }

      const updatedCart = {...JSON.parse(fileContent)};
      const product = updatedCart.products.find((p) => p.id === id);
      const productQty = product.qty;
      updatedCart.products = updatedCart.products.filter(p => p.id !== id);
      updatedCart.totalPrice = updatedCart.totalPrice - productQty * productPrice;
      fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
        console.log(err);
      });
    });
}

  static getCart(cb){
    fs.readFile(p, (err, fileContent) => {
      if(err){
        cb(null);
      }
      else{
      const cart = JSON.parse(fileContent);
      cb(cart);
      }
  });
}

};
