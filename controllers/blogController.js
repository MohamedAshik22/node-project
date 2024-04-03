const Blog = require('../models/blog');

async function createBlog(req,res) {
    try{
        const{title, body, user} =req.body;
        const blog = new Blog({title, body, user});
        await blog.save();
        res.status(201).json({
            status: true,
            message: 'Blog Created Successfully',
            data: blog
        })
    }catch(error){
        res.status(500).json({
            status:false,
            message:error.message,
            data:null
        })
    }
}


async function getAllBlogs(req,res){
    try{
        const blogs=await Blog.find().populate('user', 'userName email');
        res.status(201).json({
            status:true,
            message:'All Blog Post retrieved successfully',
            data:blogs
        })
    }catch(error){
        res.status(500).json({
            status:false,
            message:error.message,
            data:null
        })
    }
}

async function getBlogsById(req,res){
    try{
        const blog=await Blog.findById(req.params.id).populate('user', 'userName email');
        if(!blog){
            return res.status(404).json({
                status:false,
                message: 'Blog Post Not Found',
                data:null
            })
        }
        res.status(201).json({
            status:true,
            message:'Blog Post retrieved successfully',
            data:blog
        })
    }catch(error){
        res.status(500).json({
            status:false,
            message:error.message,
            data:null
        })
    }
}


async function updateBlogs(req,res){
    try{
        const {title, body}=req.body;
        const updatedBlog= await Blog.findByIdAndUpdate(req.params.id,{title,body}, {new:true});
        if(!updatedBlog){
            return res.status(404).json({
                status:false,
                message: 'Blog Post Not Found',
                data:null
            })
        }
         res.status(201).json({
            status:true,
            message:'Blog Post updated successfully',
            data:updatedBlog
        })
    }catch(error){
        res.status(500).json({
            status:false,
            message:error.message,
            data:null
        })
    }
}
