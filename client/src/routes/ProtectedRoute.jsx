import { UserContext } from "../context/UserContext";
import React, {useContext} from 'react';
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute(){
     const {userInfo} = useContext(UserContext);
     if(!userInfo?.username){
        return <Navigate to = "/login" replace/>;
     }
     return <Outlet></Outlet>;
}

export default ProtectedRoute;