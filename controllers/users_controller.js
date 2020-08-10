module.exports.profile = function(req , res){
    return res.render('users_profile' , {
        title: "User Profile Page!"
    });
    // res.end('<h1>User Profile</h1>');
}