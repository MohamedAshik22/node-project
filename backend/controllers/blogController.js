const Blog = require('../models/blog');
const User = require('../models/user');


async function createBlog(req,res) {
    try{
        const{title, body} =req.body;
        const userId = req.user._id;



        const blogs = new Blog({title, body, createdBy: userId });
        await blogs.save();
        await User.findByIdAndUpdate(userId, { $push: { blogs: blogs._id } });
        res.status(201).json({
            status: true,
            message: 'Blog Created Successfully',
            data: blogs
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
        const blogs=await Blog.find()
        .populate('createdBy', 'userName email')
        .populate('comments')
        .exec();
        res.status(200).json({
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

async function getBlogById(req,res){
    try{
        const blog=await Blog.findById(req.params.id)
        .populate('createdBy', 'userName email')
        .populate('comments')
        .exec();
        if(!blog){
            return res.status(404).json({
                status:false,
                message: 'Blog Post Not Found',
                data:null
            })
        }
        res.status(200).json({
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


async function updateBlog(req,res){
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


async function deleteBlog(req,res){
    try{
        const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
        if(!deletedBlog){
            return res.status(404).json({
                status: false,
                message: 'Blog Post not Found',
                data:null
            })
        }
        res.status(200).json({
            status: true,
            message: 'Blog Post Deleted Succesfully',
            data: null
        })
    }catch(error){
        res.status(500).json({
            status:false,
            message:error.message,
            data:null
        })
    }
}


async function likeBlog(req, res) {
    try {
        const blogId = req.params.id;
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({
                status: false,
                message: 'Blog Post Not Found',
                data: null
            });
        }

        blog.likes += 1;
        await blog.save();

        res.status(200).json({
            status: true,
            message: 'Blog Post Liked Successfully',
            likes: blog.likes,
            data: blog
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message,
            data: null
        });
    }
}


module.exports= {createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog, likeBlog};