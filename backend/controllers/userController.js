const User = require('../models/user');
const Blog = require('../models/blog')
const bcrypt = require('bcrypt');


async function createUser(req, res) {
    const { userName, email, password } = req.body;
    try {

        const existingUser = await User.findOne({ $or: [{ userName }, { email }] });
        if (existingUser) {
            return res.status(400).json({
                status: false,
                message: 'User with the same email or username already exists',
                data: null
            });
        }
        const newUser = new User({ userName, email, password });
        await newUser.save();
        const token = newUser.generateAccessToken();
        const refToken = await newUser.generateRefreshToken();
        res.status(201).json({
            status: true,
            message: 'User Created Successfully',
            data: { user: newUser, token }

        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: false,
            message: error.message || 'Something Went Wrong',
            data: null
        });
    }
}


async function getUsers(req, res) {
    try {
        const { page = 1, limit = 10 } = req.query;
        const users = await User.find()
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
        const count = await User.countDocuments();
        res.status(200).json({
            status: true,
            message: ' Users retrieved Successfully',
            data: {
                users,
                totalPages: Math.ceil(count / limit),
                currentPage: page
            }
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message,
            data: null
        });
    }
}



async function getUserById(req, res) {
    try {
        const user = await User.findById(req.params.id)
        
        if (!user) {
            return res.status(404).json({
                staus: false,
                message: 'User not Found',
                data: null
            })
        }

        const userBlogs = await Blog.find({ user: user._id });

        res.status(200).json({
            status: true,
            message: 'User retrieved Successfully',
            data: { user, userBlogs } 
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message,
            data: null
        })
    }
}


async function updateUser(req, res) {
    try {
        const { userName, email } = req.body;
        const user = await User.findByIdAndUpdate(req.params.id, { userName, email }, { new: true });
        if (!user) {
            return res.status(404).json({
                status: false,
                message: 'User not Found',
                data: null

            })
        }
        res.status(200).json({
            status: true,
            message: 'User updated successfully',
            data: user
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message,
            data: null
        })
    }
}


async function deleteUser(req, res) {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({
                status: false,
                message: 'User not Found',
                data: null
            })
        }
        res.status(200).json({
            status: true,
            message: 'User Deleted Succesfully',
            data: null
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message,
            data: null
        })
    }
}

async function login(req, res) {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json(
                {
                    status: false,
                    message: 'Invalid username or password'
                });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json(
                {
                    status: false,
                    message: 'Invalid username or password'
                });
        }
        const token = user.generateAccessToken();
        res.status(200).json(
            {
                status: true,
                message: 'Login successful',
                data: { user, token }
            });
    } catch (error) {
        res.status(500).json(
            {
                status: false,
                message: error.message
            });
    }
}



module.exports = { createUser, getUsers, getUserById, updateUser, deleteUser, login };