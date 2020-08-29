const Comment = require('../models/comment');

const Post = require('../models/post');

// action to create comment for a post
module.exports.create = function(req, res){
    // we find the post with post_id first
    // then we create a comment
    Post.findById(req.body.post, function(err, post){

        if (post){
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, function(err, comment){
                // handle error
                if(err){console.log('error in creating a comment'); return;}

                post.comments.push(comment);
                post.save();

                res.redirect('/');
            });
        }

    });
}

// action to delete comment of a post
module.exports.destroy = function(req  ,res){
    // find the comment
    Comment.findById(req.params.id , function(err , comment){
        // we need to check in database if comment really exists or not
        if(comment.user == req.user.id){
            // before removing comment ,  we need to fetch post.id of that comment
            // because we need to go inside the post , find the comment and delete it

            // we store the id of comment, i.e., a comment belong to which post
            let postId = comment.post;

            comment.remove();
            // now use postId to update the post after deleting referenceid/comment
            Post.findByIdAndUpdate(postId , {$pull : {comments: req.params.id}} , function(err , post){
                return res.redirect('back');
            })
        } else{
            return res.redirect('back');
        }
    });
}