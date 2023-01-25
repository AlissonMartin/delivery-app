import { Routes, Route} from 'react-router-dom'
import Home from '../pages/Home/Home'
import SignIn from '../pages/SignIn/SignIn'
import SignUp from '../pages/SignUp/SignUp'
import Restaurants from '../pages/Restaurants/Restaurants'

const MainRoutes = ()=> {
    return (
        <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/signin' element={<SignIn/>}></Route>
            <Route path='/signup' element={<SignUp />}></Route>
            <Route path='/restaurants' element={<Restaurants />}></Route>
        </Routes>
    )
}

export default MainRoutes