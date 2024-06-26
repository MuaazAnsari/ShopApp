const Sequelize = require('sequelize');
const sequelize = require('../util/db');

const Order = sequelize.define('order',{
  id: {
    type:Sequelize.INTEGER,
    allowNull : false,
    autoIncrement : true,
    primaryKey : true
  }
});

module.exports = Order;