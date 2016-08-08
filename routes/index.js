var express = require('express');
var router = express.Router();
var User = require('../models/user');

// GET /register
router.get('/register', function(req, res, next){
  return res.render('register', { title: 'Sign Up'} );
});

// POST /register
router.post('/register', function(req, res, next){
  if (req.body.email &&
      req.body.name &&
      req.body.favoriteBook &&
      req.body.password &&
      req.body.confirmPassword) {
    
        //confirm pw fields match
        if (req.body.password !== req.body.confirmPassword) {
          var err = new Error('Passwords do not match!');
          err.status = 400;
          return next(err);
        } else {
            var userData = {
              email: req.body.email,
              name: req.body.name,
              favoriteBook: req.body.favoriteBook,
              password: req.body.password
            };
            
            //use schema's create method to insert doc into model
            User.create(userData, function(error, user){
              if (error) {
                return next (error)
              } else {
                return res.redirect('/profile');
              }
            });
            
          };
            
      //what to do if form fields aren't complete      
      } else {
        var err = new Error('All fields required.');
        err.status = 400;
        return next(err);
      };
  } // end main if statement
  
); //end POST register route

// GET /
router.get('/', function(req, res, next) {
  return res.render('index', { title: 'Home' });
});

// GET /about
router.get('/about', function(req, res, next) {
  return res.render('about', { title: 'About' });
});

// GET /contact
router.get('/contact', function(req, res, next) {
  return res.render('contact', { title: 'Contact' });
});

module.exports = router;
