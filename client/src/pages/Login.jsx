import React, { useState, useContext } from 'react';
import { CredentialsContext } from '..';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

export const handleErrors = async (response) => {
    if (!response.ok) {
        const { message } = await response.json();
        throw Error(message)
    }
    return response.json();
}

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");


    const [, setCredentials] = useContext(CredentialsContext)

    const login = (e) => {

        e.preventDefault()
        fetch(`https://todos-backend-prollyarth.herokuapp.com/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username, password
            })
        }).then(handleErrors)
        .then(() => {
            setCredentials({
                username,
                password
            })
            history.push('/')
        }).catch((err) => {
            setError(err.message)
        })
    };

    const history = useHistory();

    return (
        <div className="flex flex-col items-center mt-14">
            <h1 className="text-6xl">Login</h1>
            <span className="mt-5">Don't have an account? Register <Link to="/register" className="underline text-secondary">here</Link></span>
            {<span className="text-red-600 mt-5">{error}</span>}
            <div className="form-control w-5/12">
                <label className="label">
                    <span className="label-text">Username</span>
                </label> 
                <input type="text" placeholder="username" className="input input-info input-bordered" onChange={(e) => setUsername(e.target.value)}/> 
                <label className="label">
                    <span className="label-text">Password</span>
                </label> 
                <input type="password" placeholder="password" className="input input-info input-bordered" onChange={(e) => setPassword(e.target.value)}/>
                <button onClick={login}className="btn my-8 w-20 self-center">Login</button>
            </div> 
        </div>
    )
}

export default Login
