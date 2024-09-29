import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useBlog } from "@/hooks/use-blog"
import { useNavigate, useParams } from "react-router-dom"
import { generateSlug } from '@/lib/utils';
import PostForm from '@/components/custom/PostForm';
import PostPreview from '@/components/custom/PostPreview';

export default function EditBlog() {
    const { userData } = useAuth();
    const { getABlog } = useBlog();
    const { slug } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        content: '',
        category: '',
        status: 'active',
        feturedImage: null,
    });

    useEffect(() => {
        if (slug) {
            getABlog(slug).then((blog) => {
                setFormData({
                    title: blog.title,
                    description: blog.description,
                    content: blog.content,
                    category: blog.category,
                    status: blog.status,
                    feturedImage: blog.bannerImg,
                });
            })
        }
    }, []);

    const handleFormChange = (data) => {
        setFormData((prevData) => ({ ...prevData, ...data }));
    };

    const handleFormSubmit = (formData) => {
        const { title, description, content, category, status, feturedImage } = formData;
        console.log(feturedImage);
        const slug = generateSlug(title);
        createNewBlog(userData.id, title, description, slug, feturedImage, content, category, status);
        navigate("/author/posts")
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Create New Blog</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Blog Form */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">Write Blog</h2>
                    <PostForm formData={formData} onFormChange={handleFormChange} onFormSubmit={handleFormSubmit} />
                </div>

                {/* Blog Preview */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">Preview</h2>
                    <PostPreview
                        title={formData.title}
                        description={formData.description}
                        image={
                            formData.feturedImage instanceof File // Check if it's a File object
                                ? URL.createObjectURL(formData.feturedImage) // Generate object URL for the file
                                : formData.feturedImage // Use URL directly if it's already a string
                        }
                        content={formData.content}
                    />
                </div>
            </div>
        </div>
    );
}