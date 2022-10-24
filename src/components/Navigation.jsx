import React from "react";
import { Container } from "react-bootstrap";
import {NavLink} from "react-router-dom";
import { accountService } from "../service/account.service";


const Navigation = () => {

    
    const logout = () => {
        accountService.logout()
    }


    return(
        
        <Container className=" navbar navbar-dark bg-dark justify-content-end head">
            
                <NavLink to="/home" type="button" className="btn btn-outline-success me-2">Home</NavLink>

                <NavLink to="/transfert" type="button" className="btn btn-outline-success me-2">Transfert</NavLink>

                <NavLink to="/profile" type="button" className="btn btn-outline-success me-2">Profile</NavLink>

                <NavLink to="/contact" type="button" className="btn btn-outline-success me-2">Contact</NavLink>

                <NavLink to="/auth/login" type="button" onClick={logout} className="btn btn-outline-danger me-2">Log Out</NavLink>
                
        </Container>
    
    )
}
export default Navigation;