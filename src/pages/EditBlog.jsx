import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditBlog() {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // This would typically fetch the blog data from an API
        setTitle('Existing Blog Title');
        setContent('Existing blog content...');
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // This would typically send updated data to an API
        console.log('Updating blog:', { id, title, content });
        navigate('/author/dashboard');
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Edit Blog</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1">Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div>
                    <label className="block mb-1">Content:</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded"
                        rows={10}
                    ></textarea>
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Update Blog
                </button>
            </form>
        </div>
    );
}