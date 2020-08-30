// create action to get flash messages
module.exports.setFlash = function(req , res , next){
    res.locals.flash = {
        'success': req.flash('success'),
        'error': req.flash('error')
    }

    next();
}