// importing the Sequelize class 
const Sequelize = require('sequelize');

// importing the database connection pool and more from the db.js file
const sequelize = require('../util/db');

const Product = sequelize.define('product',{
  id: {
    type : Sequelize.INTEGER,
    autoIncrement : true,
    allowNull : false,
    primaryKey : true
  },

  title:{
    type : Sequelize.STRING,
    allowNull:false
  },

  price : {
    type : Sequelize.DOUBLE,
    allowNull:false
  },

  description : {
    type : Sequelize.STRING,
    allowNull:false
  },

  imageUrl : {
    type : Sequelize.STRING,
    allowNull:false
  }

});

module.exports = Product;
