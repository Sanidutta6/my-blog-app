import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "./hooks/use-theme";
import { BlogProvider } from "./hooks/use-blog";
import { AuthProvider, useAuth } from "./hooks/use-auth";
import Layout from "@/layout/Layout";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ProtectedRoute } from "./components/custom/ProtectedRoute";
import { Home, Auth, AboutUs, AdminDashboard, AuthorDashboard, AuthorPosts, BlogList, BlogPost, CreateBlog, EditBlog } from "@/pages/index";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },  // Home route - common for all users
      { path: '/auth', element: <Auth /> },  // Login route - common for all users
      { path: "/aboutus", element: <AboutUs />},

      // Routes for logged-in users
      {
        path: '/user',
        element: <ProtectedRoute><BlogList /></ProtectedRoute>  // Protected routes for regular users
      },
      {
        path: "/author",
        children: [
          {
            index: true,
            element: <ProtectedRoute authorOnly><AuthorDashboard /></ProtectedRoute>
          },
          {
            path: 'posts',
            element: <ProtectedRoute authorOnly><AuthorPosts /></ProtectedRoute>  // Protected routes for authors
          },
        ]
      },
      {
        path: "/admin",
        children: [
          {
            index: true,
            element: <ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>
          },
          {
            path: 'posts',
            element: <ProtectedRoute adminOnly><BlogList /></ProtectedRoute>  // Protected routes for authors
          },
        ]
      },
      {
        path: "/blogs",
        children: [
          {
            index: true,
            element: <ProtectedRoute><BlogList /></ProtectedRoute>,
          },
          {
            path: ":slug",
            element: <ProtectedRoute><BlogPost /></ProtectedRoute>,
          },
          {
            path: "create-new",
            element: <ProtectedRoute><CreateBlog /></ProtectedRoute>,
          },
          {
            path: "edit/:slug",
            element: <ProtectedRoute><EditBlog /></ProtectedRoute>,
          },
        ]
      },
    ],
  },
]);

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <BlogProvider>
          <RouterProvider router={router} />
          <Toaster />
        </BlogProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}