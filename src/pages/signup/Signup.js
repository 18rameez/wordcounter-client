import "./style.css";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../api/config";

const Signup = () => {

  const signupBtn = useRef(null)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
 

  const handleSubmit = async (event) => {
    event.preventDefault();

    signupBtn.current.innerText = "Loading..."
    const response = await fetch(API_URL+"/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token);
      console.log("Account created successfully!");
      navigate("/");
    } else {
      console.log("Failed to sign in");
      setError("something went wrong");
      signupBtn.current.innerText = "Submit"
    }
  };

  return (

    <div class="signup-container">

    
    <form onSubmit={handleSubmit} class="form-signup" action="/signup" method="post">
      {error && (
        <div className="alert alert-danger alert-sm" role="alert">
          {error}
        </div>
      )}
      <h1 class="h3 mb-3 font-weight-normal">Create an Account</h1>

      <input
        type="text"
        name="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        id="name"
        class="form-control"
        placeholder="Name"
        required=""
        autofocus=""
      />
      <input
        type="email"
        name="email"
        id="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        class="form-control"
        placeholder="Email address"
        required=""
        autofocus=""
      />
      <input
        type="password"
        name="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        id="password"
        class="form-control"
        placeholder="Password"
        required=""
      />

      <button
      ref={signupBtn}
        class="btn btn-lg form-control btn-primary btn-block mb-3"
        type="submit"
      >
        Submit
      </button>

      <a className="d-flex justify-content-center" role="button" onClick={() => {navigate('/login')}}>Already have an account, please sign in</a>
    </form>
    </div>
  );
};

export default Signup;
