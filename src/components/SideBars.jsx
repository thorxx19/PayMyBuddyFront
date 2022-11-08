import React, { useState, useEffect } from 'react';
import {Button, Offcanvas} from 'react-bootstrap';
import { AutoComplete } from 'primereact/autocomplete';
import { useNavigate } from 'react-router-dom';


import { connectService } from "../service/Connection";
import { accountService } from '../service/account.service';
import ToasterBad from "../components/ToasterBad";


import "../style/App.css"


function OffCanvasExample({ name, ...props }) {
    const [show, setShow] = useState(false);
    const [datas, setDatas] = useState([]);
    const navigate = useNavigate;
    const [selectedMail, setSelectedMail] = useState(null);
    const [filteredMail, setFilteredmail] = useState(null);
    const [show2, setShow2] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () =>  setShow(true);

    const handleCloseEchec = () => {
      setTimeout(() => {
        setShow2(true);
        handleClose()
      }, 500);
      setTimeout(() => {
        setShow2(false);
        navigate("/auth/login")
      }, 3000);
    };
    
   
    const handChange = (()=>{
    console.log(selectedMail.id)
    connectService.postConnect(selectedMail.id).then(respons => {
      console.log(respons)
      if (respons.request.status === 202) {
        setDatas((current) => current.filter(user => user.id !== selectedMail.id))
        handleClose()
        setSelectedMail(null)
        window.location.reload(false);
      }
    }).catch(error => {
      console.log(error)
      if (error.response.status === 401) {
        handleCloseEchec()
      }
    })
  })

  const itemTemplate = (item) => {
    return (
        <div className="country-item">
            <div>{item.mail}</div>
        </div>
    );
}

  useEffect(()=>{
      connectService.getAllConnect().then(respons => {
        respons.data.length === 0 ? setDatas([]) : setDatas(respons.data);
    }).catch(error => {
      if (error.response.status === 401) {
        accountService.logout();
        navigate('/auth/login')
      }
    })
  }, [])

  const searchCountry = (event) => {
    setTimeout(() => {
        let _filteredMail;
        if (!event.query.trim().length) {
            _filteredMail = [...datas];
        }
        else {
            _filteredMail = datas.filter((data) => {
                return data.mail.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
        setFilteredmail(_filteredMail);
    }, 250);
}

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
          
            <div className="card" style={{ position: 'relative', zIndex: '2' }}>
                <AutoComplete value={selectedMail} suggestions={filteredMail} completeMethod={searchCountry} field="mail" dropdown forceSelection itemTemplate={itemTemplate} onChange={(e) => setSelectedMail(e.value)} aria-label="Mail" dropdownAriaLabel="Select Mail" />
            </div>

            <div className="d-grid gap-2 my-5">
                <Button variant="outline-success" onClick={handChange} size='lg'>
                    Valider
                </Button>
            </div>
        </Offcanvas.Body>
        {/* TOASTER */}
                <ToasterBad toasterBad={show2} />
      </Offcanvas>
    </>
  );
}

function Example() {
  return (
    <>
      {['end'].map((placement, idx) => (
        <OffCanvasExample key={idx} placement={placement} name={placement}  />
      ))}
    </>
  );
}

export default Example;