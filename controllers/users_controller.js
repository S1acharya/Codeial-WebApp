// require user.js model to connect to mongooes
const User = require('../models/user');

module.exports.profile = function(req , res){
    return res.render('users_profile' , {
        title: "User Profile Page!"
    })
    // res.end('<h1>User Profile</h1>');
}

// creating action for sign up or rendering sign up page
module.exports.signUp = function(req , res){
    // if user is signed in , then he should not be allowed to go to signup page
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up' , {
        title: "Codeial! Sign Up"
    })
}

// creating action for sign in  or rendering sign in page
module.exports.signIn = function(req , res){
    // if user is signed in , then he should not be allowed to go to signin page
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }


    return res.render('user_sign_in' , {
        title:"Codeial! Sign In"
    })
}


// create action to get data from the sign up page
module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up'); return}

        if (!user){
            User.create(req.body, function(err, user){
                if(err){console.log('error in creating user while signing up'); return}

                return res.redirect('/users/sign-in');
            })
        }else{
            // here back is sign-up page
            return res.redirect('back');
        }

    });
}



// create action to get data from the sign in page
module.exports.createSession = function(req , res){
    // user is signed in through use of Passport , so just redirect
    return res.redirect('/');
}


// create action for Sign Out
module.exports.destroySession = function(req , res){
    // first logout
    // below function is provided by passport
    req.logout();
    // then redirect to home page
    return res.redirect('/');
}