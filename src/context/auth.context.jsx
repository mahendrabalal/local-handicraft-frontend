import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
const API_URL = "http://localhost:5005";
const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
    const [isLoggedIn, setIsLoggedIn] =useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
   

    //function for handling authentication status
    const storeToken= (token) => {
    localStorage.setItem('authToken', token);
    }

    const getToken = () => {
        return localStorage.getItem('authToken');
    }

    const authenticateUser = async () => {
        try {
            const storedToken = localStorage.getItem('authToken');
          
            if (storedToken) {
                const response = await axios.get(`${API_URL}/auth/verify`, {
                    headers: { Authorization: `Bearer ${storedToken}` }
                });
                setUser(response.data);
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
                setUser(null);
            }
        } catch (error) {
            console.error('Authentication error:', error);
            setIsLoggedIn(false);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };
    

    const removeToken =() => {
        //Upon logout remove the token from the localStorage
        localStorage.removeItem("authToken");
    }
    const logOutUser = ()=> {
        removeToken();
        authenticateUser();
    }

    useEffect(() => {
        authenticateUser();
    }, []);

    return (
        <AuthContext.Provider value= {{
        isLoggedIn, 
        isLoading, 
        user, 
        storeToken,
        getToken,
        authenticateUser,
        logOutUser
        }}>
            {props.children}
        </AuthContext.Provider>
    )

}


export {AuthProviderWrapper, AuthContext}

