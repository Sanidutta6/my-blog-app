import { useNavigate } from 'react-router-dom';
import { useBlog } from '@/hooks/use-blog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ListFilter, Search } from 'lucide-react';
import { filterTitleInBlog, filterCategoryInBlog } from "@/lib/utils"
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useState } from 'react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuCheckboxItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"

export default function BlogList() {
    const [searchTitle, setSearchTitle] = useState('');
    const [searchcategory, setSearchCategory] = useState('');
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const { blogs } = useBlog();
    const navigate = useNavigate();

    const handleSearch = (searchIn, searchValue) => {
        if (searchIn === "title") {
            setFilteredBlogs(filterTitleInBlog(searchValue, blogs));
        } else if (searchIn === "category") {
            setFilteredBlogs(filterCategoryInBlog(searchValue, blogs));
        }
    }

    return (
        <section>
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold mb-4">All Blogs</h1>
                <div className="flex items-center justify-between">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="h-8 gap-1">
                                <ListFilter className="h-3.5 w-3.5" />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                    Categories
                                </span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuCheckboxItem checked>
                                All
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem>Science</DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem>
                                Technology
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem>
                                Health
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem>
                                Books
                            </DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <form className="ml-2 flex-1 sm:flex-initial">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                value={searchTitle}
                                onChange={(e) => { handleSearch("title", e.target.value); setSearchTitle(e.target.value); }}
                                placeholder="Search blogs..."
                                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                            />
                        </div>
                    </form>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4 md:p-6">
                {filteredBlogs.length > 0 ? (
                    filteredBlogs.map((blog) => (<Card key={blog.id} className="overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl">
                        <img
                            src={blog.banner_img_url}
                            alt={blog.title}
                            width="300"
                            height="200"
                            className="object-cover w-full"
                            style={{ aspectRatio: "300/200", objectFit: "cover" }}
                        />
                        <CardContent className="p-4">
                            <h3 className="text-lg font-semibold mb-2">{blog.title}</h3>
                            <p className="text-muted-foreground text-sm line-clamp-2">
                                {blog.description}
                            </p>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={() => { navigate(`/blogs/${blog.slug}`) }}>Read</Button>
                        </CardFooter>
                    </Card>))
                ) : "No Blogs Yet"}

            </div>
        </section>
    );
}