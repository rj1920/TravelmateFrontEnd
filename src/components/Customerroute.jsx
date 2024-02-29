import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { isAdmin, isLoggedIn } from '../auth';
const Customerroute = () => {
    return  (isLoggedIn() && !isAdmin()) ? <Outlet /> : <Navigate to={"/login"}  />
}
export default Customerroute