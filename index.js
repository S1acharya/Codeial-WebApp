const express = require('express');
const app = express();
const port = 8000;

// require layout library
const expressLayouts = require('express-ejs-layouts');

// import mongoose.js file here
const db = require('./config/mongoose');

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



// we use express router when we have to connect home page to other pages
// by next line , we are connecting index.js(main page) to (index.js of routes folder)
app.use('/' , require('./routes'));


// we use ejs as our view engine and set up view engine
app.set('view engine' , 'ejs');
app.set('views' , './views');



app.listen(port , function(err){
    if(err){
        // console.log('Error' , err);
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`server is running on port: ${port}`);
});