import React, {useEffect, useState} from "react";
import { Container } from "react-bootstrap";
import Navigation from "../components/Navigation";
import Row from "react-bootstrap/Row";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import BrickLastTransfert from "../components/BrickLastTransaction";
import BrickSolde from "../components/BrickSolde";
import { connectService } from '../service/Connection';


const Home = () => {

    const [datas, setDatas] = useState(false);
    const [data, setData] = useState(false)

    useEffect(() => {
        connectService.getFirstTrans().then(dataTransfert => {
            dataTransfert.data === [] ? setDatas(false) : setDatas(true);
    }).catch(error => console.log(error));
        connectService.getClientById().then((dataTransfert) => {
            dataTransfert.data === [] ? setData(false) : setData(true)
    }).catch(error => console.log(error));
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