import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth"

const Footer = () => {
    const { role } = useAuth();

    return (
        <footer className="bg-muted py-6 w-full shrink-0">
            <div className="container px-4 md:px-6 flex flex-col items-center gap-2 text-center">
                <p className="text-xs text-muted-foreground">&copy; 2024 My Blog. All rights reserved.</p>
                <nav className="flex gap-4 sm:gap-6">
                    <Link to="/" className="text-xs hover:underline underline-offset-4">
                        Terms of Service
                    </Link>
                    <Link to="/" className="text-xs hover:underline underline-offset-4">
                        Privacy Policy
                    </Link>
                </nav>
            </div>
        </footer>
    )
}

export default Footer;