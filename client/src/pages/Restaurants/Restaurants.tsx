import React, {useEffect, useState} from 'react'
import deliveryApi from '../../services/deliveryApi/deliveryApi'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Button from '../../components/Button'
import { HeaderContainer, HeaderSection } from '../../components/Header/HeaderElements'
import { isLogged } from '../../utils/authHandler'
import { RestaurantItem, RestaurantsWrapper, SearchInput } from './RestaurantsElements'
import searchSVG from '../../assets/svg/searchVector.svg'
import xSVG from '../../assets/svg/xVector.svg'
import Container from '../../components/Container'
import { CategoriesItem, CategoriesWrapper } from '../Home/HomeElements'

const Restaurants = ()=> {
    const api = deliveryApi
    const navigate = useNavigate()

    const useQueryString = ()=> {
        return new URLSearchParams( useLocation().search)
    }

    const query = useQueryString()
    const logged = isLogged()

    const [restaurantsList, setRestaurantsList] = useState<any[]>([])
    const [categoriesList, setCategoriesList] = useState<any[]>([])
    const [q, setQ] = useState<any>(query.get('q') ? query.get('q') : '')
    const [cat, setCat] = useState<any>(query.get('cat') ? query.get('cat') : '')
    const [totalRestaurants, setTotalRestaurants] = useState(0)
    const [pageCount, setPageCount] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)

    const getRestaurants = async ()=> {
        const offset = (currentPage - 1) * 10
        const json =  await api.getRestaurants({q,cat, limit: 8, offset})
        setRestaurantsList(json)
    }

    useEffect(()=> {
        let queryString = []
    
        if (cat) {
          queryString.push(`cat=${cat}`)
        }
        
        navigate(`?${queryString.join('&')}`, {replace: true})
    
        setCurrentPage(1)
        getRestaurants()
      },[cat])

    useEffect(()=>{
        if (restaurantsList.length > 0) {
            setPageCount(Math.ceil(totalRestaurants / restaurantsList.length))
        } else {
            setPageCount(1)
        }
    },[totalRestaurants])

    let pagination = []

    for (let i = 1; i <= pageCount; i++) {
        pagination.push(i)
    }

    useEffect(()=> {
        getRestaurants()
    },[])


    useEffect(()=> {
        const getCategories = async()=> {
            const json = await api.getCategories()
            setCategoriesList(json.categories)
          }
          getCategories()
    },[currentPage])
    
    return (
    <>
        <HeaderSection>
            <HeaderContainer>
            <img src="" alt="" />
            <form>
                <SearchInput placeholder='Encontre o restaurante que deseja' value={q} onChange={e=> setQ(e.target.value)}></SearchInput>
                <img src={searchSVG} alt="Pesquisar" onClick={()=> {getRestaurants()}}/>
            </form>
            {logged && 
            <Button>Meu perfil</Button>
            }
            {!logged &&
            <Link to={'/signin'}><Button>Fazer Login</Button></Link>
            }
            </HeaderContainer>
        </HeaderSection>
        <section>
        <Container>
            <CategoriesWrapper>
                {categoriesList.map((i,k)=>
                    <CategoriesItem key={k} onClick={()=> { setCat(i.slug)}}>
                    <img src={i.img} alt="" />
                    <p>{i.name}</p>
                    </CategoriesItem>
                )}
            </CategoriesWrapper>
        </Container>
        </section>
        <section>
            <Container>
                    <RestaurantsWrapper>
                        <RestaurantItem>
                            
                        </RestaurantItem>
                    </RestaurantsWrapper>
            </Container>
        </section>
    </>
    )
}

export default Restaurants