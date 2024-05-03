// auth.js
import axios from 'axios';

const login = async (email, password) => {
  try {
    const response = await axios.post('http://localhost:3000/login', {
      email,
      password
    });
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export default login;
