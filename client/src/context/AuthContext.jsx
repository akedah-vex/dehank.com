import { createContext, useState, useCallback } from 'react';
import { register, login } from '../api/DatabaseAPI'

const AuthContext = createContext();

const Provider = ({ children }) => {
    const [user, setUser] = useState({})
    const [loginStatus, setLoginStatus] = useState({})
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentPage, setCurrentPage] = useState("/login");

    const handleLogin = async (username, password) => {
        const res = await login({username, password})
        return res;
    }

    const handleRegister = async (username, password) => {
        register({username, password})
    }

    const handleLogout = (logoutStatus) => {
        setUser("");
        setLoginStatus(logoutStatus);
        setIsAuthenticated(false);
        setCurrentPage("/login");
    }

    const getUser = () => {
        return user;
    }

    const applyPage = useCallback((page) => {
        setCurrentPage(page);
    }, [])

    let authContextValue = {
        handleLogin,
        handleLogout,
        handleRegister,
        getUser,
        setCurrentPage,
        applyPage,
        setUser,
        currentPage,
        user,
        loginStatus,
        isAuthenticated
    }

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
export { Provider as AuthProvider };