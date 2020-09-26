const express = require('express');
// require environment. only during deployment process
const env = require('./config/environment');
// require morgan
const logger = require('morgan');

// require cookie parser
const cookieParser = require('cookie-parser');
const app = express();

// require helper function from view-helpers.js
require('./config/view-helpers')(app);

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

// require passport-jwt
const passportJWT = require('./config/passport-jwt-strategy');

// require google-Oauth2
const passportGoogle = require('./config/passport-google-oauth2-strategy');

// require connect-mongo library
const MongoStore = require('connect-mongo')(session);

// require sass-middleware
const sassMiddleware = require('node-sass-middleware');

// require connect-flash npm package
const flash = require('connect-flash');

// require custom flash middleware
const customMware = require('./config/middleware');

// import our http with the server for Socket.io
// setup the chat server to be used with socket.io

// create the chat server and add the connection to it
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listening on port 5000')
const path = require('path');

// ............................................above this line we will require the libraries..................................................
// ...........................below this line we will be using different middlewares to perform different tasks.................................

// let's connect sass with our css code
// write these few lines before any middleware
// CHANGED
if(env.name == 'development'){
    app.use(sassMiddleware({
        // CHANGED
        src: path.join(__dirname , env.asset_path , 'scss'),
        dest: path.join(__dirname , env.asset_path , 'css'),
        debug: true,
        outputStyle: 'extended',
        prefix: '/css'
    }));
}



// to read the post requests
app.use(express.urlencoded({extended: false}));

// set up  cookie-parser i.e., tell app to use cookie-parser
app.use(cookieParser());

// we ask the index.js to look for static files in assets folder
// CHANGED
app.use(express.static(env.asset_path));

// make the uploads path available to the browser
// to show uploaded images on screen
app.use('/uploads' , express.static(__dirname + '/uploads'));

// use logger for storing log for 1 day in production mode
app.use(logger(env.morgan.mode, env.morgan.options));


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
    // ToDo change the secret before deployment in production mode
    // CAHNGED
    secret: env.session_cookie_key,
    // when user has not logged in  , then we don't want to store extra data
    // so , it is false
    saveUninitialized: false,
    // when identity is eatablished ,some data is there in session data
    // then to prevent us from storing it again and again
    resave:false,
    cookie:{
        maxAge: (1000 * 60 * 100)
    },
    // mongo store for storing session cookie in db
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        },
        function(err){
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}));

// tell the app to use passport
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
 
// set-up to use flash
// put it below session becuse it uses session-cookies
app.use(flash());

// set custom middleware to use
app.use(customMware.setFlash);

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