import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        try {
          const storedUser = localStorage.getItem("user");
          if (!storedUser || storedUser === "undefined") return null;
          const parsedUser = JSON.parse(storedUser);
          console.log("Loaded user from localStorage:", parsedUser); // ✅ Add this
          return parsedUser;
        } catch (error) {
          console.error("Failed to parse user from localStorage:", error);
          localStorage.removeItem("user");
          return null;
        }
      });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
          const token = localStorage.getItem("token");
          if (!token) {
            setLoading(false);
            return;
          }
      
          try {
            const { data } = await axios.get("/api/auth/me", {
              headers: {
                Authorization: `Bearer ${token}`, // ✅ send token
              },
            });
      
            if (data.user) {
              setUser(data.user);
              localStorage.setItem("user", JSON.stringify(data.user));
            }
          } catch (error) {
            console.warn("Auth check failed. Keeping local user.");
            // ❌ Do NOT call setUser(null)
          } finally {
            setLoading(false);
          }
        };
      
        fetchUser();
      }, []);
      
    

    const login = async (email, password, role) => {
        try {
            const { data } = await axios.post("http://localhost:4000/api/v1/user/login", {
                email,
                password,
                role,
            });
            setUser(data.user);
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("token", data.token);
            return { success: true };
        } catch (error) {
            console.error("Login Error:", error);
            return {
                success: false,
                message: error?.response?.data?.message || "Login failed. Please try again.",
            };
        }
    };

    const register = async (formData) => {
        try {
            const { data } = await axios.post("/api/auth/register", formData);
            setUser(data.user);
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("token", data.token);
            return { success: true };
        } catch (error) {
            console.error("Register Error:", error);
            return {
                success: false,
                message: error?.response?.data?.message || "Registration failed. Please try again.",
            };
        }
    };

    const logout = async () => {
        try {
            await axios.post("/api/auth/logout");
        } catch (error) {
            console.error("Logout failed", error);
        } finally {
            setUser(null);
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        }
    };

    return (
        <UserContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
