import React, { useState, useContext } from 'react';
import { CredentialsContext } from '..';
import { useHistory } from 'react-router';
import { handleErrors } from './Login';
import { Link } from 'react-router-dom';


function Register() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");


    const [, setCredentials] = useContext(CredentialsContext)

    const register = (e) => {

        if (username && password) {
            e.preventDefault()
            fetch(`https://todos-backend-prollyarth.herokuapp.com/register`, {
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
        } else {
            setError("Username and password should not be empty")
        }
    };

    const history = useHistory();

    return (
        <div className="flex flex-col items-center mt-14">
            <h1 className="text-6xl">Register</h1>
            <span className="mt-5">Already have an account? Login <Link to="/login" className="underline text-secondary">here</Link></span>
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
                <button onClick={register}className="btn my-8 w-20 self-center">Register</button>
            </div> 
        </div>
    )
}

export default Register
