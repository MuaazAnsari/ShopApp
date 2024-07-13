const bcrypt = require('bcryptjs');
const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated : false
  });
};

exports.getSignUp = (req,res,next) => {
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Sign Up',
    isAuthenticated : false
  });
};

exports.postLogin = async (req,res,next) => {
  try {
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({email : email});

  if(!user) {
    return res.redirect('/login');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (isMatch){
      req.session.isLoggedIn = true;
      req.session.user = user;
      await req.session.save(err => {
        console.log(err);
        res.redirect('/');
    });
  }
  else{
    res.redirect('/login');
  }

  } catch (err) {
    console.log(err);
  }
};

exports.postSignUp = async (req,res,next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const existingUser = await User.findOne({email : email});
    // checking if user with same email exists. If it exists, just remain in same page and try again
    if(existingUser){
      return res.redirect('/signup');
    }
    
    const hashedPassword = await bcrypt.hash(password,12);
    const user = new User ({
      email : email,
      password : hashedPassword,
      cart : {items: []}
    });

    await user.save();
    res.redirect('/login');
  }  
  catch (error) {
    console.log(error);
  }
  
};

exports.postLogout = (req,res,next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect('/');
  })
};
