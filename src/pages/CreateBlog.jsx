import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useBlog } from "@/hooks/use-blog"
import { useNavigate } from "react-router-dom"
import { generateSlug } from '@/lib/utils';
import PostForm from '@/components/custom/PostForm';
import PostPreview from '@/components/custom/PostPreview';

export default function CreateBlog() {
    const { userData } = useAuth();
    const { createNewBlog } = useBlog();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: '',
        status: 'active',
        feturedImage: null,
    });

    const handleFormChange = (data) => {
        setFormData((prevData) => ({ ...prevData, ...data }));
    };

    const handleFormSubmit = (formData) => {
        console.log(userData.id);
        const { title, content, category, status, feturedImage } = formData;
        const slug = generateSlug(title);
        createNewBlog(userData.id, title, slug, feturedImage, content, category, status);
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
                        image={formData.feturedImage ? URL.createObjectURL(formData.feturedImage) : null}
                        content={formData.content}
                    />
                </div>
            </div>
        </div>
    );
}
