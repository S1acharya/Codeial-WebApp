// through next line , we are connecting home_controller.js to home.ejs

module.exports.home = function(req , res){
    return res.render('home' , {
        title: "CodialHome"
    });

    // return res.end('<h1>Express is up for Codeial!</h1');
}




// example
// module.exports.actionName = function(req , res){}