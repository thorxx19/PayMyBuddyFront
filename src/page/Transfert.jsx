import React, { useState, useEffect } from "react";
import { connectService } from "../service/Connection";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Pagination from "../components/Pagination";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import "../style/index.css";
import SideBars from "../components/SideBars";
import Navigation from "../components/Navigation";
import ToasterGood from "../components/ToasterGood";
import ToasterBad from "../components/ToasterBad";
import { useNavigate } from "react-router-dom";
import { accountService } from "../service/account.service";
import { InputNumber } from "primereact/inputnumber"




function Transfert() {
  const [connect, setConnect] = useState([]);
  const [idCredit, setIdCredit] = useState(0);
  const [idDebtor, setIdDebtor] = useState(0);
  const [solde, setSolde] = useState(0);
  const [name, setName] = useState("");
  const [descript, setDescript] = useState("");
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [styleNumber, setStyleNumber] = useState("");
  const [styleSelect, setStyleSelect] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    console.log(event.target.value);
    setIdCredit(event.target.value);
  };

  const handleChangeCount = (event) => {
    setSolde(event.target.value);
    event.preventDefault();
  };

  const handleChangeDescript = (event) => {
    console.log(event.target.value);
    setDescript(event.target.value);
    event.preventDefault();
  };

  const handleClose = () => {
    setShow3(false);
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

  const handleShow = (event) => {
    if (solde > 0) {
      setStyleNumber("styleNumberGood");
    } else {
      setStyleNumber("styleNumberNoGood");
    }
    if (idCredit > 0) {
      setStyleSelect("styleNumberGood");
    } else {
      setStyleSelect("styleNumberNoGood");
    }
    if (idCredit > 0 && solde > 0) {
      connectService.getClientById(idCredit).then(respons => {
        if (respons.request.status === 200) {
          setName(respons.data[0].name)
        }
      }).catch(error => console.log(error));
      setShow3(true);
    }
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    if (idCredit > 0 && solde > 0) {
      connectService.postTransfert(idDebtor, idCredit, solde, descript).then(
          respons => {
            console.log(respons)
            if (respons.request.status === 200) {
              handleValid()
            }
        }).catch(error => {
          console.log(error)
          handleCloseEchec()
        });
    }
    event.preventDefault();
  };

  useEffect(() => {
    connectService.getConnectById().then(responsConnect => {
      responsConnect.data.length === 0 ? setConnect([]) : setConnect(responsConnect.data);
      responsConnect.data.length === 0 ? setIdDebtor(0) : setIdDebtor(responsConnect.data[0].idUn.id);
    }).catch(error => {
      if (error.response.status === 401) {
        accountService.logout();
        navigate('/auth/login')
      }
    });
  }, []);

  return (
    <Container fluid="md" className="justify-content-md-center">
      <Navigation />
      <Breadcrumb>
        <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
        <Breadcrumb.Item active>Transfert</Breadcrumb.Item>
        <Breadcrumb.Item href='/profile'>Profile</Breadcrumb.Item>
        <Breadcrumb.Item href="/contact">Contact</Breadcrumb.Item>
      </Breadcrumb>
      <Row className="my-3">
        <Col md={4}>
          <h3>Send Money</h3>
        </Col>
        <Col md={{ span: 4, offset: 4 }}>
          {/* SIDEBARS */}
          <SideBars />
        </Col>
      </Row>
      <Form noValidate onSubmit={handleSubmit}>
        <Row className="my-3">
          <Col xs={4}>
            <FloatingLabel controlId="floatingSelect" label="Choisis un ami">
              <Form.Select value={idCredit} className={styleSelect} onChange={handleChange} >
                <option value={0}>Open this select menu</option>
                {connect.map((con) => (
                  <option key={con.idDeux.id} value={con.idDeux.id}>
                    {con.idDeux.name}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
          </Col>
          <Col xs={4}>
            <InputGroup>
              <InputNumber value={solde} min={0} max={100} step={1} onValueChange={handleChangeCount} showButtons mode="currency" currency="EUR"/>
            </InputGroup>
          </Col>
          <Col xs={4}>
            <Button variant="outline-success" onClick={handleShow} className='buttonPay'>
              Pay
            </Button>{" "}
          </Col>
          {/* TOASTER */}
          <ToasterGood toasterGood={show1} />
          <ToasterBad toasterBad={show2} />
          {/* MODAL */}
         

          <Modal show={show3} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header>
              <Modal.Title>
                Validation du Transfert de votre compte au compte de {name} d'un montant de {solde} €. <br/>
              <span className="spanTitle">Des frais de 0,5% sont appliqués à la transaction.</span> 
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Vous pouvez ajouter une description de votre transaction
              <InputGroup>
                <FloatingLabel controlId="floatingPassword" label="Descriptif">
                  <Form.Control type="textarea" placeholder="Descriptif" value={descript} onChange={handleChangeDescript}></Form.Control>
                </FloatingLabel>
              </InputGroup>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline-danger" onClick={handleClose}>
                Annuler
              </Button>
              <Button variant="outline-success" onClick={handleSubmit}>
                Valider
              </Button>
            </Modal.Footer>
          </Modal>
        </Row>
      </Form>
      <Pagination />
    </Container>
  );
}
export default Transfert;
