import React from 'react';
import { Link } from 'react-router-dom';

function Welcome() {
    return (
        <div className="flex flex-col items-center">
            <h1 className="text-6xl">Welcome</h1>
            <Link to='/register'>Register</Link>
        </div>
    )
}

export default Welcome
