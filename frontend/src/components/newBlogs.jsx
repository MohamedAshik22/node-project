import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const NewBlog = () => {
    const initialFormData = {
        title: '',
        body: ''
    };

    const [formData, setFormData] = useState(initialFormData);

    const { title, body } = formData;

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/blogs', formData);
            console.log(response.data);
            setFormData(initialFormData);
        } catch (error) {
            console.error('Error Submitting Blog:', error)
        }
    };

    const handleReset = () => {
        setFormData(initialFormData);
    };

    return (
        <>
            <div>
                <header className="px-6 py-4 lg:px-8 flex justify-between items-center bg-green-700">
                    <div className="flex">
                        <div>New Blog</div>
                    </div>
                </header>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="title">Title</label>
                        <div>
                            <input
                                type="text"
                                name="title"
                                value={title}
                                onChange={handleChange}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="body">Content</label>
                        <div>
                            <input
                                type="text"
                                name="body"
                                value={body}
                                onChange={handleChange}
                                className="block w-full rounded-md border-0 py-1.5 min-h-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <button
                            type="submit"
                            className="flex w-half justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Submit
                        </button>



                        <button
                            type="button"
                            onClick={handleReset}
                            className="flex w-half justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Reset
                        </button>


                    </div>

                    <div>
                        <Link to="/home">Back</Link>

                    </div>
                </form>
            </div>
        </>
    );
};

export default NewBlog;
