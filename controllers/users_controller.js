module.exports.profile = function(req , res){
    return res.render('users' , {
        title: "User Profile Page!"
    });
    // res.end('<h1>User Profile</h1>');
}