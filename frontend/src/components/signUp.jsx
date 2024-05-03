import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [passwordsMatchError, setPasswordsMatchError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setPasswordsMatchError("Passwords don't match");
      console.error("Passwords don't match");
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/users', formData);
      console.log('Signup successful:', response.data);
      setFormData({
        userName: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      setPasswordsMatchError('');
    } catch (error) {
      console.error('Signup failed:', error.response.data);
    }
  };

  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/');
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>

        <label htmlFor="userName" className="block text-sm font-medium leading-6 text-gray-900">
          User Name
        </label>
        <div className="mt-2">
          <input
            id="userName"
            name="userName"
            type="string"
            required
            value={formData.userName}
            onChange={handleChange}
            className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>

        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
          Email address
        </label>
        <div className="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
          Password
        </label>
        <div className="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            value={formData.password}
            onChange={handleChange}
            className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
          Confirm Password
        </label>
        <div className="mt-2">
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      {passwordsMatchError && (
        <p className="text-red-500">{passwordsMatchError}</p>
      )}

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Sign up
        </button>
      </div>
      <div className="mt-4 flex items-center justify-center">
        <p className="mr-2 text-sm text-gray-600">Already have an account?</p>
        <button onClick={handleLoginClick} className="text-sm font-semibold text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline">
          Log In
        </button>
      </div>
    </form>
  );
}

export default Signup;
