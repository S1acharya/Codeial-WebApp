const nodemailer = require('../config/nodemailer');
const nodeMailer = require('../config/nodemailer');


// create a function that will send mail
// this is another way of exporting a method
exports.newComment = (comment) => {
    // we will send template using below function
    let htmlString = nodemailer.renderTemplate({comment: comment} , '/comments/new_comment.ejs');
    // console.log('inside newComment Mailer');

    nodemailer.transporter.sendMail({
        from: 'acharyasaket.08@gmail.com',
        to: comment.user.email,
        subject: "New Comment Published!",
        html: htmlString
    } , (err, info) => {
        if(err){
            console.log('Error in sending mail',  err);
            return;
        }

        console.log('Message sent',  info);
        return;
    });
}