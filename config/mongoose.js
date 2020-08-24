// require mongoose library
const mongoose = require('mongoose');

// provide connection
mongoose.connect('mongodb://localhost/codeial_development' ,{ useNewUrlParser: true  , useUnifiedTopology: true} );

// setup database
const db = mongoose.connection;

// on error
db.on('error' , console.error.bind(console , "Error connecting to Mongo database"));


// if ruuning
db.once('open' , function(){
    console.log("Connected to Database:: MongoDB");
})

// export this file
module.exports = db;


// now go to index.js and place this file by import it there