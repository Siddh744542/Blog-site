const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors');

const app = express();   
mongoose.connect("mongodb://localhost:27017/blogDB");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(cors());
mongoose.set("strictQuery", false);

const postSchema = new mongoose.Schema({
  title:String,
  content:String
});
const Post =  mongoose.model("post", postSchema);

const userSchema = new mongoose.Schema(
  {
    name:String,
    email:String,
    posts:[{
      title:String,
      content:String,
      timestamp:Date
    }]
  }
);
const User = mongoose.model("user", userSchema);

app.get("/", function(req,res){
  Post.find(function(err,posts){
    if(!err){
      res.send(posts);
    }
  })
})

app.post("/register",function(req,res){
  console.log(req.body.name);
  console.log(req.body.email);
  console.log(req.body.password);
})

app.post("/compose", function(req,res){
  console.log(req.body.title);
  let newPost = new Post({
    title:req.body.title,
    content:req.body.content
  });

  newPost.save(function(err,result){
    if (err){
      console.log(err);
    }
    else{
      res.send(result);
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
