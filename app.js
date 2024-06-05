const express = require('express');

const path = require('path');


const bodyParser = require('body-parser');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop')

const app = express();

app.set('view engine', 'pug');
//if the views folder is named something else then else the below line is not required as it is built in name is views.
app.set('views', 'views')

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminData.routes);
app.use(shopRoutes);


app.use((req,res,next) =>{
    res.status(404).render('error', {pageTitle: 'Page Not Found'});
});


app.listen(3000);