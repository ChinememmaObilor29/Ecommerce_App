import React, { useState } from 'react';
import './Css/LoginSignUp.css';

function LoginSignUp() {
  const [action, setAction] = useState("Login");

  const toggleAction = () => {
    setAction(prevAction => prevAction === "Login" ? "Sign Up" : "Login");
  };

  const login = async () => {
    console.log("Login", formData);
    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (responseData.success) {
        localStorage.setItem('auth_token', responseData.token);
        window.location.replace("/");
      } else {
        alert(responseData.error);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Failed to login. Please try again.");
    }
  };

  const signup = async () => {
    console.log("signup", formData);
    try {
      const response = await fetch('http://localhost:4000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (responseData.success) {
        localStorage.setItem('auth_token', responseData.token);
        window.location.replace("/");
      } else {
        alert(responseData.error);
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Failed to signup. Please try again.");
    }
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (action === "Login") {
      login();
    } else {
      signup();
    }
  };

  return (
    <div className='login-signup'>
      <div className="login-signup-container">
        <h1>{action}</h1>
        <form onSubmit={handleSubmit}>
          <div className="login-signup-fields">
            {action === "Sign Up" && <input type="text" placeholder='Name' name='name' value={formData.name} onChange={changeHandler} />}
            <input type="email" placeholder='Email Address' name="email" value={formData.email} onChange={changeHandler} />
            <input type="password" placeholder='Enter Password' name="password" value={formData.password} onChange={changeHandler} />
          </div>
          <input type="submit" value="Submit" />
          {action === "Sign Up" ?
            <p className='login-signup-login'>Already have an account? <span onClick={toggleAction}>Login here</span></p> :
            <p className='login-signup-login'>Create an Account <span onClick={toggleAction}>Click here</span></p>}
          <div className='login-signup-agree'>
            <input type="checkbox" />
            <p>By Clicking, I agree to the terms of use & privacy policy.</p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginSignUp;