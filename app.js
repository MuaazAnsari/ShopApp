const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const bodyParser = require("body-parser");
const User = require("./models/user");

const app = express();
const store = new MongoDBStore({
  uri: "mongodb://localhost:27017/shop",
  collection: "sessions",
});

app.set("view engine", "ejs");
//if the views folder is named something else then else the below line is not required as it is built in name is views.
app.set("views", "views");

// ------ Middlewares ------
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

// We are not accessing req.session.user bcoz its just data not entire MONGOOSE MODEL.
// Hence, we fetch the user model again and store it in req.user.
app.use((req,res,next) => {
  if(!req.session.user){
    return next();
  }

  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});


//  ----- ROUTES -------

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

// ----Error controller Middleware ----
const errorControllers = require("./controllers/error");
app.use(errorControllers.get404);

// ----- Database Connection ------
mongoose
  .connect("mongodb://localhost:27017/shop")
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
