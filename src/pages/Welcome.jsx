import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CredentialsContext } from '..';
import Todos from '../components/Todos';

function Welcome() {

    const [credentials] = useContext(CredentialsContext)

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-6xl">Welcome {credentials && credentials.username}</h1>
            {!credentials && <Link to='/register'>Register</Link>}
            {!credentials && <Link to='/login'>Login</Link>}
            {credentials && <Todos />}
        </div>
    )
}

export default Welcome
