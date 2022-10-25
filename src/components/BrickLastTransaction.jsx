import React, { useEffect,useState } from 'react';
import { connectService } from '../service/Connection';
import Moment from 'moment';
import Card from 'react-bootstrap/Card';


function Brick() {
    const [dataIdCredit, setDataIdCredit] = useState([]);
    const [data, setData] = useState([]);
    let amount = ""
    let formatDate = ""
    let name = ""
    

    if (data !== []) {
        amount = data.amount
        formatDate = Moment(data.date).format('DD/MM/yyyy')
    }
    if(dataIdCredit !== []){
        name = dataIdCredit.name
    }
    


    useEffect(() => {
        connectService.getFirstTrans().then(dataTransfert => {
            dataTransfert.data === [] ? setDataIdCredit([]) : setDataIdCredit(dataTransfert.data[0].idCredit)
            dataTransfert.data === [] ? setData([]) : setData(dataTransfert.data[0])
        
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