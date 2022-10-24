import React, { useEffect,useState } from 'react';
import { connectService } from '../service/Connection';
import { Card } from 'react-bootstrap';

function Brick() {
    const [dataIdDebtor, setDataIdDebtor] = useState([])
    const [data, setData] = useState([])
    let name = ""
    let balance = ""

    if (data !== null && data.balance !== null) {
        balance = data.balance
    }
    if (dataIdDebtor !== null && dataIdDebtor.name !== null) {
        name = dataIdDebtor.name
    }

    useEffect(() => {
        connectService.getFirstTrans().then((dataTransfert) => {
            console.log(dataTransfert)
            dataTransfert.data === []? setDataIdDebtor([]) : setDataIdDebtor(dataTransfert.data)
            dataTransfert.data === []? setData([]) : setDataIdDebtor(dataTransfert.data)
    }).catch(error => console.log(error));
    }, []);
    return (
        <Card style={{ width: '30rem' }}  bg="success" className='me-2'>
                <Card.Header><i class="fa-solid fa-euro-sign"></i></Card.Header>
            <Card.Body>
            <Card.Title>Solde de votre compte</Card.Title>
                <Card.Text>
                    Bonjour {name} le solde de votre compte et de {balance}€
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Brick;