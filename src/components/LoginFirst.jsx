import React, { useState } from "react";
import { Col, Button, Form,FloatingLabel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { accountService } from "../service/account.service";
import { connectService } from "../service/Connection";
import ToasterGood from "../components/ToasterGood";
import ToasterBad from "../components/ToasterBad";



    const LoginFirst = () => {
        const navigate = useNavigate()
        const [isRegister, setIsRegister] = useState(true)
        const [show1, setShow1] = useState(false);
        const [show2, setShow2] = useState(false);

        const [credentials, setCredentials] = useState({
            name: 'Marie-Anne',
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
            e.preventDefault()
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

    return (
        <>
            {isRegister ? 
            <Col xs="10" lg="4" className="m-auto my-5">
            <Form onSubmit={onSubmit} className="home">
            <Col xs="10" lg="9" className="m-auto">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="text" name="name" placeholder="Enter email"  value={credentials.name} onChange={onChange}/>
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
            </Col>
            <Col xs="10" lg="9" className="m-auto">
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" value={credentials.password} onChange={onChange}/>
                </Form.Group>
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
            <Form onSubmit={onSubmitRegister} className="home">
            <Col xs="10" lg="9" className="m-auto">
                <FloatingLabel controlId="floatingName" label="Name" className="mb-3">
                    <Form.Control type="text" name="name" placeholder="name@example.com" value={credentialsRegister.name} onChange={onChangeRegister}/>
                </FloatingLabel>
            </Col>
            <Col xs="10" lg="9" className="m-auto">
                <FloatingLabel controlId="floatingLastName" label="Last name" className="mb-3">
                    <Form.Control type="text" name="lastName" placeholder="Password" value={credentialsRegister.lastName} onChange={onChangeRegister}/>
                </FloatingLabel>
            </Col>
            <Col xs="10" lg="9" className="m-auto">
                <FloatingLabel controlId="floatingMail" label="Email address" className="mb-3">
                    <Form.Control type="email" name="mail" placeholder="name@example.com" value={credentialsRegister.mail} onChange={onChangeRegister}/>
                </FloatingLabel>
            </Col>
            <Col xs="10" lg="9" className="m-auto">
                <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3" >
                    <Form.Control type="password" name="password" placeholder="Password" value={credentialsRegister.password} onChange={onChangeRegister}/>
                </FloatingLabel>
            </Col>
            <Col xs lg="9" className="m-auto text-center my-5">
                <Button variant="primary" type="submit" className="buttonLogin">
                    Submit
                </Button>
            </Col>
            <Col className="text-start mx-3">
                <Button variant="primary" onClick={changeTrue}>
                    retour
                </Button>
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