import React, { useEffect, useState } from 'react';
import { Col, Container, FloatingLabel, Form, Breadcrumb, InputGroup, Button } from "react-bootstrap";
import { InputNumber } from "primereact/inputnumber"
import { useNavigate } from 'react-router-dom';


import Navigation from '../components/Navigation';
import { accountService } from '../service/account.service';
import { connectService } from "../service/Connection";
import ToasterGood from "../components/ToasterGood";
import ToasterBad from "../components/ToasterBad";



const Profile = () => {
    const [datas,setDatas] = useState([])
    const [compte,setCompte] = useState([])
    const [solde, setSolde] = useState(0);
    const [show1, setShow1] = useState(false);
    const [show3, setShow3] = useState(false);
    const [show2, setShow2] = useState(false);
    const navigate = useNavigate();

    const handleChangeCount = (event) => {
        setSolde(event.target.value);
        event.preventDefault();
      };
      const handleValid = () => {
        setShow3(false);
        setTimeout(() => {
          setShow1(!show1);
        }, 500);
        setTimeout(() => {
          setShow1(false);
          window.location.reload(false);
        }, 3000);
      };
      const handleCloseEchec = () => {
        setShow3(false);
        setTimeout(() => {
          setShow2(!show2);
        }, 500);
        setTimeout(() => {
          setShow2(false);
        }, 3000);
      };

const AddCompte = () => {
    connectService.modifCompte(solde).then(respons => {
        console.log(respons)
        if (respons.request.status === 200) {
            handleValid()
        }
    }).catch(error => {
        console.log(error)
        if (error.request.status === 403) {
            handleCloseEchec()
        }
    })
}

    useEffect(() => {
        connectService.getClient().then(respons => {
          respons.data.length === 0 ? setDatas([]) : setDatas(respons.data[0])
          respons.data.length === 0 ? setCompte([]) : setCompte(respons.data[0].accountId)
        }).catch(error => {
            if (error.response.status === 401) {
                accountService.logout()
              navigate('/auth/login')
            }
          });
      }, []);


    return (
        <Container>
           
            <Navigation/>
            <Breadcrumb>
                <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="/transfert">Transfert</Breadcrumb.Item>
                <Breadcrumb.Item active>Profile</Breadcrumb.Item>
                <Breadcrumb.Item href='/contact'>Contact</Breadcrumb.Item>
            </Breadcrumb>
                <h1 className='text-center'>Informations de compte</h1>
            <Form>
                
                    <Col md={4}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                        <FloatingLabel controlId="floatingCompteClient" label="N?? de Compte Client">
                            <Form.Control type="text" value={datas.id} placeholder="N?? de Compte Client" disabled />
                        </FloatingLabel>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                        <FloatingLabel controlId="floatingCompteBancaire" label="N?? de Compte Bancaire">
                            <Form.Control type="email" value={compte.id} placeholder="N?? de Compte Bancaire" disabled />
                        </FloatingLabel>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                        <FloatingLabel controlId="floatingNom" label="Nom">
                            <Form.Control type="text" value={datas.lastName} placeholder="Nom" disabled />
                        </FloatingLabel>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                        <FloatingLabel controlId="floatingPrenom" label="Pr??nom">
                            <Form.Control type="text" value={datas.name} placeholder="Pr??nom" disabled />
                        </FloatingLabel>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                        <FloatingLabel controlId="floatingAdress" label="Email adresse">
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
                    <Col md={4}>
                        <Form.Group className="mb-3" controlId="formBasic">
                        <FloatingLabel controlId="floatingIban" label="Iban">
                            <Form.Control type="iban" value={compte.iban} placeholder="Iban" disabled />
                        </FloatingLabel>
                        </Form.Group>
                    </Col>
            </Form>
                    <Col className='profilEnd'>
                        <h1 className='text-center'>Cr??diter ou D??biter votre compte</h1>
                        <Col xs={10}>
                            <InputGroup>
                                <InputNumber className='inputNb' value={solde} min={compte.balance - (compte.balance*2)} max={100} step={1} onValueChange={handleChangeCount} showButtons mode="currency" currency="EUR"/>
                                <Button variant="outline-success" onClick={AddCompte}>Valider</Button>{" "}
                            </InputGroup>
                        </Col>
                    </Col>
                     {/* TOASTER */}
                        <ToasterGood toasterGood={show1} />
                        <ToasterBad toasterBad={show2} />
                    {/* TOASTER */}
        </Container>
    );
}

export default Profile;