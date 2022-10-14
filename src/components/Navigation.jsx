import React from "react";
import { Container } from "react-bootstrap";
import {NavLink} from "react-router-dom";


const Navigation = () =>{
    return(
        
        <Container className=" navbar navbar-dark bg-dark justify-content-end head">
            
                <NavLink to="/" type="button" className="btn btn-outline-success me-2">Home</NavLink>

                <NavLink to="/transfert" type="button" className="btn btn-outline-success me-2">Transfert</NavLink>

                <NavLink to="/profile" type="button" className="btn btn-outline-success me-2">Profile</NavLink>

                <NavLink to="/contact" type="button" className="btn btn-outline-success me-2">Contact</NavLink>
                
        </Container>
    
    )
}
export default Navigation;