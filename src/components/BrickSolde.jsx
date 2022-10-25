import React, { useEffect,useState } from 'react';
import { connectService } from '../service/Connection';
import { Card } from 'react-bootstrap';

function Brick() {
    const [dataIdDebtor, setDataIdDebtor] = useState([])
    const [data, setData] = useState([])
    let name = ""
    let balance = ""

    if (dataIdDebtor !== []) {
        balance = dataIdDebtor.balance
    }
    if (dataIdDebtor !== []) {
        name = data.name
    }

    useEffect(() => {
        connectService.getFirstTrans().then((dataTransfert) => {
            dataTransfert.data === [] ? setDataIdDebtor([]) : setDataIdDebtor(dataTransfert.data[0].idDebtor.accountId)
            dataTransfert.data === [] ? setData([]) : setData(dataTransfert.data[0].idDebtor)
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