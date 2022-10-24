import Axios from "./caller";


let login = (credentials) => {
    return Axios.post('/auth/login', credentials)
}

let saveToken = (token) => {
    console.log(token)
    localStorage.setItem('id',token.userId)
    localStorage.setItem('token', token.accessToken)
}

let logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('id')
}

let isLogged = () => {
    let token = localStorage.getItem('token')
    return !! token
}

let getToken = () => {
    return localStorage.getItem('token')
} 

let getId = () => {
    return localStorage.getItem('id')
}

export const accountService = {
    saveToken, logout, isLogged, login, getToken, getId
}