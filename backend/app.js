const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require('lodash');
const cors = require('cors');

const app = express();   
mongoose.connect("mongodb://localhost:27017/blogDB");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(cors());
mongoose.set("strictQuery", false);

const postSchema = new mongoose.Schema({
  title:String,
  content:String
});
const Post =  mongoose.model("Post", postSchema);

app.get("/", function(req,res){
  Post.find(function(err,posts){
    if(!err){
      res.send(posts);
    }
  })
})

app.get("/about", function(req,res){
  res.render("about",{para:aboutContent});
})

app.get("/contact", function(req,res){
  res.render("contact",{para:contactContent});
})

app.post("/compose", function(req,res){
  console.log(req.body.title);
  let post = new Post({
    title:req.body.title,
    content:req.body.content
  });

  post.save(function(err){
    if(!err){
      res.redirect("/");
    }
  });
})
app.get("/posts/:id", function(req,res){
  const id = req.params.id;
  Post.findById(id,function(err,post){
     if(!err){
      res.send(post);
     }
  })
});
app.listen(5000, function() {
  console.log("Server started on port 5000");
});
