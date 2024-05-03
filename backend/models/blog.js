const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema ({
   
    title: String,

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    
    },

    body: String,

    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comments'

    }],

    likes: {
        type: Number,
        default: 0
    }

  
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;