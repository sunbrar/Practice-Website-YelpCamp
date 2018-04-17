var express     = require("express"),
    router      = express.Router({mergeParams: true}),
    Campground  = require("../models/campground"),
    Comment     = require("../models/comment"),
    middleware  = require("../middleweare");

router.get("/new",middleware.isLoggedIn, function(req,res){
  Campground.findById(req.params.id, function(err, campground){
    if(err){
      console.log(err);
    }else{
      res.render("comments/new", {campground: campground});
    }
  });
});

router.post("/",middleware.isLoggedIn, function(req,res){
  Campground.findById(req.params.id, function(err, campground){
    if(err){
      console.log(err);
      res.redirect("/campgrounds");
    }else{
      Comment.create(req.body.comment, function(err, comment){
        if(err){
          req.flash("error", "Something went wrong, please contact support");
          console.log(err);
        }else{
          //add username and id to comment
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.save();
          
          campground.comments.push(comment);
          campground.save();
          req.flash("success", "Comment Created");
          res.redirect("/campgrounds/" + campground._id);
        }
      });
    }
  });
});

//Comment Edit
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
  Comment.findById(req.params.comment_id, function(err, foundComment){
    if(err){
      res.redirect("back");
    }else{
      
      if(!foundComment){
        return res.tatus(400).send("Item not found.")
      }
      
      res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});  
    }
  });
});

router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
    if(err){
      res.redirect("back");
    }else{
      res.redirect("/campgrounds/"+req.params.id);
    }
  });
})

router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
  Comment.findByIdAndRemove(req.params.comment_id, function(err){
    if(err){
      res.redirect("back");
    }else {
      req.flash("success", "Comment Deleted");
      res.redirect("/campgrounds/" + req.params.id);
    }
  })
});

module.exports = router;