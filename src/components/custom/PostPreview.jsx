import parse from 'html-react-parser';
import { TentTree } from 'lucide-react';

const PostPreview = ({ title, description, image, content }) => {
  return (
    <div className="flex flex-col lg:flex-row bg-background border rounded">
      <div className="flex-1 space-y-12 p-4 md:p-8 lg:p-12">
        <section id="intro" className="space-y-4">
          <div className="relative h-[400px] overflow-hidden rounded-lg">
            {image ? (
              <img
                src={image}
                alt="Featured Image"
                width={1200}
                height={600}
                className="h-full w-full object-cover"
                style={{ aspectRatio: "1200/600", objectFit: "cover" }}
              />
            ) : (
              <div className="flex items-center justify-center h-full w-full">
                <TentTree className="w-full h-full" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 px-6 py-4 text-white">
              <h1 className="text-3xl font-bold">{title}</h1>
              <p className="text-muted-background text-sm">{description}</p>
              <div className="mt-2 flex items-center space-x-4 text-sm">
                <div>John Doe</div>
                <div>•</div>
                <div>July 19, 2024</div>
              </div>
            </div>
          </div>
        </section>
        <article className="max-w-none prose prose-invert prose-img:rounded-xl prose-a:text-blue-600">
          {/* Render the blog content */}
          {parse(content)}
        </article>
      </div>
    </div>
  );
};

export default PostPreview;
