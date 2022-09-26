import React from "react";
import Connection from "../service/Connection";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Pagination  from "./Pagination";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import logo from '../assets/logo_Pay.png'


class Transfert extends React.Component{
    constructor(props){
        super(props)
        this.state = {connect : [], value : 0, valueCount : 0, id : 0, show1 : false, show2 : false} 
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this); 
        this.handleChangeCount = this.handleChangeCount.bind(this);
    }
    handleChange(event) {
        this.setState({value: event.target.value});
      }
    handleChangeCount(event){
        this.setState({valueCount: event.target.value})
    }
    hideComponent(name){
        switch (name) {
            case "show1":
                this.setState({show1: !this.state.show1})
                break;
            case "show2":
                this.setState({show2: !this.state.show2})
                break;    
            default:
                break;
        }
    }
    
    handleSubmit(event) {
        const {valueCount, value, id} = this.state
        if (value !== 0 && valueCount > 0) {
            Connection.postTransfert(id, value, valueCount).then((respons)=>{
                respons === "no save" ? this.setState({show2: !this.state.show2}) : this.setState({show1: !this.state.show1})
            }) 
            setTimeout(() => {
                window.location.reload(false)
            }, 3000);
        } else {
            this.setState({show2: !this.state.show2})
            
        }
        event.preventDefault();
    }

    componentDidMount(){
        Connection.getConnectById().then((responsConnect)=>{
            responsConnect === 0 ? this.setState({connect: []}) : this.setState({connect : responsConnect.data})
            responsConnect === 0 ? this.setState({id: 0}) : this.setState({id : responsConnect.data[0].idUn.id})
        })
    }

    render (){
        const {show1, valueCount, value, show2} = this.state
        return (
            <Container fluid='md' className="justify-content-md-center">
                <Breadcrumb>
                    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>Transfert</Breadcrumb.Item>
                </Breadcrumb>
                <Row className="my-3">
                    <Col md={4}>
                        <h3>Send Money</h3>
                    </Col>
                    <Col md={{span: 4, offset:4}}>
                        <button type="button" className="btn btn-primary ">Add Connection</button>
                    </Col>
                </Row>
                    <Form noValidate validated={this.validated} onSubmit={this.handleSubmit}>
                        <Row className="my-3">
                            <Col xs={4}>
                                <Form.Select value={value} onChange={this.handleChange}>
                                    <option value={0}>Select A Connection</option>
                                    {this.state.connect.map((con)=>
                                    <option key={con.idDeux.id} value={con.idDeux.id}>{con.idDeux.name}</option>
                                    )}
                                </Form.Select>
                            </Col>
                            <Col xs={4}>
                                <InputGroup>
                                        <Form.Control type="number" min={0} max={100} step={1} value={valueCount} onChange={this.handleChangeCount}></Form.Control>
                                </InputGroup>
                            </Col>
                            <Col xs={4}>
                                <Button variant="outline-success"  type="submit">Submit form</Button>{' '}
                            </Col>
                    {/* TOASTER */}
                            <ToastContainer className="p-3" position={'top-center'}>
                            <Toast onClose={() => this.hideComponent("show1")} bg={'success'} show={show1} delay={3000} autohide>
                                    <Toast.Header>
                                        <img src={logo} width={120}  className="rounded me-2"alt=""/>
                                        <strong className="me-auto"></strong>
                                        <small className="text-muted">just now</small>
                                    </Toast.Header>    
                                <Toast.Body>Sauvegarde réussie !</Toast.Body>
                            </Toast>
                            </ToastContainer>
                            <ToastContainer className="p-3" position={'top-center'}>
                            <Toast onClose={() => this.hideComponent("show2")} bg={'danger'} show={show2} delay={3000} autohide>
                                    <Toast.Header>
                                        <img src={logo} width={120}  className="rounded me-2"alt=""/>
                                        <strong className="me-auto"></strong>
                                        <small className="text-muted">just now</small>
                                    </Toast.Header>    
                                <Toast.Body>Echec de sauvegarde !</Toast.Body>
                            </Toast>
                            </ToastContainer>
                        </Row>
                    </Form>
                    <Pagination/>
            </Container>
        );
    }
}
export default Transfert;