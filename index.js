const express = require('express');
// require cookie parser
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;

// require layout library
const expressLayouts = require('express-ejs-layouts');

// import mongoose.js file here
const db = require('./config/mongoose');

// import express-session library here. used for encrypting cookies
const session = require('express-session');

// require passport
const passport = require('passport');

// require passport-local-strategy
const passportLocal = require('./config/passport-local-strategy');


// ............................................above this line we will require the libraries..................................................
// ...........................below this line we will be using different middlewares to perform different tasks.................................


// to read the post requests
app.use(express.urlencoded());

// set up  cookie-parser i.e., tell app to use cookie-parser
app.use(cookieParser());

// we ask the index.js to look for static files in assets folder
app.use(express.static('./assets'));

// now we tell app to use express library
// and this should be written before we requires ROUTES
app.use(expressLayouts);


// extract styles and scripts fro sub pages into the layout
// for extracting css files
app.set('layout extractStyles' , true);
// for extracting js files
app.set('layout extractScripts' , true);


// we use ejs as our view engine and set up view engine
app.set('view engine' , 'ejs');
app.set('views' , './views');

// middleware to take session cookie and encrypt it
app.use(session({
    name: 'codeial',
    // ToDo
    secret: "blahsomething",
    // when user has not logged in  , then we don't want to store extra data
    // so , it is false
    saveUninitialized: false,
    // when identity is eatablished ,some data is there in session data
    // then to prevent us from storing it again and again
    resave:false,
    cookie:{
        maxAge: (1000*60*100)
    }
}));

// tell the app to use passport
app.use(passport.initialize());
app.use(passport.session());
 


// we use express router when we have to connect home page to other pages
// by next line , we are connecting index.js(main page) to (index.js of routes folder)
app.use('/' , require('./routes'));



// just to check if express server is runnung properly or not
app.listen(port , function(err){
    if(err){
        // console.log('Error' , err);
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`server is running on port: ${port}`);
});