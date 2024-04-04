const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema ({
   
    title: String,

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    
    },

    body: String,

    comments: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comments'

    }

  
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;