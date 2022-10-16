import React, { useEffect,useState } from 'react';
import { connectService } from '../service/Connection';
import { Card } from 'react-bootstrap';

function Brick() {
    const [dataIdDebtor, setDataIdDebtor] = useState([])
    const [data, setData] = useState([])
    useEffect(() => {
        connectService.getFirstTrans().then((dataTransfert) => {
        setDataIdDebtor(dataTransfert.data.idDebtor)
        setData(dataTransfert.data.idDebtor.accountId)
    }).catch(error => console.log(error));
    }, []);
    return (
        <Card style={{ width: '30rem' }}  bg="success" className='me-2'>
                <Card.Header><i class="fa-solid fa-euro-sign"></i></Card.Header>
            <Card.Body>
            <Card.Title>Solde de votre compte</Card.Title>
                <Card.Text>
                    Bonjour {dataIdDebtor.name} le solde de votre compte et de {data.balance}€
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Brick;