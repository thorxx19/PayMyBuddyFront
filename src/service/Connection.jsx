import { accountService } from './account.service'
import Axios from './caller'

let transfert = () => {
    let number = accountService.getId()
    return Axios.get('/transfert',{
        params: {id: number}   
    })
}
let clientById = () => {
    let number = accountService.getId()
    return Axios.get('/clients/',{
        params: {id: number}
    })
}
let connectById = () => {
    let number = accountService.getId()
    return Axios.get('/connect/',{
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
    let number = accountService.getId()
    return Axios.get('/transfert',{
        params: {id: number}
    })
}

export const connectService = {
    transfert, clientById, connectById, postTransfert, getAllClients, getFirstTrans
}
