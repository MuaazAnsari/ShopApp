const express = require('express');

const path = require('path');

const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop')

const app = express();

const errorControllers = require('./controllers/error');

const sequelize = require('./util/db')
const Product = require('./models/product');
const User = require('./models/user');
const { name } = require('ejs');

app.set('view engine', 'ejs');
//if the views folder is named something else then else the below line is not required as it is built in name is views.
app.set('views', 'views')

app.use((req,res,next) =>{
    User.findByPk(1)
    .then((user) => {
        req.user = user;
        next();
    })
    .catch(err => console.log(err))
})

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminRoutes);
app.use(shopRoutes);


app.use(errorControllers.get404);

// Associating the relationships between the entities.
Product.belongsTo(User, {constraints : true, onDelete: 'CASCADE'});
User.hasMany(Product);

sequelize
// .sync({force:true})
.sync()
.then(result => {
    // Creating a dummy user, if it does not exists
    return User.findByPk(1);
})

.then(user => {
    if(!user){
        return User.create({name:'Muaaz', email:'test@test.com'});
    }
    return user;
})
.then(user => {
    console.log(user);
    app.listen(3000);
})
.catch((err) => console.log(err));
