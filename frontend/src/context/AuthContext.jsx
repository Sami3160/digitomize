import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token1, setToken] = useState(localStorage.getItem('token'));
    const initApp = async () => {
        const token = localStorage.getItem('token')
        if (token) {
            try {
                const res = await axios.get('http://localhost:5000/api/users/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setUser((user) => res.data)
            } catch (error) {
                if(error.response.status===401){
                    localStorage.removeItem('token')
                    localStorage.removeItem('user')
                    setUser(null)
                }
                console.log(error.message)
            }

        }
    }
    useEffect(() => {
        const intervalId = setInterval(() => initApp(), 4000);
        return () => clearInterval(intervalId);
    }, [token1, user])
    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUser(null)
    }
    return (
        <AuthContext.Provider value={{ user, logout }}>
            {children}
        </AuthContext.Provider>
    )
}