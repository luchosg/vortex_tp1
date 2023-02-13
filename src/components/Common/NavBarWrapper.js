import React from 'react';
import {Outlet} from "react-router-dom";
import NavBar from './NavBar';

const NavBarWrapper = () => {
    return (
        <div>
            <NavBar />
            <Outlet />
        </div>
    )
}

export default NavBarWrapper;