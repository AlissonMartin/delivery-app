import React, {useEffect, useState} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import deliveryApi from '../../services/deliveryApi/deliveryApi'
import Button from '../../components/Button'
import { HeaderContainer, HeaderSection, Logo } from '../../components/Header/HeaderElements'
import { isLogged } from '../../utils/authHandler'
import { Pagination, RestaurantItem, RestaurantsWrapper, SearchInput } from './RestaurantsElements'
import Container from '../../components/Container'
import { CategoriesItem, CategoriesWrapper } from '../Home/HomeElements'

import searchSVG from '../../assets/svg/searchVector.svg'
import pin from '../../assets/svg/location-pinSVG.svg'
import logo from '../../assets/fast.png'


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
        const offset = (currentPage - 1) * 6
        const json =  await api.getRestaurants({q,cat, limit: 6, offset})
        setRestaurantsList(json.restaurants)
        setTotalRestaurants(json.totalRestaurants)
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

    useEffect(()=> {
        getRestaurants()
    },[])

    useEffect(()=>{
        if (restaurantsList.length > 0) {
            setPageCount(Math.ceil(totalRestaurants / restaurantsList.length))
        } else {
            setPageCount(1)
        }
    },[totalRestaurants])

    let pagination: number[] = []

    for (let i = 1; i <= pageCount; i++) {
        pagination.push(i)
    }

    useEffect(()=> {
        const getCategories = async()=> {
            const json = await api.getCategories()
            setCategoriesList(json.categories)
          }
          getCategories()
    },[])
    
    useEffect(()=> {
        getRestaurants()
    },[currentPage])

    return (
    <>
        <HeaderSection>
            <HeaderContainer>
            <Link to={'/'}><Logo src={logo} alt="logo" /></Link>
            <form method='GET'>
                <SearchInput name='q' placeholder='Encontre o restaurante que deseja' value={q} onChange={e=> setQ(e.target.value)}></SearchInput>
                <img src={searchSVG} alt="Pesquisar" onClick={()=> {getRestaurants()}} className='search'/>
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
                    {restaurantsList.length > 0 &&
                        <>
                            <RestaurantsWrapper>
                            { restaurantsList.map((i,k)=> 
                                    <RestaurantItem style={{backgroundImage: `url(${i.banner})`}} key={k} onClick={()=> {navigate(`/restaurant/${i.id}`)}}>
                                    <div className='describer'>
                                        <div className='leftSide'>
                                            <img src={i.photo} alt="" />
                                        </div>
                                        <div className='rightSide'>
                                            <h2>{i.name}</h2>
                                            <p>{i.description}</p>
                                            <div className='adress'> <img src={pin} alt="" /> <p>{i.adress.city}, {i.adress.district}</p></div>
                                        </div>
                                    </div>
                                </RestaurantItem>
                            )}
                            </RestaurantsWrapper>
                            <Pagination>
                                {pagination.map((i,k)=>
                                    <div onClick={()=> setCurrentPage(i)} className={i === currentPage ? 'active' : ''} key={k}>{i}</div>
                                )}
                            </Pagination>
                         </>
                    }
                    {restaurantsList.length === 0 &&
                        <RestaurantsWrapper>
                            <h2>Nenhum Restaurante encontrado</h2>
                        </RestaurantsWrapper>
                    }
            </Container>
        </section>
    </>
    )
}

export default Restaurants