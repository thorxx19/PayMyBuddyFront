import React, { useEffect,useState } from 'react';
import { connectService } from '../service/Connection';
import Moment from 'moment';
import Card from 'react-bootstrap/Card';


function Brick() {
    const [dataIdCredit, setDataIdCredit] = useState([]);
    const [data, setData] = useState([]);
    let amount = ""
    let name = ""
    let formatDate = ""

    if (data !== null) {
        amount = data.amount
        formatDate = Moment(data.date).format('DD/MM/yyyy')
    }
    if (dataIdCredit !==  null && dataIdCredit.idCredit !== null) {
        name = dataIdCredit.idCredit
    }


    useEffect(() => {
        connectService.getFirstTrans().then(dataTransfert => {
            console.log(dataTransfert)
            dataTransfert.data === [] ? setDataIdCredit([]) : setDataIdCredit(dataTransfert.data)
            dataTransfert.data === [] ? setData([]) : setData(dataTransfert.data)
        
    }).catch(error => console.log(error));
    }, []);

    return (
        <Card  style={{ width: '30rem' }}  bg="warning" className='me-2'>
                <Card.Header><i class="fa-solid fa-money-bill-transfer"></i></Card.Header>
            <Card.Body>
                    <Card.Title>Dernière Transaction</Card.Title>
                <Card.Text>
                    Le montant de votre dernière transaction vers le compte de {name} le {formatDate} est de {amount}€
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Brick;