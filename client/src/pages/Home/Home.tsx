  import Button from '../../components/Button'
import Header from '../../components/Header/Header'
import Container from '../../components/Container'
import Footer from '../../components/Footer/Footer'
import { Card, CardWrapper, CategoriesItem, CategoriesWrapper, Gallery, GalleryItem, GalleryWrapper, LeftArrow, MainWrapper, RectangleItem, RectangleWrapper, RightArrow, SearchWrapper } from './HomeElements'
import deliveryApi from '../../services/deliveryApi/deliveryApi'

import avatar from '../../assets/svg/Vector.svg'
import shoppingBag from '../../assets/svg/Vector-1.svg'
import location from '../../assets/svg/Vector-2.svg'
import search from '../../assets/svg/searchVector.svg'
import burger from '../../assets/images/burger-home.png'

import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'


const Home = () => {
  const api = deliveryApi

  const [categoriesList, setCategoriesList] = useState<any[]>([])
  const [restaurantsList, setRestaurantsList] = useState<any[]>([])
  const [q, setQ] = useState('')
  const navigate = useNavigate()
  
  const carousel = useRef<HTMLDivElement>(null)
  const searchForm = useRef<HTMLFormElement>(null)

  useEffect(()=> {
    const getCategories = async()=> {
      const json = await api.getCategories()
      setCategoriesList(json.categories)
    }
    getCategories()
  }, [])

  useEffect(()=> {
    const getRestaurants =async () => {
      const json = await api.getRestaurants()
      setRestaurantsList(json)
    }
    getRestaurants()
  }, [])

  const handleLeftClick = (e:React.MouseEvent) => {
    e.preventDefault()
    if (carousel.current) {
      carousel.current.scrollLeft -= carousel.current.offsetWidth
    }
  }

  const handleRightClick = (e: React.MouseEvent) => {
    if (carousel.current) {
      carousel.current.scrollLeft += carousel.current.offsetWidth
    }
  }
  return (
    <>
      <Header/>
      <section>
        <Container>
          <MainWrapper>
            <div className='leftSide'>
              <h2>O Hamburguer mais delicioso da Sua Cidade</h2>
              <p>É um fato estabelecido há muito tempo que um leitor se distrairá com o conteúdo legível de uma página ao olhar para seu layout.</p>
              <Button>Fazer Pedido</Button>
            </div>
            <div className='rightSide'>
              <img src={burger} alt="hamburguer" className='burgerImage' />
              <RectangleWrapper>
                <RectangleItem>
                  <img src={avatar} alt="Logou" />
                  <p>Logou</p>
                </RectangleItem>
                <RectangleItem>
                  <img src={shoppingBag} alt="Pediu" />
                  <p>Pediu</p>
                </RectangleItem>
                <RectangleItem>
                  <img src={location} alt="Chegou" />
                  <p>Chegou</p>
                </RectangleItem>
              </RectangleWrapper>
            </div>
          </MainWrapper>
        </Container>
      </section>
      <section style={{ backgroundColor: '#f9f9fb' }}>
      <Container>
        <CategoriesWrapper>
          {categoriesList.map((i,k)=>
            <CategoriesItem key={k} onClick={()=> { navigate(`/restaurants?cat=${i.slug}`)}}>
              <img src={i.img} alt="" />
              <p>{i.name}</p>
            </CategoriesItem>
          )}
        </CategoriesWrapper>
        <SearchWrapper>
          <h3>Pesquise o seu <br /> restaurante preferido!</h3>
          <form action="/restaurants" method='GET' ref={searchForm}>
            <img src={search} alt="Busca" onClick={()=> { navigate(`/restaurants?q=${q}`) }}/>
            <input type="text" placeholder='Digite o nome do restaurante' value={q} onChange={e=> setQ(e.target.value)}/>
          </form>
        </SearchWrapper>
      </Container>
      </section>
      <section>
        <Container style={{position: 'relative'}}>
          <LeftArrow onClick={handleLeftClick}>&lt;</LeftArrow>
          <RightArrow onClick={handleRightClick}>&gt;</RightArrow>
          <GalleryWrapper>
            <Gallery ref={carousel}>
              {restaurantsList.map((i,k)=>
                <GalleryItem key={k}>
                  <div className='leftSide'>
                    <img src={i.photo} alt="" />
                  </div>
                  <div className='rightSide'>
                    <h3>{i.name}</h3>
                    <p>{i.category}</p>
                  </div>
                </GalleryItem>
              )}
            </Gallery>
          </GalleryWrapper>
        </Container>
      </section>
      <section>
        <Container>
          <CardWrapper>
            <Card></Card>
            <p>Cadastre seu Restaurante!</p>
          </CardWrapper>
        </Container>
      </section>
      <Footer/>
    </>
  )
}

export default Home