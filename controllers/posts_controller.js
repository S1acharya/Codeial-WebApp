// import post model from post.js
const Post = require('../models/post');
// import comment model from comment.js
const Comment = require('../models/comment');




// create action
// we will write it using async await
// here , we will also check if request is AJAX request
module.exports.create =  async function(req, res){
    try{

        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });

        if(req.xhr){
            // if we want to populate just the name of the user (we'll not want to send the password in the API), this is how we do it!
            post = await post.populate('user', 'name').execPopulate();


            return res.status(200).json({
                data:{
                    post: post
                },
                message: "Post Created!"
            });
        }


        req.flash('success' , 'Post published');
        return res.redirect('back');

    } catch(err){
        req.flash('error' , err);
        // added this to view the error on console as well
        console.log(err);
        return res.redirect('back');
    }
    
}

// create action
// we will write it using async await
// module.exports.create =  async function(req, res){
//     try{

//         await Post.create({
//             content: req.body.content,
//             user: req.user._id
//         });
//         req.flash('success' , 'Post published');
//         return res.redirect('back');

//     } catch(err){
//         req.flash('error' , err);
//         // console.log('Error' , err);
//         return res.redirect('back');
//     }
    
// }

// below written code does the same work as above ,
// but it is not async await

// module.exports.create = function(req, res){
//     Post.create({
//         content: req.body.content,
//         user: req.user._id
//     }, function(err, post){
//         if(err){console.log('error in creating a post'); return;}

//         return res.redirect('back');
//     });
// }














// create action to destroy post
// we write it using async await
// here , we will also check if request is AJAX request
module.exports.destroy = async function(req , res){

    try{

        let post = await Post.findById(req.params.id);
        if(post.user == req.user.id){
            post.remove();
            await Comment.deleteMany({post : req.params.id});

            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id: req.params.id
                    },
                    message: "Post deleted!"
                });
            }

            req.flash('success' , 'Post and assosciated comments deleted!');
            return res.redirect('back');
        }else
        {
            req.flash('error' , 'you cannot delete this Post');
            return res.redirect('back');
        }

    }catch(err){
        req.flash('error' , err);
        // console.log('Error' , err);
        return res.redirect('back');
    }
    
}



// create action to destroy post
// we write it using async await
// module.exports.destroy = async function(req , res){

//     try{

//         let post = await Post.findById(req.params.id);
//         if(post.user == req.user.id){
//             post.remove();
//             await Comment.deleteMany({post : req.params.id});
//             req.flash('success' , 'Post and assosciated comments deleted');
//             return res.redirect('back');
//         }else
//         {
//             req.flash('error' , 'you cannot delete this Post');
//             return res.redirect('back');
//         }

//     }catch(err){
//         req.flash('error' , err);
//         // console.log('Error' , err);
//         return res.redirect('back');
//     }
    
// }




//  module.exports.destroy = function(req , res){
//      Post.findById(req.params.id , function(err , post){

//         // we need to check whether the user who is deleting the post is the user who created it
//         // because we don't someone else to delete our post
//         // .id means converting the object id into string for comparision
//         if(post.user == req.user.id){
//             // delete post
//             post.remove();

//             // delete comment by using id
//             Comment.deleteMany({post : req.params.id} , function(err){
//                 return res.redirect('back');
//             });
//         }else
//         {
//             return res.redirect('back');
//         }
//      });
//  }