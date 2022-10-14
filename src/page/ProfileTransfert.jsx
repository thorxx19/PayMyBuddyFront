import React, { useEffect, useState } from 'react';
import { Col, Container, FloatingLabel, Form, Breadcrumb } from "react-bootstrap";
import Navigation from '../components/Navigation';
import Connection from "../service/Connection";


const Profile = () => {
    const [datas,setDatas] = useState([])
    const [compte,setCompte] = useState([])
    const number = 8

    useEffect(() => {
        Connection.getClientById(number).then((respons) => {
          respons === 0 ? setDatas([]) : setDatas(respons.data)
          respons === 0 ? setCompte([]) : setCompte(respons.data.accountId)
        });
      }, []);


    return (
        <Container>
            <Navigation/>
            <Breadcrumb>
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="/transfert">Transfert</Breadcrumb.Item>
                <Breadcrumb.Item active>Profile</Breadcrumb.Item>
                <Breadcrumb.Item href='/contact'>Contact</Breadcrumb.Item>
            </Breadcrumb>
                <h1 className='text-center'>Informations de compte</h1>
            <Form>
                
                    <Col md={2}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                        <FloatingLabel controlId="floatingPassword" label="N° de Compte Client">
                            <Form.Control type="email" value={datas.id} placeholder="N° de Compte Client" disabled />
                        </FloatingLabel>
                        </Form.Group>
                    </Col>
                    <Col md={2}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                        <FloatingLabel controlId="floatingPassword" label="N° de Compte Bancaire">
                            <Form.Control type="email" value={compte.id} placeholder="N° de Compte Bancaire" disabled />
                        </FloatingLabel>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                        <FloatingLabel controlId="floatingPassword" label="Nom">
                            <Form.Control type="email" value={datas.lastName} placeholder="Nom" disabled />
                        </FloatingLabel>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                        <FloatingLabel controlId="floatingPassword" label="Prénom">
                            <Form.Control type="email" value={datas.name} placeholder="Prénom" disabled />
                        </FloatingLabel>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                        <FloatingLabel controlId="floatingPassword" label="Email adresse">
                            <Form.Control type="email" value={datas.mail} placeholder="Enter email" disabled />
                        </FloatingLabel>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                        <FloatingLabel controlId="floatingPassword" label="Password">
                            <Form.Control type="password" value={datas.password} placeholder="Password" disabled />
                        </FloatingLabel>
                        </Form.Group>
                    </Col>
                
            </Form>
        </Container>
    );
}

export default Profile;