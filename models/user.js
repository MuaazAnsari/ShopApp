const { getDb } = require("../util/db");
const mongodb = require('mongodb');

class User {
    constructor(name, email,cart, id){
        this.name = name;
        this.email = email;
        this.cart = cart;  //  cart : {items : []}
        this._id = id;
    }

    save() {
        const db = getDb();
        return db.collection('users').insertOne(this);
    }

    addToCart(product) {
        const db = getDb();
        // check wether the product exists in the cart or not.
        const cartProductIndex = this.cart.items.findIndex(cp => {
            return cp.productId.toString() === product._id.toString();
        })

        let newQuantity = 1;
        const updatedCartItems = [...this.cart.items];
        if(cartProductIndex >= 0){
            newQuantity = this.cart.items[cartProductIndex].quantity + 1;
            updatedCartItems[cartProductIndex].quantity = newQuantity;
        }
        else{
            updatedCartItems.push({productId : new mongodb.ObjectId(product._id), quantity : newQuantity})
        }
        // if it does not exists
        // updated Cart will store all the properties of the product object and add the quantity parameter as well.
        const updatedCart = {items : updatedCartItems};
        return db.collection('users').updateOne({_id : new mongodb.ObjectId(this._id)}, {$set : {cart : updatedCart}});
    }

    static findById(userId){
        const db = getDb();
        return db.collection('users').findOne({_id : new mongodb.ObjectId(userId)})
    }
}

module.exports = User;