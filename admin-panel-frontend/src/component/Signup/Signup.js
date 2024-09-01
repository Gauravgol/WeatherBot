import React from "react";
import { FaFacebookF, FaGoogle, FaTwitter, FaUser } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { RiLockPasswordFill, RiLockPasswordLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const Signup = () => {
    return (
        <>
        <div className="main signin-signup">
  <section className="signup">
    <div className="container">
      <div className="signup-content">
        <div className="signup-form">
          <h2 className="form-title">Sign up</h2>
          <form method="POST" className="register-form" id="register-form">
            <div className="form-group">
              <label htmlFor="name">
              <FaUser />
                
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Your Name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">
              <IoMdMail />
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Your Email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="pass">
              <RiLockPasswordFill />
              </label>
              <input
                type="password"
                name="pass"
                id="pass"
                placeholder="Password"
              />
            </div>
            <div className="form-group">
              <label htmlFor="re-pass">
              <RiLockPasswordLine />
              </label>
              <input
                type="password"
                name="re_pass"
                id="re_pass"
                placeholder="Repeat your password"
              />
            </div>
            <div className="form-group">
              <input
                type="checkbox"
                name="agree-term"
                id="agree-term"
                className="agree-term"
              />
              <label htmlFor="agree-term" className="label-agree-term">
                <span>
                  <span />
                </span>
                I agree all statements in{" "}
                <a href="#" className="term-service">
                  Terms of service
                </a>
              </label>
            </div>
            <div className="form-group form-button">
              <input
                type="submit"
                name="signup"
                id="signup"
                className="form-submit"
                defaultValue="Register"
              />
            </div>
          </form>
        </div>
        <div className="signup-image">
          <figure>
            <img
              src="assets/img/signup-image.jpg"
              alt="sing up image"
            />
          </figure>
          <Link to="/" className="signup-image-link">
            I am already member
            </Link>
        </div>
      </div>
    </div>
  </section>
  
</div>

        </>
    )
}



export default Signup;