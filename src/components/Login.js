import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const Login = (props) => {
    const host = "http://localhost:5000";
    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: "", password: "" });

    const handleOnChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        // console.log(json);

        if (json.success) {
            // console.log(json.authToken);
            localStorage.setItem('token', json.authToken);
            navigate('/');
            props.showAlert('LogIn Successfull', 'success');
        }
        else {
            props.showAlert('Invalid Credentials', 'danger');
        }
    }
    return (
        <div className="container my-3">
            <h3>Login to continue to Keep</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group my-1">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' value={credentials.email} onChange={handleOnChange} aria-describedby="emailHelp" placeholder="Enter email" required />
                </div>
                <div className="form-group my-2">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={handleOnChange} placeholder="Password" required />
                </div>

                <button type="submit" className='btn btn-primary' >LogIn</button>
            </form>

        </div>
    )
}

export default Login