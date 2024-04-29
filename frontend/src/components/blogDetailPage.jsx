import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


function BlogDetailPage() {

  
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();

  useEffect(() => {
    console.log(params)
    const { blogId } = params;
      const fetchBlog = async () => {
          try {
              const response = await axios.get(`http://localhost:3000/blogs/${blogId}`);
              if (response.data.status) {
                  setBlog(response.data.data);
              } else {
                  console.error('Error fetching blog:', response.data.message);
                  setError(response.data.message);
              }
          } catch (error) {
              console.error('Error fetching blog:', error);
              setError('Failed to fetch blog. Please try again later.');
          } finally {
              setLoading(false);
          }
      };

      fetchBlog();
  }, [params]);

  if (loading) {
      return <div>Loading...</div>;
  }

  if (error) {
      return <div>Error: {error}</div>;
  }

  if (!blog) {
      return <div>Blog not found</div>;
  }

  return (
      <div>
          <h2 className="text-xl font-semibold">{blog.title}</h2>
          <p className="mt-2">{blog.body}</p>
      </div>
  );
};


export default BlogDetailPage;
