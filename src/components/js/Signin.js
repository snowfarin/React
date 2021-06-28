import React, { useState } from 'react';
import Blog from './Blog';
import '../css/Signin.css';
import axios from 'axios';

function Login() {
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');

  return (
    <div className="signinpack">
      <div className="top-cover">
        <div className="side-img"></div>
        <div className="form-cover">
          <label for="username">Username</label>
          <input
            className="signin-input"
            type="username"
            id="username"
            onChange={(e) => {
              setusername(e.target.value);
            }}
          />
          <label for="password">Password</label>
          <input
            className="signin-input"
            type="password"
            id="password"
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          />
          <button
            className="signin-button"
            type="submit"
            onClick={() => {
              console.log(username, password);
              axios
                .post('http://127.0.0.1:8000', {
                  username: username,
                  password: password,
                })
                .then((responce) => {
                  if (responce.data.status) {
                    localStorage.setItem('usertoken', responce.data.user_token);
                    window.location.replace('/blog');
                  } else {
                    console.log(responce.data);
                  }
                });
            }}
          >
            Signin
          </button>
          <h5>Or</h5>
          <button
            className="signin-button"
            type="submit"
            onClick={() => window.location.replace('/signup')}
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  );
}
export default Login;
