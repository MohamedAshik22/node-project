const jwt = require('jsonwebtoken');
const User = require('../models/user');


const verifyToken = async (req, res, next) => {

  const token = req.header('Authorization');

  if (!token)
    return res.status(401).json(
      {
        status: false,
        message: 'Access denied. No token provided.',
      });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);
    if (!user) return res.status(404).json(
      {
        status: false,
        message: 'User Not Found'
      }
    );
    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        status: false,
        message: 'Token expired. Please log in again.',
      });
    } else {
      res.status(400).json(
        {
          status: false,
          message: 'Invalid token.'
        });
    }
  }
}

  module.exports = { verifyToken };