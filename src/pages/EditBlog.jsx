import { useEffect, useState } from 'react';
import { useBlog } from "@/hooks/use-blog";
import { useNavigate, useParams } from "react-router-dom";
import { generateSlug } from '@/lib/utils';
import PostForm from '@/components/custom/PostForm';
import PostPreview from '@/components/custom/PostPreview';

export default function EditBlog() {
    const { blogs, loading, updateBlog } = useBlog();
    const { slug } = useParams();
    const navigate = useNavigate();

    // Initialize formData with an object
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        content: '',
        category: '',
        status: 'active',
        featuredImage: null,
    });
    const [blogMeta, setBlogMeta] = useState({});

    useEffect(() => {
        if (blogs.length > 0) {
            const blog = blogs.find((blog) => blog.slug === slug);
            if (blog) {
                setFormData({
                    title: blog.title,
                    description: blog.description,
                    content: blog.content,
                    category: blog.category,
                    status: blog.status,
                    featuredImage: blog.banner_img_url,
                });
                setBlogMeta({
                    id: blog.id,
                    authorId: blog.author_id,
                });
            }
        }
    }, []);

    const handleFormChange = (data) => {
        setFormData((prevData) => {
            // Keep the 'id' and 'authorId' from the previous data, while merging the new data
            return {
                ...prevData,
                ...data,
            };
        });
    };

    const handleFormSubmit = async (formData) => {
        const { title, description, content, category, status, featuredImage } = formData;
        const newSlug = generateSlug(title);
        await updateBlog(blogMeta.authorId, blogMeta.id, title, description, newSlug, featuredImage, content, category, status);
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
                        <h2 className="text-xl font-semibold mb-4">Change Blog</h2>
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
                                formData.featuredImage instanceof File
                                    ? URL.createObjectURL(formData.featuredImage)
                                    : formData.featuredImage
                            }
                            content={formData.content}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}