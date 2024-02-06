
import { useContext, useState } from "react";
import { AuthContext } from "../components/Context/AuthContext";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
     const  [credentials,setCredentials] = useState({
        username:undefined,
        password:undefined
     });

     const {user,loading,error,dispatch} =useContext(AuthContext);
     const navigate= useNavigate();
     const handleChange = (e) => {
        setCredentials((prev) => ({...prev, [e.target.id]:e.target.value}))
     }

     const handleClick =async(e) => {
        e.preventDefault();
        dispatch({type:"LOGIN_START"});
        try {
            const res= await axios.post("https://bookingbackend-m7ip.onrender.com/auth/login",credentials);
            dispatch({type:"LOGIN_SUCCESS",payload:res.data});
            navigate("/");
        }catch(err){
            dispatch({type:"LOGIN_FAILURE", payload:err.response.data});
        }
     }

     console.log(user);
    return <div className="login">
<div className="loginContainer">
<input type="text"  placeholder="username" id="username" className="loginusername" onChange={handleChange}></input>
<input type="password"  placeholder="password" id="password" className="loginpassword" onChange={handleChange} ></input>
<button onClick={handleClick} >LOGIN</button>
</div>
</div>
}

export default Login;
