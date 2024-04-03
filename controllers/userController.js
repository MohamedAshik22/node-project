const User = require('../models/user');

async function createUser(req,res) {
    try{
        const { userName, email, password } = req.body;
        const newUser = new User({userName, email, password});
        await newUser.save();

        res.status(201).json({
            status: true,
            message: 'User Created Successfully',
            data:newUser
        
        });
    }catch (error){
        res.status(500).json({
            status: false,
            message: error.message,
            data: null
        });
    }
}


async function getUsers(req,res) {
    try{
        const { page =1, limit =10} = req.query;
        const users = await User.find()
        .select(-profile)
        .limit(limit*1)
        .skip((page-1)*limit)
        .exec();
        const count= await User.countDocuments();
        res.status(200).json({
            status:true,
            message: ' Users retrieved Successfully',
            data: {
                users,
                totalPages: Math.ceil(count/limit),
                currentPage: page
            }
        })
    }catch(error){
        res.status(500).json({
            status:false,
            message: error.message,
            data: null
        });
    }
}



async function getUserById (req,res){
    try{
        const user = await User.findById(req.params.id).select(-profile);
        if(!user) {
            return res.status(404).json({
                staus:false,
                message: 'User not Found',
                data: null
            })
        }
    
        res.status(200).json({
            status:true,
            message: 'User retrieved Successfully',
            data: user
        })
    }catch(error){
        res.status(500).json({
            status:false,
            message:error.message,
            data:null
        })
    }
}


async function updateUser(req,res){
    try{
        const {userName, email, password} =req.body;
        const user = await User.findByIdAndUpdate(req.params.id,{userName, email, password},{new:true});
        if (!user) {
            return res.status(404).json({
                status:false,
                message: 'User not Found',
                data:null

            })
        }
        res.status(200).json({
            status:true,
            message:'User updated successfully',
            data: user
        })
    }catch(error){
        res.status(500).json({
            status:false,
            message:error.message,
            data:null
        })
    }
}


async function deleteUser(req,res){
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user){
            return res.status(404).json({
                status: false,
                message: 'User not Found',
                data:null
            })
        }
        res.status(200).json({
            status: true,
            message: 'User Deleted Succesfully',
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

module.exports= {createUser,getUsers, getUserById, updateUser, deleteUser};