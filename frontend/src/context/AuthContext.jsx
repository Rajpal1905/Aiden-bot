import React, { createContext, useState, useEffect } from "react";
import { loginApi, signupApi } from "../service/operations/authApi";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [logedin, setLoggedin] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
          setUser(storedUser);
          setLoggedin(true);
        }
      } catch (error) {
        console.error("Error checking authentication status", error);
      } finally {
        setLoading(false);
      }
    };
    checkAuthStatus();
  }, []);

  const login = async (email, password, navigate) => {
    try {
      const res = await loginApi(email, password);
      if (res) {
        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));  
        navigate("/chat");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };
  const signup = async (name, email, password, navigate) => {
    try {
      const res = await signupApi(name, email, password);
      if (res) {
        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));  
        navigate("/chat");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };
  const logout = (navigate) => {
    console.log("Before logout, logedin:", logedin);  // Check current state before logout
    setUser([]);
    setLoggedin(false);
    console.log("After logout, logedin:", logedin);  // Check updated state
    navigate('/');
  };
  

  return (
    <AuthContext.Provider value={{ user, loading, logedin, login, logout,signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
