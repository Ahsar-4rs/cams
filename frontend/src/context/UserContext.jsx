import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data } = await axios.get("/api/auth/me");
                setUser(data.user);
            } catch (error) {
                setUser(null);
            }
            setLoading(false);
        };
        fetchUser();
    }, []);

    const login = async (email, password, role) => {
        try {
            const { data } = await axios.post("/api/auth/login", { email, password, role });
            setUser(data.user);
            localStorage.setItem("token", data.token);
            return { success: true };
        } catch (error) {
            return { success: false, message: error.response.data.message };
        }
    };

    const register = async (formData) => {
        try {
            const { data } = await axios.post("/api/auth/register", formData);
            setUser(data.user);
            localStorage.setItem("token", data.token);
            return { success: true };
        } catch (error) {
            return { success: false, message: error.response.data.message };
        }
    };

    const logout = async () => {
        try {
            await axios.post("/api/auth/logout");
            setUser(null);
            localStorage.removeItem("token");
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <UserContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
