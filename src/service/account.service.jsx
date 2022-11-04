

let saveToken = (token) => {
    console.log(token)
    localStorage.setItem('token', token.accessToken)
    
}

let logout = () => {
    localStorage.removeItem('token')
}

let isLogged = () => {
    let token = localStorage.getItem('token')
    return !! token
}

let getToken = () => {
    return localStorage.getItem('token')
} 
export const accountService = {
    saveToken, logout, isLogged, getToken
}