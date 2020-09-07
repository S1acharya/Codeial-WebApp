// action to create API
module.exports.index = function(req , res){
    return res.json(200 , {
        message: "List of posts of version v2",
        posts: []
    })
}
