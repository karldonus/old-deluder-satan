var express = require('express');
var router = express.Router();
var DB = require('../config/connection');
var Comment = DB.models.Comment;

function error(response, message) {
  response.status(500);
  response.json({error: message});
}

router.get('/comments', function(req, res) {
  Comment.findAll().then(function(comments){
    res.json(comments);
  })
})

router.post("/comments", function(req, res){
  var username = req.user.username
  Comment.create(req.body).then(function(comment){
    res.json(comment);
  });
});

router.delete("/comments/:id", function(req, res){
  Comment.findById(req.params.id).then(function(comment){
    if(!comment) return error(res, "not found");
    comment.destroy().then(function(){
      res.json({success: true});
      console.log("deleted")
    });
  });
});

module.exports = router;
