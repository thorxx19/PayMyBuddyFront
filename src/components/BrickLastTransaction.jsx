import React, { useEffect,useState } from 'react';
import Card from 'react-bootstrap/Card';
import Moment from 'moment';
import { useNavigate } from 'react-router-dom';


import { connectService } from '../service/Connection';
import { accountService } from '../service/account.service';



function Brick() {
    const [datas, setDatas] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        connectService.getFirstTrans().then(dataTransfert => {
            dataTransfert.data.length === 0 ? setDatas([]) : setDatas(dataTransfert.data)
        
    }).catch(error => {
        if (error.response.status === 401) {
            accountService.logout();
            navigate('/auth/login')
          }
    });
    }, []);

    return (
        <Card  style={{ width: '30rem' }}  bg="warning" className='card my-2'>
                <Card.Header><i className="fa-solid fa-money-bill-transfer"></i></Card.Header>
            <Card.Body>
                    <Card.Title>Dernière Transaction</Card.Title>
                    {
                        datas.map(data => (
                            <Card.Text key={data.id}>
                                Le montant de votre dernière transaction vers le compte de {data.idCredit.name} le {Moment(data.date).format('DD/MM/yyyy')} est de {data.amount}€
                            </Card.Text>
                        ))
                        
                    }
            </Card.Body>
        </Card>
    );
}

export default Brick;