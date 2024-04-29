import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



const LikeButton = () => {
    const [likes, setLikes] = useState(0);

    const handleLikeClick = () => {
        setLikes(likes + 1);
    };

    return (
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleLikeClick}>
            Like ({likes})
        </button>
    );
};

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get('http://localhost:3000/blogs');
                if (response.data.status) {
                    setBlogs(response.data.data);
                } else {
                    console.error('Error fetching blogs:', response.data.message);
                    setError(response.data.message);
                }
            } catch (error) {
                console.error('Error fetching blogs:', error);
                setError('Failed to fetch blogs. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    },

        []);

    const navigateToBlog = (blogId) => {
        navigate(`/blog-detail/${blogId}`);
    };

   

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <div>
                <div className=" p-8 overflow-y-auto">
                    {blogs.map(blog => (
                        <div key={blog._id} className="border-b border-gray-300 py-4" >
                            <div className="text-xl font-semibold cursor-pointer" onClick={() => navigateToBlog(blog._id)}>{blog.title}</div>
                            <p className="mt-2">{blog.body}</p>
                            <div className="flex space-x-4">
                                <LikeButton />
                                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Comment</button>
                                <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">Share</button>
                            </div>
                           
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
};

export default Blogs;