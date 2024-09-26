import { createContext, useContext, useState, useEffect } from 'react';
import { signUpUser, updateUser, signInUser, signOutUser, getSession } from "@/conf/DB.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState("");

    useEffect(() => {
        // Check for an existing session on page load
        const checkSession = async () => {
            const res = await getSession();
            if (res.success && res.session) {
                setUserData(res.session.user);
                setIsAuthenticated(true);
                setRole(res.session.user.user_metadata.role);
            }
        };
        setLoading(true);
        checkSession();
        setLoading(false);
    }, []);

    const signUp = async (name, email, password, isAuthor, profileImg) => {
        setLoading(true);
        const role = isAuthor ? "author" : "user";
        const res = await signUpUser(name, email, password, role, profileImg);
        if (res.success) {
            setIsAuthenticated(true);
            setRole(role);
        }
        setLoading(false);
    };

    const signIn = async (email, password) => {
        setLoading(true);
        const res = await signInUser(email, password);
        if (res.success) {
            setUserData(res.data);
            setIsAuthenticated(true);
            setRole(res.data.user.user_metadata.role);
        }
        setLoading(false);
    };

    const signOut = async () => {
        setLoading(true);
        const res = await signOutUser();
        if (res.success) {
            setIsAuthenticated(false);
            setRole("");
        }
        setLoading(false);
    };

    const updateUserDetails = async (name, email, password) => {
        setLoading(true);
        const res = await updateUser(name, email, password);
        setLoading(false);
    };

    return (
        <AuthContext.Provider value={{ loading, userData, isAuthenticated, role, signUp, signIn, signOut, updateUserDetails }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export default useAuth;