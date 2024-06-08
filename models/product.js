const fs = require("fs");
const path = require("path");

const rootDir = require("../util/path");

const p = path.join(rootDir, "data", "products.json");

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    //adding unique id to the product
    this.id = Math.random().toString();
    fs.readFile(p, (err,fileContent) => {
        //initialise empty array
        let products = [];
        //if no error, ie there is some data in JSON file. Then retreive the JSON format and convert it to array or object.
        if(!err){
          console.log('Hi')
            products = JSON.parse(fileContent);
        }
        //push current object to the array.
        products.push(this);
        //write the data in a JSON file by converting it to JSON
        fs.writeFile(p, JSON.stringify(products), (err) =>{
            console.log(err);
        });
    });
  }

  //since fetchALL() doesnt return any stuff, so we need to pass , a callback function to fetchALL which executes asynchronously.
  static fetchAll(cb) {
    fs.readFile(p, (err, fileContent) =>{
        if(err){
            cb([]);
        }
        cb(JSON.parse(fileContent));
    });
}

// function to find product by id to get its details.
static findById(id, cb){
    this.fetchAll(products => {
      const product = products.find(p => p.id === id);
      cb(product);
    });
}

};
