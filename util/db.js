const Sequelize = require('sequelize');

const sequelize = new Sequelize('shop-db','root','Muaaz@mysql', {
    dialect:'mysql',
    host:'localhost'
});

module.exports = sequelize;