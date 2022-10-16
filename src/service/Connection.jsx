import Axios from './caller'

let transfert = () => {
    let number = 8
    return Axios.get('/transfert',{
        params: {id: number}   
    })
}
let clientById = (id) => {
    return Axios.get('/clientId',{
        params: {id}
    })
}
let connectById = () => {
    let number = 8
    return Axios.get('/connectId',{
        params: {idUn: number}
    })
}
let postTransfert = (idDebtor, idCredit, balance , descriptif) => {
    return Axios.post('/transfert',{
        idDebtor,
        idCredit,
        balance,
        descriptif
    })
}
let getAllClients = () => {
    return Axios.get('/clients')
}
let getFirstTrans = () => {
    let number = 8
    return Axios.get('/trans',{
        params: {id: number}
    })
}

export const connectService = {
    transfert, clientById, connectById, postTransfert, getAllClients, getFirstTrans
}
