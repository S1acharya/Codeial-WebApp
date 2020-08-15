// through next line , we are connecting home_controller.js to home.ejs

module.exports.home = function(req , res){
    // console.log(req.cookies);
    // // to edit the cookie
    // res.cookie('saket' , 2000);
    return res.render('home' , {
        title: "CodialHome"
    });

    // return res.end('<h1>Express is up for Codeial!</h1');
}




// example
// module.exports.actionName = function(req , res){}