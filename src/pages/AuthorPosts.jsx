import { Ellipsis, PlusCircle, ListFilter, Search, Pencil, Trash } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuCheckboxItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/hooks/use-auth"
import { useBlog } from "@/hooks/use-blog"
import { useEffect, useState } from "react"
import { formatDate, filterTitleInBlog } from "@/lib/utils"

const AuthorPosts = () => {
    const [searchText, setSearchText] = useState("");
    const { loading, authorPosts, getAuthorBlogs, deleteBlog } = useBlog();
    const [filteredPosts, setFilteredPosts] = useState(authorPosts);
    const { userData } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            await getAuthorBlogs(userData.id);
        })();
    }, []);

    useEffect(() => {
        setFilteredPosts(filterTitleInBlog(searchText, authorPosts));
    }, [searchText, authorPosts]);

    return (
        <div className="m-6">
            <div className="flex items-center justify-end gap-2">
                <form className="ml-auto flex-1 sm:flex-initial">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            placeholder="Search blogs..."
                            className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                        />
                    </div>
                </form>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="h-8 gap-1">
                            <ListFilter className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                Filter
                            </span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuCheckboxItem checked>
                            Active
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>
                            Archived
                        </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Button size="sm" className="h-8 gap-1" onClick={() => {
                    navigate("/blogs/create-new");
                }}>
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Add New Blog
                    </span>
                </Button>
            </div>
            <div className="mt-6">
                {(!loading && authorPosts) && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Posts</CardTitle>
                            <CardDescription>
                                View, edit, and delete your blog posts.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px] sm:table-cell">
                                            Image
                                        </TableHead>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="hidden md:table-cell">Created at</TableHead>
                                        <TableHead>
                                            <span className="sr-only">Actions</span>
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredPosts.length > 0 && filteredPosts.map((post) => (
                                        <TableRow key={post.id}>
                                            <TableCell className="hidden sm:table-cell">
                                                <img
                                                    alt="Product image"
                                                    className="aspect-square rounded-md object-cover"
                                                    height="64"
                                                    src={post.banner_img_url}
                                                    width="64"
                                                />
                                            </TableCell>
                                            <TableCell className="font-medium hover:underline cursor-pointer" onClick={() => { navigate(`/blogs/${post.slug}`) }}>
                                                {post.title}
                                            </TableCell>
                                            <TableCell>
                                                {post.category}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline">{post.status}</Badge>
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                {formatDate(post.created_at)}
                                            </TableCell>
                                            <TableCell>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button aria-haspopup="true" size="icon" variant="ghost">
                                                            <Ellipsis className="h-4 w-4" />
                                                            <span className="sr-only">Toggle menu</span>
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                        <DropdownMenuItem onClick={() => { navigate(`/blogs/edit/${post.slug}`) }}>
                                                            <Pencil className="mr-2 w-4 h-4" />
                                                            Edit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => { deleteBlog(post.id); }}>
                                                            <Trash className="mr-2 w-4 h-4" />
                                                            Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                        <CardFooter>
                            <div className="text-xs text-muted-foreground">
                                Showing <strong>1-10</strong> of <strong>32</strong> products
                            </div>
                        </CardFooter>
                    </Card>
                )}
            </div>
        </div>
    )
}

export default AuthorPosts;