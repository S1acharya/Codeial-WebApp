// import post model from post.js
const Post = require('../models/post');
// import comment model from comment.js
const Comment = require('../models/comment');

// create action
module.exports.create = function(req, res){
    Post.create({
        content: req.body.content,
        user: req.user._id
    }, function(err, post){
        if(err){console.log('error in creating a post'); return;}

        return res.redirect('back');
    });
}


// create action to destroy post
 module.exports.destroy = function(req , res){
     Post.findById(req.params.id , function(err , post){

        // we need to check whether the user who is deleting the post is the user who created it
        // because we don't someone else to delete our post
        // .id means converting the object id into string for comparision
        if(post.user == req.user.id){
            // delete post
            post.remove();

            // delete comment by using id
            Comment.deleteMany({post : req.params.id} , function(err){
                return res.redirect('back');
            });
        }else
        {
            return res.redirect('back');
        }
     });
 }