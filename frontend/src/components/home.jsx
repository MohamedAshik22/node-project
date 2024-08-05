import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Blogs from './blogs';
import { useNavigate } from 'react-router-dom';


const Home = () => {

  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve the username from localStorage
    const storedUsername = localStorage.getItem('userName');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  }


  return (
    <div className="h-screen  flex">
      <div className="bg-blue-300 text-gray-600 w-1/3 flex-none  relative">
        <div className="px-6 py-4 lg:px-8 flex justify-between items-center">
          <div className="text-lg font-bold px-1 "> {username}</div>
        </div>
        <nav>
          <ul className="py-4">
            <li className="px-4 py-2 hover:bg-gray-400"> <button><Link to="/user-blogs">My Blogs</Link></button></li>
            <li className="px-4 py-2 hover:bg-gray-400"> <button>Filter</button></li>
          </ul>
        </nav>
        <div className="flex w-full bg-gray-400 font-bold text-red-700 justify-center py-3 absolute bottom-0">
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <div className="flex-grow flex flex-col">
        <div className="flex items-center px-4">
          <form className="mr-2" role="search">
            <input type="search"
              placeholder="Search" aria-label="Search contact"
              className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
               />
          </form>
          <div> <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"><Link to="/blog/create">Create</Link></button> </div >
        </div>
        <div className="flex-grow overflow-y-auto">
          <Blogs />
        </div>




      </div>
    </div>
  


  );
};

export default Home;
