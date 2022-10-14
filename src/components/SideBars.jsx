import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Connection from "../service/Connection";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';


function OffCanvasExample({ name, ...props }) {
    const [show, setShow] = useState(false);
    const [data, setData] = useState([]);
    const [idCredit, setIdCredit] = useState(0)

    const handleClose = () => setShow(false);
    const handleShow = () =>  setShow(true);
   
    const handChange = ((event)=>{
    console.log(event.target.value)
    setIdCredit(event.target.value)
  })

  useEffect(()=>{
    Connection.getAllClients().then((respons)=>{
        respons === 0 ? console.log("no save") : setData(respons.data);
    })
  }, [])

  return (
    <>
      <Button variant="outline-primary" onClick={handleShow} className="me-2">
        Add connection
      </Button>
      <Offcanvas show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Ajout d'un ami</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <FloatingLabel controlId="floatingSelect" label="Ajoute un ami">
            <Form.Select value={idCredit} onChange={handChange} aria-label="Floating label select example">
                <option value={0}>Open this select menu</option>
                    {data.map((dat)=>(
                        <option key={dat.id} value={dat.id}>{dat.name}</option>
                    ))}
            </Form.Select>
            </FloatingLabel>
            <div className="d-grid gap-2 my-5">
                <Button variant="outline-success" size='lg'>
                    Valider
                </Button>
            </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

function Example() {
  return (
    <>
      {['end'].map((placement, idx) => (
        <OffCanvasExample key={idx} placement={placement} name={placement} />
      ))}
    </>
  );
}

export default Example;