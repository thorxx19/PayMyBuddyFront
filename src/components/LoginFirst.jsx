import React, { useState } from "react";
import { Col, Button, Form,FloatingLabel,Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { accountService } from "../service/account.service";
import { connectService } from "../service/Connection";
import ToasterGood from "../components/ToasterGood";
import ToasterBad from "../components/ToasterBad";
import InputGroup from 'react-bootstrap/InputGroup';



    const LoginFirst = () => {
        const navigate = useNavigate()
        const [isRegister, setIsRegister] = useState(true)
        const [show1, setShow1] = useState(false);
        const [show2, setShow2] = useState(false);
        const [validated, setValidated] = useState(false);

        const [credentials, setCredentials] = useState({
            mail: 'test@test.fr',
            password: 'admin@O.test'
        })
        const [credentialsRegister, setCredentialsRegister] = useState({
            name:'',
            lastName:'',
            mail:'',
            password:''
        })

        const changeTrue = () => {
            setIsRegister(true)
        }
        const changeFalse = () => {
            setIsRegister(false)
        }
        const handleCloseEchec = () => {
            setTimeout(() => {
              setShow2(true);
            }, 500);
            setTimeout(() => {
              setShow2(false);
            }, 3000);
          };
          const handleValid = () => {
            setTimeout(() => {
              setShow1(true);
            }, 500);
            setTimeout(() => {
              setIsRegister(true)
              setShow1(false);
            }, 3000);
          };

        const onChange = (e) => {
            setCredentials({
                ...credentials,
                [e.target.name] : e.target.value
            })
        } 
        const onChangeRegister = (e) => {
            setCredentialsRegister({
                ...credentialsRegister,
                [e.target.name] : e.target.value
            })
        } 

    const onSubmit = (e) => {
            e.preventDefault()
            console.log(credentials)
            connectService.login(credentials)
                .then(res => {
                    accountService.saveToken(res.data)
                    navigate('/home')
            })
            .catch(error => console.log(error))}

    const onSubmitRegister = (e) => {
        const form = e.currentTarget;

        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
          } else {
           

            console.log(credentialsRegister)
            connectService.register(credentialsRegister)
                .then(res => {
                   console.log(res)
                   if (res.request.status === 201) {
                    handleValid()
                   }
            })
            .catch(error => {
                console.log(error)
                if(error.response.status === 400){
                    handleCloseEchec()
                }
            })} 

            setValidated(true);
          }
      
                 

    return (
        <>
            {isRegister ? 
            <Col xs="10" lg="4" className="m-auto my-5">
            <Form onSubmit={onSubmit} className="home">
            <Col xs="10" lg="9" className="m-auto">
                
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="mail" placeholder="Enter email"  value={credentials.mail} onChange={onChange}/>
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                
            </Col>
            <Col xs="10" lg="9" className="m-auto">
                
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" value={credentials.password} onChange={onChange}/>
                
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
            </Col>
            <Col xs lg="9" className="m-auto text-center my-5">
                <Button variant="primary" type="submit" className="buttonLogin">
                    Submit
                </Button>
            </Col>
            <Col className="text-end mx-3">
                <Button variant="primary" onClick={changeFalse}>
                    registre
                </Button>
            </Col>
            </Form>
            </Col>
            :
            <Col xs="10" lg="4" className="m-auto my-5">
            <Form noValidate validated={validated} onSubmit={onSubmitRegister} className="home">
                <Col xs="10" lg="9" className="m-auto">
                    <Form.Group controlId="validationCustom01">
                        <FloatingLabel controlId="floatingName" label="Name" className="mb-3">
                        <Form.Control required type="text" name="name" placeholder="First name" value={credentialsRegister.name} onChange={onChangeRegister}/>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">Please choose a First Name.</Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>
                </Col>
                <Col xs="10" lg="9" className="m-auto">
                    <Form.Group controlId="validationCustom02">
                        <FloatingLabel controlId="floatingLastName" label="Last name" className="mb-3">
                        <Form.Control required type="text" name="lastName" placeholder="Last name" value={credentialsRegister.lastName} onChange={onChangeRegister}/>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">Please choose a Last Name.</Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>
                </Col>
                <Col xs="10" lg="9" className="m-auto">
                    <Form.Group controlId="validationCustom03">
                        <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3" >
                        <Form.Control type="password" placeholder="Password" name="password" required value={credentialsRegister.password} onChange={onChangeRegister}/>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">Please choose a Password.</Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>
                </Col>
                <Col xs="10" lg="9" className="m-auto">
                    <Form.Group controlId="validationCustom04">
                        <FloatingLabel controlId="floatingMail" label="Email address" className="mb-3">
                        <Form.Control type="email" placeholder="Mail" name="mail" required value={credentialsRegister.mail} onChange={onChangeRegister}/>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">Please provide a valid mail.</Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>
                </Col>
            
                <Col xs lg="9" className="m-auto text-center my-5">
                    <Button variant="primary" type="submit" className="buttonLogin">Submit</Button>
                </Col>
                <Col className="text-start mx-3">
                    <Button variant="primary" onClick={changeTrue}>retour</Button>
                </Col>
                {/* TOASTER */}
                    <ToasterGood toasterGood={show1} />
                    <ToasterBad toasterBad={show2} />
                {/* MODAL */}
          </Form>
          </Col>
            }
        </>
    );

}
export default LoginFirst;