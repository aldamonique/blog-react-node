import { UserContext } from "../context/UserContext";
import {useContext} from 'react';
import { Navigate, Outlet } from "react-router-dom";

function RestrictedRoute(){
     const {userInfo} = useContext(UserContext);
     if(userInfo?.username){
        return <Navigate to = "/" replace/>;
     }
     return <Outlet></Outlet>;
}

export default RestrictedRoute;