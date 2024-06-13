const express = require('express');

const path = require('path');

const bodyParser = require('body-parser');

const mongoConnect = require('./util/db').mongoConnect;

const adminRoutes = require('./routes/admin');
// const shopRoutes = require('./routes/shop')

const app = express();

const errorControllers = require('./controllers/error');

app.set('view engine', 'ejs');
//if the views folder is named something else then else the below line is not required as it is built in name is views.
app.set('views', 'views')

app.use((req,res,next) =>{
    // User.findByPk(1)
    // .then((user) => {
    //     req.user = user;
    //     next();
    // })
    // .catch(err => console.log(err))
    next();
})

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminRoutes);
// app.use(shopRoutes);


app.use(errorControllers.get404);

mongoConnect(() => {
    app.listen(3000);
})

