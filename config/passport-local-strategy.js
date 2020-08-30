// ....................................in this page we set up the Passport to use it.........................................


// import/require passport
const passport = require('passport');

// import passport-local-strategy
const LocalStrategy = require('passport-local').Strategy;

// import user to find email,. etc
const User = require('../models/user');


// tell passport to use local-strategy
// authentication for SignIn
passport.use(new LocalStrategy({
        usernameField: 'email',
        passReqToCallback: true
    },
    // done is our callback function which reports to passport.js
    function(req, email, password, done){
        // find a user and establish the identity
        User.findOne({email: email}, function(err, user)  {
            if (err){
                // console.log('Error in finding user --> Passport');
                req.flash('error' , err);
                return done(err);
            }
            // if password doesnot matches
            if (!user || user.password != password){
                // console.log('Invalid Username/Password');
                req.flash('error' , 'Invalid Username/Password');
                return done(null, false);
            }
            // if user found
            return done(null, user);
        });
    }


));


// serializing the user to decide which key is to kept in the cookie
// we find the id during signin  , send it to cookie and then to browser
// a kind of encryption
passport.serializeUser(function(user, done){
    done(null, user.id);
});


// deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error in finding user --> Passport');
            return done(err);
        }
        // if user found
        return done(null, user);
    });
});




// sending data of signed in current user to view

// check if the user is authenticated
// we will be using below funciton as a middleware 
passport.checkAuthentication = function(req, res, next){
    // if the user is signed in, then pass on the request to the next function(controller's action)
    if (req.isAuthenticated()){
        return next();
    }

    // if the user is not signed in
    return res.redirect('/users/sign-in');
}


// set the user for the views
// above middleware was just used to check whether user is signed in or not
passport.setAuthenticatedUser = function(req, res, next){
    if (req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }

    next();
}


// exporting the passport
module.exports = passport;