var express   = require("express"),
    router    = express.Router(),
    passport  = require("passport"),
    User      = require("../models/user");

router.get("/", function(req,res){
  res.render("landing");
});

// Auth Routes
router.get("/register", function(req, res) {
  res.render("register")
});

router.post("/register", function(req, res) {
  var newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user){
    if(err){
      req.flash("error", err.message);
      return res.render("register");
    }
    passport.authenticate("local")(req, res, function(){
      req.flash("success", "Welcome to Yelp Camp "+user.username);
      res.redirect("/campgrounds");
    });
  }) 
});

router.get("/login", function(req, res){
  res.render("login");
});

router.post("/login",passport.authenticate("local", 
  {
    successRedirect: "/campgrounds", 
    failureRedirect: "/login"
  }), function(req, res) {
});

router.get("/logout", function(req, res){
  req.logout();
  req.flash("success", "Logged out");
  res.redirect("/campgrounds");
});

// show register form
//handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register", {error: err.message});
        }
        passport.authenticate("local")(req, res, function(){
           req.flash("success", "Successfully Signed Up! Nice to meet you " + req.body.username);
           res.redirect("/campgrounds"); 
        });
    });
});

//show login form
router.get("/login", function(req, res){
   res.render("login", {page: 'login'}); 
});

module.exports = router;