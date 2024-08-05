import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserBlogs = () => {
  const [user, setUser] = useState(null);
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem('id');

      if (!userId) {
        setError('User not logged in');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:3000/users/${userId}`);
          if (response.data.status) {
            setUser(response.data.data.user);
            setBlogPosts(response.data.data.userBlogs);
          } else {
            setError(response.data.message);
          }
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
    };

    fetchUserData();
  
  }, []);



if (loading) {
  return <div>Loading...</div>;
}

if (error) {
  return <div>Error: {error}</div>;
}

return (
  <div>
      {user && (
        <div>
          <h1>{user.userName}</h1>
          <h1><b>My Blogs</b></h1>
        </div>
      )}
      {blogPosts.length === 0 ? (
        <div>No blog posts found</div>
      ) : (
        blogPosts.map(post => (
          <div key={post._id} className="blog-post">
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </div>
        ))
      )}
    </div>
);
};

export default UserBlogs;
