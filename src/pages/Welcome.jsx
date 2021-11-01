import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CredentialsContext } from '..';
import Todos from '../components/Todos';

function Welcome() {

    const [credentials] = useContext(CredentialsContext)

    return (
        <div>
            <div className="flex flex-col items-center">
                <h1 className="text-6xl">Welcome {credentials && credentials.username}</h1>
                {!credentials && <p className="py-12">New Around here? Register <Link to='/register' className="underline text-secondary">here.</Link></p>}
                {!credentials && <p> Already have an account? Login <Link to='/login' className="underline text-secondary">here</Link> </p>}
                {credentials && <Todos />}
            </div>
        </div>
    )
}

export default Welcome
