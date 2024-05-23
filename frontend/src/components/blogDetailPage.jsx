import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


function BlogDetailPage() {


    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [comments, setComments] = useState([]);
    const [commentInput, setCommentInput] = useState('');
    const [showComments, setShowComments] = useState(false);
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

        const fetchComments = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/comments?blogId=${blogId}`);
                if (response.data.status) {
                    setComments(response.data.data);
                } else {
                    console.error('Error fetching comments:', response.data.message);
                    setError(response.data.message);
                }
            } catch (error) {
                console.error('Error fetching comments:', error);
                setError('Failed to fetch comments. Please try again later.');
            }
        };

        fetchBlog();
        fetchComments();
    }, [params]);

    const handleCommentSubmit = async () => {
        const { blogId } = params;
        const userId = localStorage.getItem('id'); 
        try {
            const response = await axios.post('http://localhost:3000/comments', {
                userId,
                blogId,
                body: commentInput,
            });
            if (response.data.status) {
                setComments([...comments, response.data.data]);
                setCommentInput('');
            } else {
                console.error('Error submitting comment:', response.data.message);
                setError(response.data.message);
            }
        } catch (error) {
            console.error('Error submitting comment:', error);
            setError('Failed to submit comment. Please try again later.');
        }
    };
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
            <div className="mt-4 flex space-x-4">
                <button className="px-4 py-2 bg-blue-500 text-white rounded">Like</button>
                <button className="px-4 py-2 bg-blue-500 text-white rounded">Share</button>
                <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={() => setShowComments(!showComments)}>Comment</button>
            </div>       
            {showComments && (
                <div className="mt-4">
                    <div>
                        <input
                            type="text"
                            value={commentInput}
                            onChange={(e) => setCommentInput(e.target.value)}
                            placeholder="Write a comment..."
                            className="border p-2 w-full"
                        />
                        <button onClick={handleCommentSubmit} className="px-4 py-2 bg-green-500 text-white rounded mt-2">Submit</button>
                    </div>
                    <div className="mt-4">
                        {comments.map((comment) => (
                            <div key={comment._id} className="border-b py-2">
                                <p>{comment.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};


export default BlogDetailPage;
