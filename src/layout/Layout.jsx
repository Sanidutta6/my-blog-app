import React, { memo } from 'react';
import Footer from '@/components/custom/Footer';
import Header from '@/components/custom/Header';
import { Outlet } from 'react-router-dom';
import { useAuth } from "@/hooks/use-auth";

const Layout = () => {
    const { role, loading } = useAuth();
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <Outlet />
            </main>
            { (!loading && role !== "author" && role !== "admin") && <Footer />}
        </div>
    );
};

export default memo(Layout);