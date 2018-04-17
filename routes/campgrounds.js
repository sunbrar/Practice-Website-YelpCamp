var express     = require("express"),
    router      = express.Router(),
    Campground  = require("../models/campground"),
    middleware  = require("../middleweare");

router.get("/", function(req,res){
  Campground.find({},function(err,campgrounds){
    if(err){
      console.log(err);
    }else{
      res.render("campgrounds/index",{campgrounds: campgrounds, page: 'campgrounds'
      }); 
    }
  });
});
router.post("/",middleware.isLoggedIn, function(req,res){
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var price = req.body.price;
  var author = {
    id: req.user._id,
    username: req.user.username
  }
  var newCampground = {
    name:name,
    price: price,
    image: image,
    description: desc,
    author: author
  };
  
  Campground.create(newCampground,function(err, newCampground){
    if(err){
      console.log(err);
    }else{
      res.redirect("/campgrounds");  
    }
  })
});

router.get("/new",middleware.isLoggedIn, function(req, res){
  res.render("campgrounds/new");  
});

router.get("/:id", function(req, res) {
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
    if(err){
      console.log(err);
    }else{
      
      if(!foundCampground){
        return res.status(400).send("Item not found.");
      }
      res.render("campgrounds/show", {campground: foundCampground}); 
    }
  });
});

// edit
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
  Campground.findById(req.params.id, function(err, foundCampground){
    if(!foundCampground){
      return res.tatus(400).send("Item not found.")
    }
    res.render("campgrounds/edit", {campground: foundCampground});  
  });    
});

router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
    if(err){
      console.log(err);
      res.redirect("/campgrounds");
    }else{
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

router.delete("/:id", middleware.checkCampgroundOwnership,function(req, res){
  Campground.findByIdAndRemove(req.params.id, function(err){
    if(err){
      console.log(err);
      res.redirect("/campgrounds");
    }else{
      res.redirect("/campgrounds");
    }
  })
});

module.exports = router;