import { Cancel, Room } from "@material-ui/icons"
import axios from "axios";
import { useState,useRef } from "react"
import "./login.css"
function Login({setShowLogin,myStorage,setCurrentUser}) {
    const [error,setError]= useState(false);
    const usernameRef = useRef()
    const passwordRef = useRef()
    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {
          username: usernameRef.current.value,
          password: passwordRef.current.value,
        };
    
        try {
          const res = await axios.post("/users/login", user);
          myStorage.setItem("user",res.data.username);
          setCurrentUser(res.data.username);
          setShowLogin(false)
          setError(false);
        } catch (err) {
          setError(true);
        }
      };
    return (
        <div className="loginContainer">
            <div className="logoLogin">
                <Room />
                AbdelnabyPin
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="username" ref={usernameRef} />
                <input type="password" placeholder="password" ref={passwordRef}  />
                <button className="loginButton">Login</button>
                {error && (<span className="failure">Somteting went wrong!</span>)}

            </form>
            
            <Cancel className="loginCancel" onClick={() => setShowLogin(false)} />
        </div>
    )
}

export default Login
