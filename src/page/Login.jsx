import React from "react";
import { useState } from "react";
import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import { accountService } from "../service/account.service";


    const Login = () => {
        const navigate = useNavigate()
        const [credentials, setCredentials] = useState({
            name: 'Marie-Anne',
            password: 'admin@O.test'
        })

    const onChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name] : e.target.value
        })
    } 

    const onSubmit = (e) => {
            e.preventDefault()
            console.log(credentials)
            accountService.login(credentials)
                .then(res => {
                    accountService.saveToken(res.data)
                    navigate('/home')
            })
            .catch(error => console.log(error))
    }

    return (
        <Container>
            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="text" name="name" placeholder="Enter email"  value={credentials.name} onChange={onChange}/>
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" value={credentials.password} onChange={onChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );

}
export default Login;