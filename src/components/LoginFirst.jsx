import React, { useState} from "react";
import { Col, Button, Form, FloatingLabel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';


import { accountService } from "../service/account.service";
import { connectService } from "../service/Connection";
import ToasterBad from "../components/ToasterBad";

import logo from "../assets/logo_Pay.png";
import "../style/App.css"




    const LoginFirst = () => {
        const navigate = useNavigate()
        const [isRegister, setIsRegister] = useState(true)
        const [showMessage, setShowMessage] = useState(false);
        const [formData, setFormData] = useState({});
        const [show2, setShow2] = useState(false);

        const formik = useFormik({
            initialValues: {
                name: '',
                lastName:'',
                mail: '',
                password: '',
                accept: false
            },
            validate: (data) => {
                let errors = {};
    
                if (!data.name) {
                    errors.name = 'Name is required.';
                }
                if (!data.lastName) {
                    errors.lastName = 'Last name is required.'
                }
    
                if (!data.mail) {
                    errors.mail = 'Email is required.';
                }
                else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.mail)) {
                    errors.mail = 'Invalid email address. E.g. example@email.com';
                }
    
                if (!data.password) {
                    errors.password = 'Password is required.';
                }
                else if (!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/i.test(data.password)) {
                    errors.password = 'Invalid Password. E.g. Example1234#';
                }
    
                if (!data.accept) {
                    errors.accept = 'You need to agree to the terms and conditions.';
                }
    
                return errors;
            },
            onSubmit: (data) => {
                console.log(data)
                setFormData(data);
                connectService.register(data)
                .then(res => {
                   console.log(res)
                   if (res.request.status === 201) {
                    setShowMessage(true);
                    navigate('/auth/login')
                   }
                })
                .catch(error => {
                console.log(error)
                    handleCloseEchec()
                })
                formik.resetForm();
            }
        });
        const handleCloseEchec = () => {
            setTimeout(() => {
              setShow2(true);
            }, 500);
            setTimeout(() => {
              setShow2(false);
            }, 3000);
          };
    
        const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
        const getFormErrorMessage = (name) => {
            return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
        };
    
        const dialogFooter = <div className="flex justify-content-center">
            <Button variant="outline-primary" autoFocus onClick={() => {
                setShowMessage(false)
                }}>Ok</Button>
            </div>;
        const passwordHeader = <h6>Pick a password</h6>;
        const passwordFooter = (
            <React.Fragment>
                <Divider />
                <p className="mt-2">Suggestions</p>
                <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: '1.5' }}>
                    <li>At least one lowercase</li>
                    <li>At least one uppercase</li>
                    <li>At least one numeric</li>
                    <li>Minimum 8 characters</li>
                </ul>
            </React.Fragment>
        );

        const [credentials, setCredentials] = useState({
            mail: 'test@test.fr',
            password: 'admin@O.test'
        })
        
        const changeTrue = () => {
            setIsRegister(true)
        }
        const changeFalse = () => {
            setIsRegister(false)
        }
        
        const onChange = (e) => {
            setCredentials({
                ...credentials,
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
            .catch(error => {
                console.log(error)
                handleCloseEchec()
            })}

    return (
        <>
            {isRegister ? 
            <Col xs="10" lg="4" className="m-auto my-5">
            <Form onSubmit={onSubmit} className="home">
            <Col className="my-5 text-center">
                <img src={logo} width={220} className="rounded logoLogin" alt="logo payMyBuddy"/>
            </Col>
            <Col xs="10" lg="9" className="m-auto">
                <FloatingLabel controlId="floatingMail" label="Email address" className="mb-3">
                    <Form.Control type="email" name="mail" placeholder="Enter email"  value={credentials.mail} onChange={onChange}/>
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </FloatingLabel>
            </Col>
            <Col xs="10" lg="9" className="m-auto">
                <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3" >
                    <Form.Control type="password" name="password" placeholder="Password" value={credentials.password} onChange={onChange}/>
                </FloatingLabel>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
            </Col>
            <Col xs lg="9" className="m-auto text-center my-5">
                <Button variant="outline-success" type="submit" className="buttonLogin">
                    Submit
                </Button>
            </Col>
            <Col className="text-end mx-3">
                <Button variant="outline-primary" onClick={changeFalse}>
                    Registre
                </Button>
            </Col>
            {/* TOASTER */}
                <ToasterBad toasterBad={show2} />
            {/* MODAL */}
            </Form>
            </Col>
            :
            <div className="form-demo">
            <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="flex align-items-center flex-column pt-6 px-3">
                    <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                    <h5>Registration Successful!</h5>
                    <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                        Your account is registered under name <b>{formData.name}</b> ; it'll be valid next 30 days without activation. Please check <b>{formData.mail}</b> for activation instructions.
                    </p>
                </div>
            </Dialog>

            <Col xs="10" lg="4" className="m-auto my-5">
                
                    <form onSubmit={formik.handleSubmit} className="p-fluid home">

                    <Col className="my-5 text-center">
                    <img src={logo} width={220} className="rounded logoLogin" alt="logo payMyBuddy"/>
                    </Col>

                        <Col xs="10" lg="9" className="m-auto">
                            <span className="p-float-label">
                                <InputText id="name" name="name" value={formik.values.name} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('name') })} />
                                <label htmlFor="name" className={classNames({ 'p-error': isFormFieldValid('name') })}>Name*</label>
                            </span>
                            {getFormErrorMessage('name')}
                        </Col>
                        <Col xs="10" lg="9" className="m-auto my-4">
                            <span className="p-float-label">
                                <InputText id="lastName" name="lastName" value={formik.values.lastName} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('lastName') })} />
                                <label htmlFor="lastName" className={classNames({ 'p-error': isFormFieldValid('name') })}>Last Name*</label>
                            </span>
                            {getFormErrorMessage('lastName')}
                        </Col>
                        <Col xs="10" lg="9" className="m-auto">
                            <span className="p-float-label p-input-icon-right">
                                <i className="pi pi-envelope" />
                                <InputText id="mail" name="mail" value={formik.values.mail} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('mail') })} />
                                <label htmlFor="mail" className={classNames({ 'p-error': isFormFieldValid('mail') })}>Email*</label>
                            </span>
                            {getFormErrorMessage('mail')}
                        </Col>
                        <Col xs="10" lg="9" className="m-auto my-4">
                            <span className="p-float-label">
                                <Password id="password" name="password" value={formik.values.password} onChange={formik.handleChange} toggleMask
                                    className={classNames({ 'p-invalid': isFormFieldValid('password') })} header={passwordHeader} footer={passwordFooter} />
                                <label htmlFor="password" className={classNames({ 'p-error': isFormFieldValid('password') })}>Password*</label>
                            </span>
                            {getFormErrorMessage('password')}
                        </Col>
                        <Col xs="10" lg="9" className="m-auto">
                            <Checkbox inputId="accept" name="accept" checked={formik.values.accept} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('accept') })} />
                            <label htmlFor="accept" className={classNames({ 'p-error': isFormFieldValid('accept') })}>I agree to the terms and conditions*</label>
                        </Col>
                        <Col xs lg="9" className="m-auto text-center my-5">
                        <Button variant="outline-success" type="submit" className="buttonLogin">Submit</Button>
                        </Col>
                        <Col className="text-start mx-3">
                            <Button variant="outline-primary" onClick={changeTrue}>Login</Button>
                        </Col>
                        {/* TOASTER */}
                            <ToasterBad toasterBad={show2} />
                        {/* MODAL */}
                    </form>
            </Col>
        </div>
            }
        </>
    );

}
export default LoginFirst;