//jshint esversion:6
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const homeStartingContent = "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam asperiores mollitia itaque eum, odit porro!";
const aboutContent =" Depression is like living in a body that fights to survive, with a mind that tries to die. This website aims to provide you all with the chance to open up your heart in this time of emotional crisis where we all in some or the other way have succumbed to mental illness like depression, anxiety etc. This is the little effort put by us to relieve a bit of burden from your hearts.We intend to make world a better place to live in but this will not be possible with the lingering depressed souls. This website is a platform where anyone can share his or her feelings without the fear of getting mocked or judged. This project is basically for social cause and is designed under healthcare theme.";

//const contactContent ="Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur neque nesciunt quidem ea beatae voluptate earum rerum magnam blanditiis ullam?";

const app = express();//Creating app

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/BlogSite", {useNewUrlParser: true});

const postSchema ={ //Mongoose Schema
title:String,
content:String
};

const Post = mongoose.model("Post", postSchema);//Mongoose Model


app.get("/", function(req, res){   //Sending content to respective EJS files
   
    Post.find({}, function(err, posts){
        res.render("home", {
          startingContent: homeStartingContent,
          posts: posts
        });
    });
});

app.get("/compose", function(req, res){//Sending content to respective EJS files
    res.render("compose");
});

app.post("/compose", function( req, res){
 
    const post = new Post ({ //Creating a new post document // JS object for the post title and body

    title: req.body.postTitle,
    content: req.body.postBody
  });
  post.save(function(err){
    if (!err){
        res.redirect("/");//Redirecting to home route after publishing a post
    }
  });
});


//Lecture 16 to 19

app.get("/posts/:postId", function(req, res){//Sending content to respective EJS files || Express route parameter

    const requestedPostId = req.params.postId;
    
      Post.findOne({_id: requestedPostId}, function(err, post){
        res.render("post", {
          title: post.title,
          content: post.content
        });
      });
    
    });

app.get("/about", function(req, res){ //Sending content to respective EJS files
    res.render("about", { aboutContent: aboutContent });
});
/* 
app.get("/contact", function(req,res){
    res.render("contact",{contactContent: contactContent});
});
*/
   
app.listen(3000, function(req, res){
    console.log("Hello There");
});