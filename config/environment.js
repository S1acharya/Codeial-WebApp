const fs = require('fs');
const morgan = require('morgan');
const rfs = require('rotating-file-stream');
const path = require('path');

// setting for morgan and rotating-file-stream
// we create a folder /production_log for storing our history of logs
// if that folder is not already created
const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);


// const accessLogStream = rfs('access.log', {
//     interval: '1d',
//     path: logDirectory
// });

// above code didn't worked,  so changed it this way
const accessLogStream = rfs.createStream('access.log', {
    interval: '1d', // rotate daily
    path: logDirectory
});


const development = {
    name: 'development',
    asset_path: './assets',
    session_cookie_key: 'pp',
    db: 'pp',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        // email will be sent using this email
        auth: {
            user: 'alchemy.cn18',
            pass: 'codingNonzas'
        }
    },
    google_client_id: "937758260052-p.apps.googleusercontent.com",
    google_client_secret: "WJuSvxaXdOAAeegppI0fGWEXVo",
    google_call_back_url: "http://pp:8000/users/auth/google/callback",
    jwt_secret: 'pp',
    morgan: {
        mode: 'dev',
        options: {stream: accessLogStream}
    }
}

const production =  {
    name: 'production',
    asset_path: process.env.CODEIAL_ASSET_PATH,
    session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,
    db: process.env.CODEIAL_DB,
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.CODEIAL_GMAIL_USERNAME,
            pass: process.env.CODEIAL_GMAIL_PASSWORD
        }
    },
    google_client_id: process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    google_call_back_url: process.env.CODEIAL_GOOGLE_CALLBACK_RURL,
    jwt_secret: process.env.CODEIAL_JWT_SECRET,
    morgan: {
        mode: 'combined',
        options: {stream: accessLogStream}
    }
}



module.exports = eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);
// module.exports = development;