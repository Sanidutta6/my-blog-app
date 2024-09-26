import { createContext, useContext, useState, useEffect } from 'react';
import { getPosts, getAuthorPosts, createPost, updatePost, deletePost } from "@/conf/DB";

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [blogs, setBlogs] = useState([]);
    const [authorPosts, setAuthorPosts] = useState([]);

    useEffect(() => {
        setLoading(true);
        getAllBlogs();
        setLoading(false);
    }, []);

    const getAllBlogs = async () => {
        setLoading(true);
        const res = await getPosts();

        if (res.success) {
            setBlogs(res.data);
        }
        setLoading(false);
    };

    const getAuthorBlogs = async (authorId) => {
        setLoading(true);
        const res = await getAuthorPosts(authorId);

        if (res.success) {
            setAuthorPosts(res.data);
        }
        setLoading(false);
    };

    const getABlog = (slug) => {
        setLoading(true);
        if (blogs.length === 0) {
            getAllBlogs();
        }
        const resultBlog = blogs.find((blog) => blog.slug === slug);
        setLoading(false);
        return resultBlog;
    }

    const createNewBlog = async (authorId, title, slug, bannerImg, content, category, status) => {
        setLoading(true);
        const res = await createPost(authorId, title, slug, bannerImg, content);

        if (res.success) {
            getAllBlogs(); // Refresh blogs after creation
        }
        setLoading(false);
    };

    const updateBlog = async (blogId, updatedData) => {
        setLoading(true);
        const res = await updatePost(blogId, updatedData);

        if (res.success) {
            getAllBlogs(); // Refresh blogs after update
        }

        setLoading(false);
    };

    const deleteBlog = async (blogId) => {
        setLoading(true);
        const res = await deletePost(blogId);

        if (res.success) {
            getAllBlogs(); // Refresh blogs after deletion
        }
        setLoading(false);
    };

    return (
        <BlogContext.Provider value={{ loading, blogs, authorPosts, getAllBlogs, getAuthorBlogs, getABlog, createNewBlog, updateBlog, deleteBlog }}>
            {children}
        </BlogContext.Provider>
    );
};

export const useBlog = () => {
    return useContext(BlogContext);
};