import React from 'react';
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Container, Form, FloatingLabel, Button } from "react-bootstrap";
import Navigation from '../components/Navigation';


const Contact = () => {
    return (
        <Container>
            <Navigation/>
            <Breadcrumb>
                <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="/transfert">Transfert</Breadcrumb.Item>
                <Breadcrumb.Item href='/profile'>Profile</Breadcrumb.Item>
                <Breadcrumb.Item active>Contact</Breadcrumb.Item>
            </Breadcrumb>
            <h1 className='text-center'>Contact</h1>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Nom</Form.Label>
                    <FloatingLabel controlId="floatingPassword" label="ex: DUPONT">
                        <Form.Control type="text" placeholder="Nom" />
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Prénom</Form.Label>
                    <FloatingLabel controlId="floatingPassword" label="ex: Yves">
                        <Form.Control type="text" placeholder="Prénom" />
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Votre email</Form.Label>
                    <FloatingLabel controlId="floatingPassword" label="ex: name@example.com">
                        <Form.Control type="email" placeholder="name@example.com" />
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Un commentaire</Form.Label>
                    <FloatingLabel controlId="floatingPassword" label="Votre commentaire...">
                        <Form.Control as="textarea" rows={3} />
                    </FloatingLabel>
                </Form.Group>
            </Form>
            <Button variant="outline-success">Valider</Button>
            <Button variant="outline-danger mx-2">Annuler</Button>
        </Container>
    );
}

export default Contact;