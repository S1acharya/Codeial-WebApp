const mongoose = require('mongoose');


// create schema for posts
// it is one to many relation i.e., one user cna have multiple posts
const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        // user needs to be linked to userSchema
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'User'

    },
    // include the array of ids of all comments in this post schema itself
    // this is done when we want to display all comments on a post
    comments: [
        {
            type:  mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
},{
    // timestamps
    timestamps: true
});

// telling mongoose that this is a  model
const Post = mongoose.model('Post', postSchema);

// exporting model
module.exports = Post;