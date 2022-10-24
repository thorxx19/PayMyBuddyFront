import React from "react";
import { Navigate } from "react-router-dom";
import { accountService } from "../service/account.service";

const AuthGuard = ({ children }) => {

    
    if (!accountService.isLogged()) {
        return <Navigate to="/auth/login"/>
    }
    return children
}

export default AuthGuard;