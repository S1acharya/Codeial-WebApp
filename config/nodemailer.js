const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');


// define transporter
// transporter is an object that is attached/assigned to nodemailer
let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    // email will be sent using this email
    auth: {
        user: 'acharyasaket.08@gmail.com',
        pass: 'Fighter@135*#'
    }
});


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