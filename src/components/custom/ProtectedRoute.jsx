import { useAuth } from "@/hooks/use-auth";
import { Navigate } from "react-router-dom";
import { Loader } from "lucide-react"

export const ProtectedRoute = ({ children, authorOnly = false, adminOnly = false }) => {
    const { isAuthenticated, role, loading } = useAuth();

    if (loading) {
        return <Loader className="animate-[displace_5s_infinite] h-9 w-9" />
    }

    if (!isAuthenticated) {
        return <Navigate to="/auth" replace />;
    }

    // Admin-only route protection
    if (adminOnly && role !== "admin") {
        return <Navigate to="/user" replace />;
    }

    // Author-only route protection
    if (authorOnly && role !== "author") {
        return <Navigate to="/user" replace />;
    }

    // Redirect admin to their dashboard
    if (!adminOnly && !authorOnly && role === "admin") {
        return children;
    }

    // Redirect author to their dashboard
    if (!adminOnly && !authorOnly && role === "author") {
        return children;
    }

    return children;
};