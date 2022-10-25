import React, { useEffect,useState } from 'react';
import { connectService } from '../service/Connection';
import { Card } from 'react-bootstrap';

function Brick() {
    const [datas, setDatas] = useState([])
    

    useEffect(() => {
        connectService.getClientById().then((dataTransfert) => {
            dataTransfert.data === [] ? setDatas([]) : setDatas(dataTransfert.data)
    }).catch(error => console.log(error));
    }, []);
    return (
        <Card style={{ width: '30rem' }}  bg="success" className='card my-2'>
                <Card.Header><i className="fa-solid fa-euro-sign"></i></Card.Header>
            <Card.Body>
            <Card.Title>Solde de votre compte</Card.Title>
                
                    {
                        datas.map(data =>(
                        <Card.Text key={data.id}>
                            Bonjour {data.name} le solde de votre compte et de {data.accountId.balance}€
                        </Card.Text>
                        ))
                    }
                    
                
            </Card.Body>
        </Card>
    );
}

export default Brick;