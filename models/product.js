const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title : {
    type : String,
    required : true
  },

  price : {
    type : Number,
    required : true
  },

  description : {
    type : String,
    required : true
  },

  imageUrl : {
    type : String,
    required : true
  }

});

module.exports = mongoose.model('Product', productSchema);








// const getDb = require("../util/db").getDb;
// const mongodb = require('mongodb');

// class Product {
//   constructor(title, price, description, imageUrl,id, userId) {
//     this.title = title;
//     this.price = price;
//     this.description = description;
//     this.imageUrl = imageUrl;
//     // You need a check wether the id is defined  or is null. 
//     //  Before ternary operator, we were always creating an id and passing it, even though it was null.
//     // WHich in save() function was for update.
//     this._id = id ? new mongodb.ObjectId(id) : null;
//     this.userId = userId;
//   }

//   save() {
//     const db = getDb();
//     let dbOp;
//     if (this._id) {
//         dbOp = db
//             .collection('products')
//             .updateOne(
//                 { _id: this._id },
//                 { $set: this }
//             );
//     } else {
//         dbOp = db.collection('products').insertOne(this);
//     }
//     return dbOp
//         .then((result) => {
//             console.log(result);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// }


// static findById(prodId){
//   const db = getDb();
//   // In MongoDb the id is stored as a New datatype called as ObjectId. 
//   // SO in the below statement we ca'nt compare _id with a string ie prodId.
//   // So we need to convert prodId to that format ie ObjectId 
//   //    /***  IMPORTANT */
//   // findOne() returns the document itself not the cursor object like find()
//   // so we need not convert it to an array . 
//   return db.collection('products').findOne({_id : new mongodb.ObjectId(prodId)})
//   .then(product => {
//     console.log(product);
//     return product;
//   })
//   .catch(err => console.log(err))
// }

// static deleteById(prodId) {
//   const db = getDb();
//   return db.collection('products').deleteOne({_id : new mongodb.ObjectId(prodId)})
//   .then(() => {
//     console.log('DELETED PRODUCT');
//   })
//   .catch(err => console.log(err))
// }

//   static fetchAll() {
//     // To connect to db instance
//     const db = getDb();
//     // .find() returns a cursor object to the resultant query. In order to access it, convert it to an array or some callback.
//     return db.collection("products").find().toArray()
//     .then(products => {
//       return products;
//     })
//     .catch(err => console.log(err))
//   }

// };

// module.exports = Product;
