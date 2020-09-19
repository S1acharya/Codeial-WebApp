// access the post model
const Post = require('../models/post');

// require user
const User = require('../models/user');

// through next line , we are connecting home_controller.js to home.ejs


// we are writing async await codes
// codes which are commented are actually previously writen codes
module.exports.home =  async function(req, res){
    
    try{
        // populate the user of each post and comment
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            },
            // added populate feature for likes
            populate: {
                path: 'likes'
            }
        }).populate('comments')
        .populate('likes');

        let users = await User.find({});

        return res.render('home', {
            title: "CodialHome",
            posts:  posts,
            all_users: users
        });
    } catch(err){
        console.log('Error' , err);
        return;
    }

}










// module.exports.home = function(req, res){


//     // console.log(req.cookies);
//     // // to edit the cookie
//     // res.cookie('saket' , 2000);





//     // this was to show post on screen . but it was not showing which user had posted which post
//     // Post.find({}, function(err, posts){
//     //     return res.render('home', {
//     //         title: "Codeial | Home",
//     //         posts:  posts
//     //     });
//     // });







//     // populate the user of each post
//     Post.find({})
//     .populate('user')
//     .populate({
//         path: 'comments',
//         populate: {
//             path: 'user'
//         }
//     })
//     .exec(function(err, posts){

//         User.find({} , function(err , users){

//             return res.render('home', {
//                 title: "CodialHome",
//                 posts:  posts,
//                 // we get the list of all users and then display them on home.ejs
//                 all_users: users
//             });
//         });

        
//     })



//     // return res.end('<h1>Express is up for Codeial!</h1');
// }



// example
// module.exports.actionName = function(req , res){}

// using then
// Post.find({}).populate('comments').then(function());

// let posts = Post.find({}).populate('comments').exec();

// posts.then()