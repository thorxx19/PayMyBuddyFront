import React from "react";
import { Container } from "react-bootstrap";
import Navigation from "../components/Navigation";




function Home (){
    return (
        <Container fluid="md" className="justify-content-md-center">
            <Navigation/>
            <h1 className="text-center">PayMyBuddy</h1>
        </Container>
    )
}

export default Home