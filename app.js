const express = require('express');

const path = require('path');

const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop')

const app = express();

const errorControllers = require('./controllers/error');

const sequelize = require('./util/db')

app.set('view engine', 'ejs');
//if the views folder is named something else then else the below line is not required as it is built in name is views.
app.set('views', 'views')


app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminRoutes);
app.use(shopRoutes);


app.use(errorControllers.get404);

sequelize.sync()
.then(result => {
    // console.log(result);
    app.listen(3000);
})
.catch((err) => console.log(err));
