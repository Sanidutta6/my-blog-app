import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useBlog } from "@/hooks/use-blog";
import { useNavigate, useParams } from "react-router-dom";
import { generateSlug } from '@/lib/utils';
import PostForm from '@/components/custom/PostForm';
import PostPreview from '@/components/custom/PostPreview';

export default function EditBlog() {
    
    const { userData } = useAuth();
    const { blogs, loading } = useBlog();
    const { slug } = useParams();
    const navigate = useNavigate();

    // Initialize formData with an object
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        content: '',
        category: '',
        status: 'active',
        feturedImage: null,
    });

    useEffect(() => {
        if (blogs.length > 0) {
            const blog = blogs.find((blog) => blog.slug === slug);
            console.log("Edit Blog::", blog);
            setFormData({
                title: blog.title,
                description: blog.description,
                content: blog.content,
                category: blog.category,
                status: blog.status,
                feturedImage: blog.banner_img_url,
            });
        }
    }, []);

    const handleFormChange = (data) => {
        setFormData((prevData) => {
            // Compare old and new data to prevent unnecessary re-renders
            if (
                prevData.title === data.title &&
                prevData.description === data.description &&
                prevData.content === data.content &&
                prevData.category === data.category &&
                prevData.status === data.status &&
                prevData.feturedImage === data.feturedImage
            ) {
                return prevData; // No changes, return the previous state
            }
            return { ...prevData, ...data }; // Update state only if there's a change
        });
    };

    const handleFormSubmit = async (formData) => {
        const { title, description, content, category, status, feturedImage } = formData;
        const newSlug = generateSlug(title);
        await createNewBlog(userData.id, title, description, newSlug, feturedImage, content, category, status);
        navigate("/author/posts");
    };

    // If loading, show the loading state
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Edit Blog</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Blog Form */}
                {formData.title !== "" && (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Write Blog</h2>
                        <PostForm post={formData} onFormChange={handleFormChange} onFormSubmit={handleFormSubmit} />
                    </div>
                )}

                {/* Blog Preview */}
                {formData.title !== "" && (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Preview</h2>
                        <PostPreview
                            title={formData.title}
                            description={formData.description}
                            image={
                                formData.feturedImage instanceof File
                                    ? URL.createObjectURL(formData.feturedImage)
                                    : formData.feturedImage
                            }
                            content={formData.content}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}