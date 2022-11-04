import React from 'react';
import {Toast, ToastContainer} from "react-bootstrap";

import logo from "../assets/logo_Pay.png";

const Toaster = (props) => {
    
    return (
        <ToastContainer className="p-3" position={"top-center"}>
        <Toast
          bg={"success"}
          show={props.toasterGood}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <img src={logo} width={120} className="rounded me-2" alt="" />
            <strong className="me-auto"></strong>
            <small className="text-muted">just now</small>
          </Toast.Header>
          <Toast.Body>Sauvegarde réussie !</Toast.Body>
        </Toast>
      </ToastContainer>
    );
};

export default Toaster;