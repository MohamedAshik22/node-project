const { loginUser } = require('../authentication/auth');

async function login(req, res) {
  const { email, password } = req.body;
  try {
    const token = await loginUser(email, password);
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
}

module.exports = { login };