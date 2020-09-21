// require user model
const User = require('../../../models/user');

// json web token library
const jwt = require('jsonwebtoken');

// require environment for deployment
const env = require('../../../config/environment');

// create action to get data from the sign in page
module.exports.createSession =async function(req , res){

        try {
            let user =await User.findOne({email: req.body.email});

            if(!user || user.passpord != req.body.passpord){
                return res.json(422 , {
                    message: "Invalid username or password"
                });
            }

            return res.json(200 ,{
                message: 'Sign in successful , here is your token , please keep it safe',
                data: {
                    // CHANGED
                    token: jwt.sign(user.toJSON() , env.jwt_secret ,  {expiresIn: '100000'})
                }
            })


        } catch (err) {
            console.log('*****' , err);
            return res.json(500, {
                message: "Internal Server Error"
            });
        }
}