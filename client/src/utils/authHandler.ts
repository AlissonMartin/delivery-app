export const isLogged = ()=> {
    const token = window.localStorage.getItem('refreshToken')

    if (token) {
        return true
    } else {
        return false
    }
}

export const doLogin = (token:string, refreshToken:string)=> {
    if (token) {
        window.sessionStorage.setItem("token", token)
    }
  
    if (refreshToken) {
    window.localStorage.setItem("refreshToken", refreshToken)
    }
}

export const doLogout = ()=> {
    const token = window.sessionStorage.getItem('token')
    const refreshToken = window.localStorage.getItem('refreshToken')

    if (token) {
        window.sessionStorage.removeItem('token')
    }
    if (refreshToken) {
        window.localStorage.removeItem('refreshToken')
    }
}