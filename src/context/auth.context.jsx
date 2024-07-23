import React, {useState, useEffect} from "react";
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

    const authenticateUser = () => {

        //get stored token
        const storedToken = localStorage.getItem('authToken');

        //if the token exists in the localStorage
        if(storedToken) {
            axios.get(
                `${API_URL}/auth/verify`,
                {headers: {Authorization: `Bearer ${storedToken}`} }
            )
            .then((response) => {
                const user = response.data;

                //update state variables
                setIsLoggedIn(true);
                setIsLoading(false);
                setUser(user);
            })
            .catch((error) => {
            // If the server sends an error response (invalid token) 
            // Update state variables  
            setIsLoggedIn(false);
            setIsLoading(false);
            setUser(null);        
            });
        } else {
            setIsLoggedIn(false);
            setIsLoading(false);
            setUser(null);
        }
    }

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
        authenticateUser,
        logOutUser
        }}>
            {props.children}
        </AuthContext.Provider>
    )

}


export {AuthProviderWrapper, AuthContext}