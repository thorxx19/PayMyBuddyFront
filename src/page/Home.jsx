import React, {useEffect, useState} from "react";
import { Container, Row, Breadcrumb } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


import Navigation from "../components/Navigation";
import BrickLastTransfert from "../components/BrickLastTransaction";
import BrickSolde from "../components/BrickSolde";
import { connectService } from '../service/Connection';
import { accountService } from "../service/account.service";


const Home = () => {

    const [datas, setDatas] = useState(false);
    const [data, setData] = useState(false)
    const navigate = useNavigate()


    useEffect(() => {
        connectService.getFirstTrans().then(dataTrans => {
            dataTrans.data.length === 0 ? setDatas(false) : setDatas(true);
    }).catch(error => {
        if (error.response.status === 401) {
          navigate('/auth/login')
        }
      });
        connectService.getClient().then(dataTransfert => {
            dataTransfert.data.length === 0 ? setData(false) : setData(true)
    }).catch(error => {
        if (error.response.status === 401) {
            accountService.logout()
          navigate('/auth/login')
        }
      });
    }, []);


    return (
        
        <Container>
            <Navigation/>
            <Breadcrumb>
                <Breadcrumb.Item active>Home</Breadcrumb.Item>
                <Breadcrumb.Item href="/transfert">Transfert</Breadcrumb.Item>
                <Breadcrumb.Item href='/profile'>Profile</Breadcrumb.Item>
                <Breadcrumb.Item href="/contact">Contact</Breadcrumb.Item>
            </Breadcrumb>
            <Row className="justify-content-evenly">
                
                {!datas ? [] : <BrickLastTransfert/>}

                {!data ? [] : <BrickSolde />}
                
            </Row>
        </Container>
    )
}

export default Home