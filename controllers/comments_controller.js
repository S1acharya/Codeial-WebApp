const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailer');
const queue = require('../config/kue');
const commentEmailWorker = require('../workers/comment_email_worker');
const Like = require('../models/like');


// action to create comment for a post
// we write it using async await
// here , we will also check if request is AJAX request
// also adding the feature of sending mail
// adding kue for delayed jobs feature
module.exports.create = async function(req, res){
    try{

        let post = await Post.findById(req.body.post);
        if (post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
            post.comments.push(comment);
            post.save();


            comment = await comment.populate('user', 'name email').execPopulate();
            // calling the function which sends mail
            // next line was used to send mails when delayed jobs feature 
            // was not added 
            // commentsMailer.newComment(comment);

            // i am commenting below few lines because redis is used when we want to scale our project
            // but will use it while making another projects
            // when added delayed jobs feature , then next few lines should be implemented
            let job = queue.create('emails', comment).save(function(err){
                if (err){
                    console.log('Error in sending to the queue', err);
                    return;
                }
                console.log('job enqueued', job.id);

            })
            

            if (req.xhr){
                
    
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Post created!"
                });
            }

            req.flash('success' , 'Comment published!');
            return res.redirect('/');
        }

    }catch(err){
        req.flash('error' , err);
        // console.log('Error' , err);
        return res.redirect('back');
    }
    
}

// action to create comment for a post
// we write it using async await
// here , we will also check if request is AJAX request
// also adding the feature of sending mail
// module.exports.create = async function(req, res){
//     try{

//         let post = await Post.findById(req.body.post);
//         if (post){
//             let comment = await Comment.create({
//                 content: req.body.content,
//                 post: req.body.post,
//                 user: req.user._id
//             });
//             post.comments.push(comment);
//             post.save();


//             comment = await comment.populate('user', 'name email').execPopulate();
//             // calling the function which sends mail
//             commentsMailer.newComment(comment);

//             if (req.xhr){
                
    
//                 return res.status(200).json({
//                     data: {
//                         comment: comment
//                     },
//                     message: "Post created!"
//                 });
//             }

//             req.flash('success' , 'Comment published!');
//             return res.redirect('/');
//         }

//     }catch(err){
//         req.flash('error' , err);
//         // console.log('Error' , err);
//         return res.redirect('back');
//     }
    
// }

// action to create comment for a post
// we write it using async await
// here , we will also check if request is AJAX request
// module.exports.create = async function(req, res){
//     try{

//         let post = await Post.findById(req.body.post);
//         if (post){
//             let comment = await Comment.create({
//                 content: req.body.content,
//                 post: req.body.post,
//                 user: req.user._id
//             });
//             post.comments.push(comment);
//             post.save();

//             if (req.xhr){
//                 // Similar for comments to fetch the user's id!
//                 comment = await comment.populate('user', 'name').execPopulate();
    
//                 return res.status(200).json({
//                     data: {
//                         comment: comment
//                     },
//                     message: "Post created!"
//                 });
//             }

//             req.flash('success' , 'Comment published!');
//             return res.redirect('/');
//         }

//     }catch(err){
//         req.flash('error' , err);
//         // console.log('Error' , err);
//         return res.redirect('back');
//     }
    
// }

// action to create comment for a post
// we write it using async await
// module.exports.create = async function(req, res){
//     try{

//         let post = await Post.findById(req.body.post);
//         if (post){
//             let comment = await Comment.create({
//                 content: req.body.content,
//                 post: req.body.post,
//                 user: req.user._id
//             });
//             post.comments.push(comment);
//             post.save();
//             req.flash('success' , 'commented successfully on post');
//             return res.redirect('back');
//         }

//     }catch(err){
//         req.flash('error' , err);
//         // console.log('Error' , err);
//         return res.redirect('back');
//     }
    
// }




// module.exports.create = function(req, res){
//     // we find the post with post_id first
//     // then we create a comment
//     Post.findById(req.body.post, function(err, post){

//         if (post){
//             Comment.create({
//                 content: req.body.content,
//                 post: req.body.post,
//                 user: req.user._id
//             }, function(err, comment){
//                 // handle error
//                 if(err){console.log('error in creating a comment'); return;}

//                 post.comments.push(comment);
//                 post.save();

//                 res.redirect('/');
//             });
//         }

//     });
// }





// action to delete comment of a post
// we do it using async await
// here , we will also check if request is AJAX request
module.exports.destroy = async function(req, res){

    try{
        let comment = await Comment.findById(req.params.id);

        if (comment.user == req.user.id){

            let postId = comment.post;

            comment.remove();

            let post = Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});

            // CHANGE :: destroy the associated likes for this comment
            await Like.deleteMany({likeable: comment._id, onModel: 'Comment'});


            // send the comment id which was deleted back to the views
            if (req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }


            req.flash('success', 'Comment deleted!');

            return res.redirect('back');
        }else{
            req.flash('error', 'Unauthorized');
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error', err);
        return;
    }
    
}


// action to delete comment of a post
// we do it using async await
// module.exports.destroy = async function(req  ,res){
    
//     try{

//         let comment = await Comment.findById(req.params.id);
//         if(comment.user == req.user.id){
                
//             let postId = comment.post;

//             comment.remove();
            
//             let post = await Post.findByIdAndUpdate(postId , {$pull : {comments: req.params.id}});
            
//             req.flash('success' , 'commented deleted successfully');
//             return res.redirect('back');
//         } else{
//             req.flash('error' , 'you cannot delete this comment');
//             return res.redirect('back');
//         }

//     }catch(err){
//         req.flash('error' , err);
//         // console.log('Error' , err);
//         return res.redirect('back');
//     }
// }





// module.exports.destroy = function(req  ,res){
//     // find the comment
//     Comment.findById(req.params.id , function(err , comment){
//         // we need to check in database if comment really exists or not
//         if(comment.user == req.user.id){
//             // before removing comment ,  we need to fetch post.id of that comment
//             // because we need to go inside the post , find the comment and delete it

//             // we store the id of comment, i.e., a comment belong to which post
//             let postId = comment.post;

//             comment.remove();
//             // now use postId to update the post after deleting referenceid/comment
//             Post.findByIdAndUpdate(postId , {$pull : {comments: req.params.id}} , function(err , post){
//                 return res.redirect('back');
//             })
//         } else{
//             return res.redirect('back');
//         }
//     });
// }