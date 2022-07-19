import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {

  const host = "http://localhost:5000";
  let navigate = useNavigate();

  const [credentials, setCredentials] = useState({ name: "", email: "", password: "" });

  const handleOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let { name, email, password } = credentials;
    const response = await fetch(`${host}/api/auth/createUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password })
    });
    const json = await response.json();
    // console.log(json);

    if (json.success) {
      // console.log(json.authToken);
      localStorage.setItem('token', json.authToken);
      navigate('/');
      props.showAlert('Account Created Successfully', 'success');
    }
    else {
      props.showAlert('Credentials not valid ', 'danger');
    }
  }
  return (
    <div className="container mt-2">
      <h3>Create an account to use Keep</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group my-1">
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" id="name" name='name' onChange={handleOnChange} aria-describedby="emailHelp" placeholder="Enter name" minLength={3} required />
        </div>
        <div className="form-group my-1">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control" id="email" name='email' onChange={handleOnChange} aria-describedby="emailHelp" placeholder="Enter email" required />
        </div>
        <div className="form-group my-2">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" name='password' onChange={handleOnChange} placeholder="Password" minLength={7} required />
        </div>
        <div className="form-group my-2">
          <label htmlFor="cpassword">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={handleOnChange} placeholder="cPassword" minLength={7} required />
        </div>

        <button type="submit" className='btn btn-primary' >SignUp</button>
      </form>

    </div>
  )
}

export default Signup