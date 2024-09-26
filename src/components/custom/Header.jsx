import { LogOut, User, Mountain, Menu } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { ModeToggle } from './ModeToggle';
import { useAuth } from "@/hooks/use-auth"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Profile from "./Profile"
import { useState } from 'react';

const Header = () => {
    const navigate = useNavigate();
    const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
    const { role, userData, isAuthenticated, signOut } = useAuth();

    // Safely access user_metadata and its properties
    const avatarUrl = userData?.user_metadata?.avatar_url;
    const userName = userData?.user_metadata?.name || "User";
    const userInitial = userName.charAt(0);

    return (
        <header className="bg-background border-b">
            <div className="container px-4 md:px-6 py-4 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2">
                    <Mountain className="w-6 h-6" />
                    <span className="text-lg font-semibold">Acme Blog</span>
                </Link>
                {role === "user" && (<nav className="hidden md:flex items-center gap-6">
                    <Link to="/" className="text-muted-foreground hover:text-foreground">
                        Home
                    </Link>
                    <Link to="/blogs" className="text-muted-foreground hover:text-foreground">
                        Blogs
                    </Link>
                    <Link to="/aboutus" className="text-muted-foreground hover:text-foreground">
                        About
                    </Link>
                    <Link to="/contact" className="text-muted-foreground hover:text-foreground">
                        Contact
                    </Link>
                </nav>)}
                {role === "author" && (<nav className="hidden md:flex items-center gap-6">
                    <Link
                        to="/author"
                        className="text-foreground transition-colors hover:text-foreground"
                    >
                        Dashboard
                    </Link>
                    <Link
                        to="/author/posts"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                        My Posts
                    </Link>
                    <Link
                        to="/blogs"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Blogs
                    </Link>
                </nav>)}
                <nav>
                    <div className="flex gap-2 items-center">
                        {(isAuthenticated && userData) ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Avatar>
                                        {avatarUrl ? (
                                            <AvatarImage src={avatarUrl} alt="User Avatar" />
                                        ) : (
                                            <AvatarFallback>{userInitial}</AvatarFallback>
                                        )}
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-36">
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem onClick={() => { setIsProfileDialogOpen(true); }}>
                                            <User className="mr-2 h-4 w-4" />
                                            <span>Profile</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => { signOut(); navigate('/'); }}>
                                            <LogOut className="mr-2 h-4 w-4" />
                                            <span>Log out</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (<>
                            <Button onClick={() => { navigate('/auth') }}>Login</Button>
                            <Button onClick={() => { navigate('/auth') }}>Sign Up</Button>
                        </>
                        )}
                        <ModeToggle />
                    </div>
                </nav>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="md:hidden">
                            <Menu className="w-6 h-6" />
                            <span className="sr-only">Toggle Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="sm:max-w-xs">
                        <nav className="grid gap-4 p-4">
                            {role === "user" && (<><Link className="text-muted-foreground hover:text-foreground">
                                Home
                            </Link>
                                <Link className="text-muted-foreground hover:text-foreground">
                                    Blog
                                </Link>
                                <Link className="text-muted-foreground hover:text-foreground">
                                    About
                                </Link>
                                <Link className="text-muted-foreground hover:text-foreground">
                                    Contact
                                </Link></>)}
                            {isAuthenticated ? (
                                <button onClick={() => { signOut(); navigate('/'); }} className="px-3 py-2 rounded-md text-sm font-medium">
                                    Logout
                                </button>
                            ) : (<>
                                <Button onClick={() => { navigate('/auth') }}>Login</Button>
                                <Button onClick={() => { navigate('/auth') }}>Sign Up</Button>
                            </>)}
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
            {userData && <Profile isOpen={isProfileDialogOpen} setIsOpen={setIsProfileDialogOpen} />}
        </header>
    )
}

export default Header;