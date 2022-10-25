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

export const connectService = {
    getAlltransfert, getClientById, getConnectById, postTransfert, getAllClients, getFirstTrans
}
