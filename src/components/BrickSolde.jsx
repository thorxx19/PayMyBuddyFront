import React, { useEffect,useState} from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


import { connectService } from '../service/Connection';
import { accountService } from '../service/account.service';


function Brick() {
    const [datas, setDatas] = useState([])
    const navigate = useNavigate()
    

    useEffect(() => {
        connectService.getClient().then((dataTransfert) => {
            dataTransfert.data.length === 0 ? setDatas([]) : setDatas(dataTransfert.data)
    }).catch(error => {
        if (error.response.status === 401) {
            accountService.logout();
            navigate('/auth/login')
          }
    });
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