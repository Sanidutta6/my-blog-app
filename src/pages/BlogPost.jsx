import { useBlog } from '@/hooks/use-blog';
import { useParams, Link } from 'react-router-dom';
import parse from "html-react-parser"
import { useEffect, useState } from 'react';

export default function BlogPost() {
    const { slug } = useParams();
    const { loading, getABlog } = useBlog();
    const [blog, setBlog] = useState(null); // Initialize with null for loading state

    useEffect(() => {
        const fetchBlog = async () => {
            const fetchedBlog = await getABlog(slug);
            setBlog(fetchedBlog);
        };
        fetchBlog();
    }, [slug, getABlog]);

    return (
        <div>
            {!loading && blog ? (
                <div className="flex flex-col lg:flex-row bg-background">
                    <div className="flex-1 space-y-12 p-4 md:p-8 lg:p-12">
                        <section id="intro" className="space-y-4">
                            <div className="relative h-[400px] overflow-hidden rounded-lg">
                                <img
                                    src={blog.banner_img_url}
                                    alt="Featured Image"
                                    width={1200}
                                    height={600}
                                    className="h-full w-full object-cover"
                                    style={{ aspectRatio: "1200/600", objectFit: "cover" }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 px-6 py-4 text-white">
                                    <h1 className="text-3xl font-bold">{blog.title}</h1>
                                    <p className="text-muted-background text-sm">{blog.description}</p>
                                    <div className="mt-2 flex items-center space-x-4 text-sm">
                                        <div>John Doe</div>
                                        <div>•</div>
                                        <div>July 19, 2024</div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <article className="max-w-none prose prose-invert prose-img:rounded-xl prose-a:text-blue-600">
                            {/* Use ReactMarkdown to render the blog content */}
                            {parse(blog.content)}
                        </article>
                    </div>
                </div>
            ) : (
                "Fetching Details..."
            )}
        </div>
    );
}