// require user.js model to connect to mongooes
const User = require('../models/user');

// importing some modules to remove earlier avatar and to add a new one
const fs = require('fs');
const path = require('path');

// module.exports.profile = function(req , res){
//     return res.render('user_profile' , {
//         title: "User Profile Page!"
//     })
// }

// above was used when no need to display list of users
module.exports.profile = function(req , res){
    User.findById(req.params.id , function(err , user){
        return res.render('user_profile' , {
            title: "User Profile Page!",
            profile_user: user
        });
    });
}


// action to update profile page of user
module.exports.update = async function(req,  res){
    // check that only logged in user allowed to update his/her profile
    // if(req.user.id == req.params.id){
    //     User.findByIdAndUpdate(req.params.id , req.body , function(err , user){
    //         return res.redirect('back');
    //     });
    // }else{
    //     return res.status(401).send('Unauthorized');
    // }



    // writing the code in async format
    // alos we are adding the feature of adding profile picture
     if(req.user.id == req.params.id){
        try{
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req , res , function(err){
                if(err){console.log('******Multer Error:' , err)}

                user.name = req.body.name;
                user.email = req.body.email;
                if(req.file){

                    // to remove earlier file and add a new one
                    // not the best way because atleast
                    // one file must be present earlier to be replaced
                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname , '..' , user.avatar));
                    }
                    // this is saving the path of uploaded file into the avatar field in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
                // console.log(req.file);
            });
            
        }catch{
            req.flash('error' , err);
            return res.redirect('back');
        }


    }else{
        req.flash('error' , 'Unathorized');
        return res.status(401).send('Unauthorized');
    }
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
// create signup data
module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        req.flash('error', 'Passwords do not match');
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){req.flash('error', err); return}

        if (!user){
            User.create(req.body, function(err, user){
                if(err){req.flash('error', err); return}

                return res.redirect('/users/sign-in');
            })
        }else{
            // here back is sign-up page
            req.flash('success', 'You have signed up, login to continue!');
            return res.redirect('back');
        }

    });
}



// create action to get data from the sign in page
module.exports.createSession = function(req , res){
    // creating flash message
    // this is just a request. now we need to create custom middleware
    // to get flash as response
    req.flash('success' , 'Logged in Successfully');
    // user is signed in through use of Passport , so just redirect
    return res.redirect('/');
}


// create action for Sign Out
module.exports.destroySession = function(req , res){
    // first logout
    // below function is provided by passport
    req.logout();
    // creating flash message
    req.flash('success' , 'Logged Out Successfully');
    // then redirect to home page
    return res.redirect('/');
}