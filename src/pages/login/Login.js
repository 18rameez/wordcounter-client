import "./style.css";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { API_URL } from "../../api/config";


const Login = () => {

   const loginBtn = useRef(null)

  const [email, setEmail] = useState("demo@gmail.com");
  const [password, setPassword] = useState("1234");
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {

    loginBtn.current.innerText = "Loading..."
 
    event.preventDefault();

    const response = await fetch(API_URL+"/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data.token);
      localStorage.setItem('token', data.token);
      console.log("Signed in successfully!");
      navigate('/');
    } else {
      console.log("Failed to sign in");
      setError('Invalid email or password');
      loginBtn.current.innerText = "Sign in"
    }
  };

  return (

    <div class="signin-container">
    <form onSubmit={handleSubmit} class="form-signin" action="/login" method="post">

          {error && (
            <div className="alert alert-danger alert-sm" role="alert">
              {error}
            </div>
          )}
      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
      <input
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        name="email"
        id="email"
        class="form-control"
        placeholder="Email address"
        required=""
        autofocus=""
      />
      <input
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        name="password"
        id="password"
        class="form-control"
        placeholder="Password"
        required=""
      />
     
      <button
         ref={loginBtn}
        class="btn btn-lg form-control btn-primary btn-block mb-3 "
        type="submit"
      >
        Sign in
      </button>

      <div className="d-flex justify-content-between">

      <div class="btn btn-outline-secondary btn-sm d-inline " role="button">
        Forgot password
      </div>
      <div class="btn btn-outline-secondary btn-sm d-inline"  role="button" onClick={() => navigate('/signup')}>Create a new account</div>
     
      </div>
      
    </form>

    </div>
  );
};



export default Login;
