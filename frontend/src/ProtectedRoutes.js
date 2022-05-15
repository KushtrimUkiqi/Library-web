import React from 'react';

//reacte router
import { Outlet } from 'react-router-dom';

//redux
import { useSelector } from 'react-redux';

//pages
import Login from './pages/Login';

const ProtectedRoutes = () => {

    const loggedIn = useSelector((state) => state.auth.auth)

    console.log(loggedIn)

    return (
        <>
            { loggedIn ? <Outlet/> : <Login />}
        </>
    );
}

export default ProtectedRoutes;
