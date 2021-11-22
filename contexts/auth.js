// contexts/auth.js

import React, { createContext, useState, useContext, useEffect } from 'react'
import Cookies from 'js-cookie'
import Router, { useRouter } from 'next/router'

//api here is an axios instance which has the baseURL set according to the env.
import backendHTTPHandler from '../http/axios';


const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function getTokenFromStorage() {
            const token = localStorage.getItem('jwt')
            if (token) {
                backendHTTPHandler.defaults.headers.Authorization = `Bearer ${token}`
                setIsAuthenticated(true);
            }
            setLoading(false)
        }
        getTokenFromStorage()
    }, [])

    const login = async (email, password) => {
        const { data: token } = await backendHTTPHandler.post('accounts/login', { email, password })
        await authenticate(token);
    }

    const authenticate = async (token) => {
        localStorage.setItem('jwt', token);
        backendHTTPHandler.defaults.headers.Authorization = `Bearer ${token}`;
        setIsAuthenticated(true);
    }

    const logout = () => {
        setUser(null)
        delete backendHTTPHandler.defaults.headers.Authorization;
        localStorage.removeItem('jwt', token)
        setIsAuthenticated(false);
        window.location.pathname = '/'
    }


    return (
        <AuthContext.Provider value={{ isAuthenticated, login, loading, logout }}>
            {children}
        </AuthContext.Provider>
    )
}



export const useAuth = () => useContext(AuthContext)
