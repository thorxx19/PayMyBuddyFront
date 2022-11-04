import React from 'react';
import {Toast, ToastContainer} from "react-bootstrap";


import logo from "../assets/logo_Pay.png";

const Toaster = (props) => {

return(
<ToastContainer className="p-3" position={"top-center"}>
              <Toast bg={"danger"} show={props.toasterBad} delay={3000} autohide>
                <Toast.Header>
                  <img src={logo} width={120} className="rounded me-2" alt="" />
                  <strong className="me-auto"></strong>
                  <small className="text-muted">just now</small>
                </Toast.Header>
                <Toast.Body>Echec de sauvegarde !</Toast.Body>
              </Toast>
            </ToastContainer>
    )
}
export default Toaster