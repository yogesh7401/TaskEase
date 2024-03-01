/* eslint-disable react/prop-types */
import {Navigate, useLocation} from "react-router-dom"
import { useAuth } from "./AuthProvider";

const ProtectedRoute = ({children}) => {
    const { user } = useAuth()
    let location = useLocation();
    
    return(
        !user ? <Navigate to="/login" state={{ from: location}} replace /> : children
    )

};

export default ProtectedRoute;