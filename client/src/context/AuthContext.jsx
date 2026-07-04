import { createContext, useState, useCallback } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const Provider = ({ children }) => {
    const [user, setUser] = useState({})
    const [loginStatus, setLoginStatus] = useState({})
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentPage, setCurrentPage] = useState("/login");


    const handleLogin = async (username, password) => {
        // console.log("logging in with username:", username, "and password:", password)
        if (!username || !password) {
            setLoginStatus({ message: "Please enter both username and password.", status: -1 });
            return false;
        }

        const credentials = {
            username,
            password
        };

        const res = await axios.post(`/api/auth/login`, credentials, {
            headers: {
                "Content-Type": "application/json"
            }
        }).catch(err => {
            console.error("Error during login request:", err);
            setLoginStatus({ message: "An error occurred during login. Please try again.", status: -1 });
            return;
        });

        // const res = login(credentials);

        // console.log("Login response data:", res.data);

        // const token = res.data.token;
        const token = "yep"

        // get a returned token and set state accordingly
        if (token) {
            // setUser(res.data);
            setUser("lmao")
            setLoginStatus({ message: "Login successful!", status: 1 });
            setIsAuthenticated(true);
            // console.log(token)
            // store token in a browser cookie? What is best practice here
            return true;
        }
        else {
            setLoginStatus({ message: "Invalid username or password.", status: -1 });
            return false;
        }

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
        getUser,
        setCurrentPage,
        applyPage,
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