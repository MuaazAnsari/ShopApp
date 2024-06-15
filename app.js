const express = require('express');

const path = require('path');

const bodyParser = require('body-parser');

const mongoConnect = require('./util/db').mongoConnect;

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop')

const app = express();

const errorControllers = require('./controllers/error');
const User = require('./models/user');

app.set('view engine', 'ejs');
//if the views folder is named something else then else the below line is not required as it is built in name is views.
app.set('views', 'views')

app.use((req,res,next) =>{
    User.findById("666be12f5884c9175565b13a")
    .then((user) => {
        // Here the user we get will just be a user data fetched from database. 
        // We cant apply any methods on that as it is not an instance.
        // so we create a user instance and then store it in req.user
        req.user = new User(user.name, user.email, user.cart, user._id);
        next();
    })
    .catch(err => console.log(err))
})

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminRoutes);
app.use(shopRoutes);


app.use(errorControllers.get404);

mongoConnect(() => {
    app.listen(3000);
})

