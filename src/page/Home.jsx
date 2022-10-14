import React from "react";
import { Container } from "react-bootstrap";
import Navigation from "../components/Navigation";
import Row from "react-bootstrap/Row";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import BrickLastTransfert from "../components/BrickLastTransaction";
import BrickSolde from "../components/BrickSolde";



const Home = () => {
    return (
        
        <Container>
            <Navigation/>
            <Breadcrumb>
                <Breadcrumb.Item active>Home</Breadcrumb.Item>
                <Breadcrumb.Item href="/transfert">Transfert</Breadcrumb.Item>
                <Breadcrumb.Item href='/profile'>Profile</Breadcrumb.Item>
                <Breadcrumb.Item href="/contact">Contact</Breadcrumb.Item>
            </Breadcrumb>
            <Row className="justify-content-evenly">
            
                <BrickLastTransfert />
            
                <BrickSolde />
            
            </Row>
        </Container>
    )
}

export default Home