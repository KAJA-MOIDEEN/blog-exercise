import React, { useContext, useEffect, useState } from 'react';
import assets from '../assets/assets';
import Comments from '../components/Comments';
import { BlogContext } from '../context/BlogContext';
import { useParams } from 'react-router-dom';

const SinglePage = () => {
    const { comment, setComment, comments, setComments, getBlog } = useContext(BlogContext);
    const [blog, setBlog] = useState(null);
    const { id } = useParams();
    console.log(blog);
    
    useEffect( () => {
        const fetchedBlog = getBlog(id);
        if (fetchedBlog) {
            setBlog(fetchedBlog);
        }
    }, [id, getBlog]);

    if (!blog) return <p className='text-center text-gray-500'>Loading blog...</p>;

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (comment.trim() !== '') {
            setComments([...comments, comment]);
            setComment('');
        }
    };

    return (
        <div className='flex flex-col gap-6 py-10 px-4 md:px-10'>
            {/* Category Badge */}
            <p className='p-1 w-28 bg-blue-500 text-white text-center rounded-md'>{blog?.category || 'Technology'}</p>

            {/* Title */}
            <h1 className='text-4xl font-bold mb-6 leading-snug dark:text-white'>
                {blog?.title}
            </h1>

            {/* Author Info */}
            <div className='flex items-center gap-4 dark:text-white'>
                <img src={blog?.authorImage || assets.ProfileImg} alt="Author Profile" className='w-10 h-10 rounded-full' />
                <p className='text-base text-gray-600 dark:text-gray-300'>{blog?.author || 'Kaja Moideen'}</p>
                <p className='text-base text-gray-600 dark:text-gray-300'>{blog?.date || 'August 20, 2022'}</p>
            </div>

            {/* Blog Banner */}
            <img src={blog?.image || assets.HeroBanner} alt="Blog Hero Banner" className='w-full h-auto max-h-[42rem] object-cover rounded-lg shadow-md' />

            {/* Blog Content */}
            <div className='flex flex-col w-full mx-auto gap-5 text-justify dark:text-white'>
                {blog?.content?.split('\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                ))}
            </div>

            {/* Comment Section */}
            <div className='mt-10'>
                <h2 className='text-2xl font-bold dark:text-white mb-4'>Comments</h2>

                {/* Comment Form */}
                <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
                    <textarea
                        className='w-full p-3 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white'
                        placeholder='Write a comment...'
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        aria-label='Write a comment'
                    />
                    <button
                        type='submit'
                        className='text-black hover:text-white bg-blue-500 py-2 px-4 rounded-md dark:hover:bg-slate-400 border hover:bg-black dark:hover:text-black transition-all'
                    >
                        Submit
                    </button>
                </form>

                {/* Display Comments */}
                <Comments />
            </div>
        </div>
    );
};

export default SinglePage;