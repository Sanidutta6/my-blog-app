import { createContext, useContext, useState, useEffect } from 'react';
import { getPosts, getAuthorPosts, createPost, updatePost, deletePost } from "@/conf/DB";

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [blogs, setBlogs] = useState([]);
    const [authorPosts, setAuthorPosts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await getAllBlogs();
            setLoading(false);
        };
        fetchData();
    }, []);

    const getAllBlogs = async () => {
        setLoading(true);
        setError(null);
        const res = await getPosts();
        if (res.success) {
            setBlogs(res.data);
        } else {
            setError(res.error);
        }
        setLoading(false);
    };

    const getAuthorBlogs = async (authorId) => {
        setLoading(true);
        setError(null);
        const res = await getAuthorPosts(authorId);
        if (res.success) {
            setAuthorPosts(res.data);
        } else {
            setError(res.error);
        }
        setLoading(false);
    };

    const getABlog = async (slug) => {
        setLoading(true);
        let resultBlog = null;
    
        // Check if blogs is an array before accessing its length
        if (!Array.isArray(blogs) || blogs.length === 0) {
            await getAllBlogs(); // Await fetching all blogs
        }
    
        resultBlog = blogs.find((blog) => blog.slug === slug); // Use cached blogs
        setLoading(false);
        return resultBlog;
    };    

    const createNewBlog = async (authorId, title, description, slug, bannerImg, content, category, status) => {
        setLoading(true);
        const res = await createPost(authorId, title, description, slug, bannerImg, content, category, status);
        if (res.success) {
            setBlogs((prevBlogs) => [...prevBlogs, res.data]);
        }
        setLoading(false);
    };

    const updateBlog = async (blogId, updatedData) => {
        setLoading(true);
        const res = await updatePost(blogId, updatedData);
        if (res.success) {
            setBlogs((prevBlogs) =>
                prevBlogs.map((blog) =>
                    blog.id === blogId ? { ...blog, ...updatedData } : blog
                )
            );
        }
        setLoading(false);
    };

    const deleteBlog = async (blogId) => {
        setLoading(true);
        const res = await deletePost(blogId);
        if (res.success) {
            setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== blogId));
        }
        setLoading(false);
    };

    return (
        <BlogContext.Provider value={{ loading, blogs, authorPosts, getAllBlogs, getAuthorBlogs, getABlog, createNewBlog, updateBlog, deleteBlog, error }}>
            {children}
        </BlogContext.Provider>
    );
};

export const useBlog = () => {
    return useContext(BlogContext);
};