import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = ()=> {
    const logged = window.sessionStorage.getItem('token')

    return(
        logged ? <Outlet/> : <Navigate to="signin"/>
    )
}

export default PrivateRoutes