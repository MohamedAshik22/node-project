const jwt = require('jsonwebtoken');

function generateToken(user) {
  return jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });
}

async function loginUser(email, password) {
  // Validate credentials against user data in the database
  const user = await User.findOne({ email, password });
  if (!user) {
    throw new Error('Invalid email or password');
  }
  
  return generateToken(user);
}

module.exports = { loginUser };