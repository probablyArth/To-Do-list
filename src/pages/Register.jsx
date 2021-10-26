import React, { useState } from 'react';


function Register() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const register = (e) => {

        e.preventDefault()
        fetch(`http://localhost:4000/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username, password
            })
        })
    }

    return (
        <div className="flex flex-col items-center">
            <div className="form-control w-5/12">
                <label className="label">
                    <span className="label-text">Username</span>
                </label> 
                <input type="text" placeholder="username" className="input input-info input-bordered" onChange={(e) => setUsername(e.target.value)}/> 
                <label className="label">
                    <span className="label-text">Password</span>
                </label> 
                <input type="password" placeholder="password" className="input input-info input-bordered" onChange={(e) => setPassword(e.target.value)}/>
                <button onClick={register}className="btn my-8 w-20 self-center">Submit</button>
            </div> 
        </div>
    )
}

export default Register
