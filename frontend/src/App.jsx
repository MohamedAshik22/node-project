import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/login';
import Signup from './components/signUp';
import Home from './components/home';
import NewBlog from './components/newBlogs';
import Blogs from './components/blogs';
import BlogDetailPage from './components/blogDetailPage';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Routes>
            <Route path="/" element={<Login onLoginSuccess={handleLoginSuccess} />} />
            {/* <Route path="*" element={isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/" />} /> */}
            <Route path="/signup" element={<Signup />} />
            {/* <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/" />} /> */}
            <Route path="/home" element={<Home />} />
            <Route path="/blog/create" element={<NewBlog />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blog-detail/:blogId" element={<BlogDetailPage />} />

          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

