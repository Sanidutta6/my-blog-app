import Footer from '@/components/custom/Footer';
import Header from '@/components/custom/Header';
import { Outlet } from 'react-router-dom';
import { useAuth } from "@/hooks/use-auth"

export default function Layout() {
    const { role, loading } = useAuth();
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex-1 max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <Outlet />
            </div>
            { (!loading && role !== "author" && role !== "admin") && <Footer />}
        </div>
    );
}