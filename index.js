const express = require('express');
const app = express();
const port = 8000;


// we use express router
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