const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');



// tell passport to use googleStrategy for login
passport.use(new googleStrategy({
        clientID: "937758260052-7luaqbq74onjtmrb0rckk7q181p291d6.apps.googleusercontent.com",
        clientSecret: "WJuSvxaXdOAAeegI0fGWEXVo",
        callbackURL: "http://localhost:8000/users/auth/google/callback",
    },

    // callback function
    function(accessToken , refreshToken , profile , done){
        // find the user
        User.findOne({email: profile.emails[0].value}).exec(function(err ,user){
            if(err){console.log('error in google starategy-passport' , err); return;}
            console.log(accessToken , refreshToken);
            console.log(profile);

            if(user){
                // if found , set this user as  req.user
                return done(null , user);
            }else{
                // if not found , create the user and set it as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                } , function(err , user){
                    if(err){console.log('error in creating user google strategy-passport' , err); return;}

                    return done(null , user);
                });
            }
        });
    }
));


module.exports = passport;