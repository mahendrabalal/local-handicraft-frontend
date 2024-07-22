import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";


function Navbar() {
   // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider `value` prop
  const {isLoggedIn, user} = useContext(AuthContext);
  
  
   //  Update the rendering logic to display different content 
  //  depending on whether the user is logged in or not

  return (
    <nav>
        <Link to="/">
            <button>Home</button>
        </Link>

        {/*    UPDATE     */}
        {isLoggedIn && (  
            <>
            <Link to="/projects">
                <button>Project</button>
            </Link>
            <button>Logout</button>
            </>
        )}

        {!isLoggedIn && (
            <>
                <Link to="/signup"><button>Sign Up</button></Link>
                <Link to="/login"><button>Login</button></Link>
            </>
        )}
    </nav>
  )
}

export default Navbar;