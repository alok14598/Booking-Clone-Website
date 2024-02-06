import { useContext } from "react";
import "./navbar.css"
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () =>{
const {user} = useContext(AuthContext);
const navigate=useNavigate();

const loginpage = () => {
navigate("/login");
}

    return (


        <div className="navbar">
            <div className="navContainer">
                <span className="logo">AlokBooking AB</span>
              { user ? user.username : <div className="navItems">
                    <button className="navButton">Register</button>
                    <button onClick={loginpage} className="navButton">LogIn</button>
                </div>}
            </div>
        </div>
    )
}

export default Navbar;