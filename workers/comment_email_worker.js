// worker will send the emails for us instead of us sending it via controller

// i am commenting below few lines because redis is used when we want to scale our project
// but will use it while making another projects

// const queue = require('../config/kue');

// const commentsMailer = require('../mailers/comments_mailer');

// queue.process('emails', function(job, done){
//     console.log('emails worker is processing a job ', job.data);

//     commentsMailer.newComment(job.data);

//     done();
// });