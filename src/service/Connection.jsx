import Axios from './caller'

let getAlltransfert = () => {
    return Axios.get('/transferts')
}
let getClient = () => {
    return Axios.get('/client')
}
let getConnectById = () => {
    return Axios.get('/connect')
}
let postTransfert = (idCredit, balance , descriptif) => {
    return Axios.post('/transfert',{
        idCredit,
        balance,
        descriptif
    })
}
let getAllClients = () => {
    return Axios.get('/clients')
}
let getFirstTrans = () => {
    return Axios.get('/transfert')
}
let login = (credentials) => {
    return Axios.post('/auth/login', credentials)
}
let register = (credentials) => {
    return Axios.post('/auth/register', credentials)
}
let getAllConnect = () => {
    return Axios.get('/mail')
}
let postConnect = (idDeux) => {
    return Axios.post('/connect',{
        idDeux  
    })
}
let modifCompte = (balance) => {
    return Axios.put('/solde',{
        balance
    })
}
let getClientById = (id) => {
    return Axios.get('/clientId',{
        params:{
            id
        }
    })
}


export const connectService = {
    getAlltransfert, getClient, getConnectById, postTransfert, getAllClients,
     getFirstTrans, login , register, getAllConnect, postConnect, modifCompte,getClientById
}
