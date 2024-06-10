const Cart = require("./cart");
const db = require("../util/db");

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    return db.execute(
      'INSERT into products (title,price,description,imageUrl) VALUES (?, ?, ?, ?)' 
      , [this.title, this.price, this.description, this.imageUrl]
    );
  }

  static fetchAll() {
    //db.execute returns a promise ie if it is successful, execute then(), if it fails execute catch()
    // Here we are returning the promise so we can use the two functions somewhere else.
    return db.execute("SELECT * FROM products");
  }

  static findById(id) {
    return db.execute('SELECT * FROM products WHERE products.id = ?', [id]);
  }

  static deleteById(prodId) {}
};
