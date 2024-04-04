const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema ({
   
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    
    },

    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'

    },

    body: String,

  
});

const Comments = mongoose.model('Comments', commentSchema);

module.exports = Comments;