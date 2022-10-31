import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { connectService } from "../service/Connection";
import { accountService } from '../service/account.service';
import { useNavigate } from 'react-router-dom';
import { AutoComplete } from 'primereact/autocomplete';
import "../style/App.css"
import ToasterGood from "../components/ToasterGood";
import ToasterBad from "../components/ToasterBad";

function OffCanvasExample({ name, ...props }) {
    const [show, setShow] = useState(false);
    const [datas, setDatas] = useState([]);
    const navigate = useNavigate;
    const [selectedCountry2, setSelectedCountry2] = useState(null);
    const [filteredCountries, setFilteredCountries] = useState(null);
    const [show1, setShow1] = useState(false);
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
    const handleValid = () => {
      setTimeout(() => {
        setShow1(true);
      }, 500);
      setTimeout(() => {
        setShow1(false);
        handleClose()
        setSelectedCountry2(null)
      }, 3000);
    };
   
    const handChange = (()=>{
    console.log(selectedCountry2.id)
    connectService.postConnect(accountService.getId(), selectedCountry2.id).then(respons => {
      console.log(respons)
      if (respons.request.status === 202) {
        setDatas((current) => current.filter(user => user.id !== selectedCountry2.id))
        handleClose()
        setSelectedCountry2(null)
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
        let _filteredCountries;
        if (!event.query.trim().length) {
            _filteredCountries = [...datas];
        }
        else {
            _filteredCountries = datas.filter((data) => {
                return data.mail.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
        setFilteredCountries(_filteredCountries);
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
                <AutoComplete value={selectedCountry2} suggestions={filteredCountries} completeMethod={searchCountry} field="mail" dropdown forceSelection itemTemplate={itemTemplate} onChange={(e) => setSelectedCountry2(e.value)} aria-label="Mail" dropdownAriaLabel="Select Mail" />
            </div>

            <div className="d-grid gap-2 my-5">
                <Button variant="outline-success" onClick={handChange} size='lg'>
                    Valider
                </Button>
            </div>
        </Offcanvas.Body>
        {/* TOASTER */}
                <ToasterGood toasterGood={show1} />
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