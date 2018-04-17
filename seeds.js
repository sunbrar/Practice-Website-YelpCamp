var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
      name: "Test 1", 
      image: "https://i.imgur.com/bX2Uk7C.jpg",
      description : "y dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into"
    },
    {
      name: "Test 2", 
      image: "https://i.imgur.com/bX2Uk7C.jpg",
      description : "y dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into"
    },
    {
      name: "Test 3", 
      image: "https://i.imgur.com/bX2Uk7C.jpg",
      description : "y dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into"
    }
  
  ]

function seedDB(){
  //remove
  Campground.remove({}, function(err){
    // if(err){
    //   console.log(err);
    // }
    // console.log("removed campgrounds");
    //add data
    // data.forEach(function(seed){
    //   Campground.create(seed, function(err, data){
    //     if(err){
    //       console.log(err);
    //     }else{
    //       console.log("Added Seed");
    //       //create a comment
    //       Comment.create(
    //         {
    //           text: "This is test template",
    //           author: "Homer"
    //         },function(err,comment){
    //           if(err){
    //             console.log(err);
    //           }else{
    //             data.comments.push(comment);
    //             data.save();  
    //           }
    //         }
    //       )
    //     }
    //   })
    // });
  });  
}

module.exports = seedDB;