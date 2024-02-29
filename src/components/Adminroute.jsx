import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { isAdmin, isLoggedIn } from '../auth';
const AdminRoute = () => {
    return  (isLoggedIn() && isAdmin()) ? <Outlet /> : <Navigate to={"/login"}  />
}
export default AdminRoute