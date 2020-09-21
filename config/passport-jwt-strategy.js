// here we create the setup for using JWT Strategy
// a key in jwt has 3 things- Headers, payload , encrypted key


const passport = require('passport');

const JWTStrategy = require('passport-jwt').Strategy;

const ExtractJWT = require('passport-jwt').ExtractJwt;

// we will user user model for authentication
const User = require('../models/user');

// require environment for deployment
const env = require('./environment');

// few option/keys for encryption
let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: env.jwt_secret
}

// tell passport to use jwt strategy
passport.use(new JWTStrategy(opts , function(jwtPayLoad , done){

    User.findById(jwtPayLoad._id , function(err , user){
        if(err){console.log('Error in finding user in JWT'); return;}

        if(user){
            return done(null , user);
        }else{
            return done(null , false);
        }
    })

}));


// export
module.exports = passport;