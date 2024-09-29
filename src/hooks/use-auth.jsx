import { createContext, useContext, useState, useEffect } from 'react';
import { signUpUser, updateUser, signInUser, signOutUser, getSession } from "@/conf/DB.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        const checkSession = async () => {
            setLoading(true);
            const res = await getSession();
            if (res.success && res.session) {
                setUserData(res.session.user);
                setIsAuthenticated(true);
                setRole(res.session.user.user_metadata.role);
            }
            setLoading(false);
        };
        checkSession();
    }, []);

    const signUp = async (name, email, password, isAuthor, profileImg) => {
        setLoading(true);
        setError(null);
        const role = isAuthor ? "author" : "user";
        const res = await signUpUser(name, email, password, role, profileImg);
        if (res.success) {
            setUserData(res.data.user);
            setIsAuthenticated(true);
            setRole(role);
        } else {
            setError(res.error);
        }
        setLoading(false);
    };

    const signIn = async (email, password) => {
        setLoading(true);
        setError(null);
        const res = await signInUser(email, password);
        if (res.success && res.data?.user) {
            setUserData(res.data.user);
            setIsAuthenticated(true);
            setRole(res.data.user.user_metadata.role);
        } else {
            setError(res.error);
        }
        setLoading(false);
    };

    const signOut = async () => {
        setLoading(true);
        const res = await signOutUser();
        if (res.success) {
            setIsAuthenticated(false);
            setRole("");
            setUserData(null);
        }
        setLoading(false);
    };

    const updateUserDetails = async (name, email, password) => {
        setLoading(true);
        setError(null);
        const res = await updateUser(name, email, password);
        if (res.success) {
            setUserData(res.data.user);  // Assuming updated user data is returned
        } else {
            setError(res.error);
        }
        setLoading(false);
    };

    return (
        <AuthContext.Provider value={{ loading, userData, isAuthenticated, role, signUp, signIn, signOut, updateUserDetails, error }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
}