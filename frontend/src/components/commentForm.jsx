import React, { useState } from 'react';
import axios from 'axios';

const CommentForm = ({ blogId, onCommentAdded }) => {
    const [commentText, setCommentText] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(`http://localhost:3000/blogs/${blogId}/comments`, {
                text: commentText
            });
            if (response.data.status) {
                onCommentAdded(response.data.data);
                setCommentText('');
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError('Failed to submit comment. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="comment-form">
            <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add your comment"
                required
                className="w-full p-2 border rounded"
            />
            <button type="submit" className="mt-2 text-blue-500 hover:text-blue-700 font-bold py-1 px-2 rounded">
                {loading ? 'Submitting...' : 'Submit'}
            </button>
            {error && <div className="text-red-500 mt-2">{error}</div>}
        </form>
    );
};

export default CommentForm;
