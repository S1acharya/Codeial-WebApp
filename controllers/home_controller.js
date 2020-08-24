// access the post model
const Post = require('../models/post');

// through next line , we are connecting home_controller.js to home.ejs


module.exports.home = function(req, res){
    // console.log(req.cookies);
    // // to edit the cookie
    // res.cookie('saket' , 2000);

    // this was to show post on screen . but it was not showing which user had posted which post
    // Post.find({}, function(err, posts){
    //     return res.render('home', {
    //         title: "Codeial | Home",
    //         posts:  posts
    //     });
    // });

    // populate the user of each post
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec(function(err, posts){
        return res.render('home', {
            title: "CodialHome",
            posts:  posts
        });
    })

    // return res.end('<h1>Express is up for Codeial!</h1');
}

// example
// module.exports.actionName = function(req , res){}