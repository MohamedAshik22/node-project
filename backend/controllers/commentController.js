const Comments = require('../models/comments');
const Blog = require('../models/blog');

async function createComment(req,res){
    try{
        const { user, blog, body } = req.body;
        const comment = new Comments({ user, blog, body });
        await comment.save();
        await Blog.findByIdAndUpdate(blog, { $push: { comments: comment._id } });
        res.status(201).json({
            status: true,
            message:'Comment created Successfully',
            data:comment
        });
    } catch (error) {
        res.status(400).json({ 
            status:false,
            message: error.message,
            data : {}
         });
    
    }
}

async function getAllComments(req,res){
    try{
        const comments = await Comments.find();
        res.status(200).json({
            status: true,
            message:'Comments retreived Successfully',
            data: comments
        });
    } catch (error) {
        res.status(500).json({ 
            status:false,
            message: error.message,
            data : {} 
        });
    }
}

async function getCommentById(req,res){
    try{
        const comment = await Comments.findById(req.params.id);
        res.status(200).json({
            status: true,
            message:'Comment retreived Successfully',
            data: comment
        });
    } catch (error) {
        res.status(500).json({ 
            status:false,
            message: error.message,
            data : {} 
        });
    }
}

async function updateComment(req, res) {
    try {
        const { user, blog, body } = req.body;
        const updatedComment = await Comments.findByIdAndUpdate(req.params.id, { user, blog, body }, { new: true });
        if (!updatedComment) {
            return res.status(404).json({ 
            status: false,
            message: 'Comment not found',
            data:{}
         });
        }
        res.status(200).json({
            ststus: true,
            message:"Comment updated successfully",
            data: updatedComment

        });
    } catch (error) {
        res.status(400).json({ 
            status:false,
            message: error.message,
            data : {} 
         });
    }
}

async function deleteComment(req, res) {
    try {
        const comment = await Comments.findByIdAndDelete(req.params.id);
        if (!comment) {
            return res.status(404).json({  
                status: false,
                message: 'Comment not found',
                data:{} 
            });
        }
        res.status(200).json({ 
        status:true,
        message: 'Comment deleted successfully',
        data:{} });
    } catch (error) {
        res.status(500).json({ 
            status:false,
            message: error.message,
            data : {} 
         });
    }
}

module.exports= {createComment, getAllComments, getCommentById, updateComment, deleteComment};