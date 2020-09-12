// require  the post model which contains the schema for creating posts
const Post = require('../../../models/post');

// importing comment model
const Comment = require('../../../models/comment');



// action to create API
module.exports.index = async function(req , res){

    // copied from home_controler.js 
    // to get the list of posts
    let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });

    return res.json(200 , {
        message: "List of posts of version v1",
        // sending the list of posts from the database
        posts: posts
    })
}


// we are authenticating it
// action for deleting a post
module.exports.destroy = async function(req , res){

    try{
        let post = await Post.findById(req.params.id);

        if(post.user == req.user.id){
            post.remove();
            await Comment.deleteMany({post : req.params.id});

            return res.json(200 , {
                message: "Post and assosciated comments deleted!"
            });

        }else
        {
            return res.json(401 , {
                message: "you can't delete this post!"
            });
        }

    }catch(err){
        console.log('********' , err);
        return res.json(500 , {
            message: "Internal Server Error"
        })
    }
    
}



// // action for deleting a post
// module.exports.destroy = async function(req , res){

//     try{
//         let post = await Post.findById(req.params.id);

//         // if(post.user == req.user.id){
//             post.remove();
//             await Comment.deleteMany({post : req.params.id});

//             return res.json(200 , {
//                 message: "Post and assosciated comments deleted!"
//             });

//             // if(req.xhr){
//             //     return res.status(200).json({
//             //         data:{
//             //             post_id: req.params.id
//             //         },
//             //         message: "Post deleted!"
//             //     });
//             // }

//             // req.flash('success' , 'Post and assosciated comments deleted!');
//             // return res.redirect('back');
//         // }else
//         // {
//         //     req.flash('error' , 'you cannot delete this Post');
//         //     return res.redirect('back');
//         // }

//     }catch(err){
//         console.log('********' , err);
//         // req.flash('error' , err);
//         return res.json(500 , {
//             message: "Internal Server Error"
//         })
//     }
    
// }
