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


class Transfert extends React.Component{
    constructor(props){
        super(props)
        this.state = {transfert: [], connect : [], value : 0, valueCount : 0, id : 0, show1 : false, show2 : false} 
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this); 
        this.handleChangeCount = this.handleChangeCount.bind(this);
        
     
    }
    handleChange(event) {
        console.log(event.target.value)
        this.setState({value: event.target.value});
      }
    handleChangeCount(event){
        console.log(event.target.value)
        this.setState({valueCount: event.target.value})
    }
    hideComponent(name){
        switch (name) {
            case "show1":
                this.setState({show1: !this.state.show1})
                break;
            case "show2":
                this.setState({show2: !this.state.show2})    
            default:
                break;
        }
    }
    handleSubmit(event) {
        if (this.state.value !== 0 && this.state.valueCount !== 0) {
            Connection.postTransfert(this.state.id,this.state.value,this.state.valueCount).then((respons)=>{
                respons === "no save" ? this.setState({show2: !this.state.show2}) : this.setState({show1: !this.state.show1})
                respons === "no save" ? console.log("no save") : window.location.reload(false)
            }) 
        } else {
            this.setState({show2: !this.state.show2})
        }
        event.preventDefault();
    }

    componentDidMount(){
        Connection.getAllTransfer().then((respons)=>{
            respons === 0 ? this.setState({transfert: []}) : this.setState({transfert: respons})
        })
        Connection.getConnectById().then((responsConnect)=>{
            responsConnect === 0 ? this.setState({connect: []}) : this.setState({connect : responsConnect.data})
            responsConnect === 0 ? this.setState({id: 0}) : this.setState({id : responsConnect.data[0].idUn.id})
        })
    }

    render (){
        const {show1, valueCount, value, show2} = this.state
        return (
            <Container>
                
                <p className="text-start">Home  /  Transfer</p>
                <Row className="row justify-content-between my-3">
                    <Col xs={6}>
                        <h3>Send Money</h3>
                    </Col>
                    <Col xs={6}>
                        <button type="button" className="btn btn-primary col-3">Add Connection</button>
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
                                        <img src="holder.js/20x20?text=%20" className="rounded me-2"alt=""/>
                                        <strong className="me-auto">Bootstrap</strong>
                                        <small className="text-muted">just now</small>
                                    </Toast.Header>    
                                <Toast.Body>Sauvegarde réussie !</Toast.Body>
                            </Toast>
                            </ToastContainer>
                            <ToastContainer className="p-3" position={'top-center'}>
                            <Toast onClose={() => this.hideComponent("show2")} bg={'danger'} show={show2} delay={3000} autohide>
                                    <Toast.Header>
                                        <img src="holder.js/20x20?text=%20" className="rounded me-2"alt=""/>
                                        <strong className="me-auto">Bootstrap</strong>
                                        <small className="text-muted">just now</small>
                                    </Toast.Header>    
                                <Toast.Body>Echec de sauvegarde !</Toast.Body>
                            </Toast>
                            </ToastContainer>

                        </Row>
                    </Form>
                    
                
                <table className="table table-striped my-5 table-borderless">
                    <thead>
                        <tr className="table-success">
                            <td>Connections</td>
                            <td>Description</td>
                            <td>Amount</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.transfert.map((trans)=>
                        <tr key={`${trans.id}`}>
                            <td>{`${trans.idCredit.name}`}</td>
                            <td>{`${trans.description}`}</td>
                            <td>{`${trans.amount}`}</td>
                        </tr>
                        )}
                    </tbody>
                </table>
            </Container>
        );
    }
}
export default Transfert;