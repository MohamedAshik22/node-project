const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema ({
   
    title: String,
    
    body: String,

    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comments'

    }],

    likes: {
        type: Number,
        default: 0
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;