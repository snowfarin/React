import React, { useState } from 'react';
import '../css/Signup.css';
import axios from 'axios';

function Signup() {
  const [firstname, setfirstname] = useState('');
  const [lastname, setlastname] = useState('');
  const [username, setusername] = useState('');
  const [email, setemail] = useState('');
  const [dob, setdob] = useState('');
  const [phone, setphone] = useState('');
  const [gender, setgender] = useState('');
  const [password1, setpassword1] = useState('');
  const [password2, setpassword2] = useState('');

  return (
    <div className="signuppack">
      <div className="topcoversignup">
        <label for="firstname">First name :</label>
        <input
          className="signup-input"
          type="text"
          id="firstname"
          onChange={(e) => setfirstname(e.target.value)}
        />
        <label for="lastname">Last name :</label>
        <input
          className="signup-input"
          type="text"
          id="lastname"
          onChange={(e) => setlastname(e.target.value)}
        />
        <label for="username">Username :</label>
        <input
          className="signup-input"
          type="username"
          id="username"
          onChange={(e) => setusername(e.target.value)}
        />
        <label for="email">E-mail :</label>
        <input
          className="signup-input"
          type="email"
          id="email"
          onChange={(e) => setemail(e.target.value)}
        />
        <label for="dob">Date of Birth :</label>
        <input
          className="signup-input"
          type="date"
          id="dob"
          onChange={(e) => setdob(e.target.value)}
        />
        <label for="phone">Phone Number :</label>
        <input
          className="signup-input"
          type="phone"
          id="phone"
          onChange={(e) => setphone(e.target.value)}
        />
        <label for="gender">Gender :</label>
        <select
          name="gender"
          id="gender"
          onChange={(e) => setgender(e.target.value)}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
          <option value="Not-Intrested">Not-Intrested</option>
        </select>
        <label for="password">Password :</label>
        <input
          className="signup-input"
          type="password"
          id="password"
          onChange={(e) => setpassword1(e.target.value)}
        />
        <label for="password1">Re-type Password :</label>
        <input
          className="signup-input"
          type="password"
          id="password1"
          onChange={(e) => setpassword2(e.target.value)}
        />
        <button
          className="signupbutton"
          type="submit"
          onClick={() => {
            if (password1 == password2) {
              axios
                .post('http://127.0.0.1:8000/signup/', {
                  firstname: firstname,
                  lastname: lastname,
                  dob: dob,
                  username: username,
                  email: email,
                  phone: phone,
                  gender: gender,
                  password: password2,
                })
                .then((responce) => {
                  if (responce.data.status) {
                    console.log(responce);
                    window.location.replace('/');
                  } else {
                    alert('something wrong');
                  }
                });
            } else {
              alert('Make sure both passwords are same');
            }
          }}
        >
          SignUp
        </button>
        <button
          className="signupbutton"
          type="submit"
          onClick={() => window.location.replace('/')}
        >
          Signin
        </button>
      </div>
    </div>
  );
}

export default Signup;
