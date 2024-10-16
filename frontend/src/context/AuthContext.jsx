import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    useEffect(() => {
        // const token = localStorage.getItem('token')
        let intervalId; 
        if (token) {
            const getUser = async () => {
                try {
                    const res = await axios.get('http://localhost:5000/api/users/profile', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    setUser(res.data)
                } catch (error) {
                    console.log(error)
                }
            }
            // setInterval(()=>getUser, 4000)
            getUser()
            if(token){
                intervalId=setInterval(()=>getUser, 4000)
            }
            return ()=>clearInterval(intervalId)

        }
    }, [token])
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