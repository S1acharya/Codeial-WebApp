const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
// require environment for deployment
const env = require('./environment');


// define transporter
// transporter is an object that is attached/assigned to nodemailer
// CHANGED
let transporter = nodemailer.createTransport(env.smtp);


// define that we will use ejs template for rendering
let renderTemplate = (data , relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname , '../views/mailers',  relativePath),
        data,
        function(err , template){
           if(err){console.log('error in rendering template' , err); return;}
           
           mailHTML = template;
        }
    )

    return mailHTML;
}


module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}