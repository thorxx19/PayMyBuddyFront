import { accountService } from './account.service'
import Axios from './caller'

let getAlltransfert = () => {
    let number = accountService.getId()
    return Axios.get('/transferts',{
        params: {id: number}   
    })
}
let getClientById = () => {
    let number = accountService.getId()
    return Axios.get('/client',{
        params: {id: number}
    })
}
let getConnectById = () => {
    let number = accountService.getId()
    return Axios.get('/connect',{
        params: {id: number}
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
    let number = accountService.getId()
    return Axios.get('/transfert',{
        params: {id: number}
    })
}
let login = (credentials) => {
    return Axios.post('/auth/login', credentials)
}
let register = (credentials) => {
    return Axios.post('/auth/register', credentials)
}
let getAllConnect = () => {
    let number = accountService.getId()
    return Axios.get('/mail',{
        params:{id: number}
    })
}
let postConnect = (idUn,idDeux) => {
    return Axios.post('/connect',{
        idUn,
        idDeux  
    })
}
let modifCompte = (balance) => {
    let id = accountService.getId()
    return Axios.put('/solde',{
        balance,
        id
    })
}


export const connectService = {
    getAlltransfert, getClientById, getConnectById, postTransfert, getAllClients,
     getFirstTrans, login , register, getAllConnect, postConnect, modifCompte
}
