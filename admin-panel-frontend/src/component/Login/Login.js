import React, { useState } from "react";
import { FaFacebookF, FaGoogle, FaTwitter, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { InfinitySpin } from 'react-loader-spinner'
import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({ username: "", password: "" });
  const [isRevealPwd, setIsRevealPwd] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const { user,loginWithRedirect, isAuthenticated} = useAuth0();
  console.log("Google api response",user)

  if(isAuthenticated){
    navigate('/admin')
  }
const handleClick=()=>{
  setIsLoading(true)
}
  const handleChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    
     
      

      if ( formValue.username==='root' &&formValue.password==='12345678') {
        setIsLoading(false);
        navigate("/admin");
         
      } else {
       
        setError("wrong credential, you can login with google");
       
      }
    
  };

  return (
    <div className="main signin-signup">
      <section className="sign-in">
        <div className="container">
          <div className="signin-content">
            <div className="signin-image">
              <figure>
                <img
                  src="/img/signin-image.jpg"
                  alt="sing up image"
                />
              </figure>
            </div>
            <div className="signin-form">
              <h2 className="form-title">Sign in</h2>
              <form  className="register-form" id="login-form">
                <div className="form-group">
                  <label htmlFor="username">
                    <FaUser /><p></p>
                  </label>
                  <input
                    type="text"
                    style={{marginLeft:"3px"}}
                    name="username"
                    id="username"
                    placeholder="root"
                    value={formValue.username}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password" >
                    <RiLockPasswordFill /> <p></p> 
                  </label > 
                  <input
                  style={{marginLeft:"4px"}}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="12345678"
                    value={formValue.password}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="form-group form-button" >
               
                  <input
                    type="submit"
                    name="signin"
                    id="signin"
                    className="form-submit"
                    value="Log in"
                    // onClick={handleClick}
                    onClick={handleSubmit}
                  />
                   <button  className="form-submit m-4 " style={{border:"none"}} onClick={loginWithRedirect}>
                  <FaGoogle icon="fa-brands fa-google" />
                  </button>
                </div>
                
                
                {error && <p className="error-message mt-3 text-danger">{error}</p>}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
