import Button from '../components/Button'
import Header from '../components/Header/Header'
import Container from '../components/Container'
import { CategoriesItem, CategoriesWrapper, LeftSide, MainWrapper, RectangleItem, RectangleWrapper, RightSide, SearchWrapper } from './HomeElements'
import deliveryApi from '../services/deliveryApi/deliveryApi'

import avatar from '../assets/svg/Vector.svg'
import shoppingBag from '../assets/svg/Vector-1.svg'
import location from '../assets/svg/Vector-2.svg'
import search from '../assets/svg/searchVector.svg'
import burger from '../assets/images/burger-home.png'

import { useState, useEffect } from 'react'


const Home = () => {
  const api = deliveryApi

  const [categoriesList, setCategoriesList] = useState<any[]>([])
  const [q, setQ] = useState('')

  useEffect(()=> {
    const getCategories = async()=> {
      const json = await api.getCategories()
      setCategoriesList(json.categories)
    }
    getCategories()
  },[])
  return (
    <>
      <Header/>
      <section>
        <Container>
          <MainWrapper>
            <LeftSide>
              <h2>O Hamburguer mais delicioso da Sua Cidade</h2>
              <p>É um fato estabelecido há muito tempo que um leitor se distrairá com o conteúdo legível de uma página ao olhar para seu layout.</p>
              <Button>Fazer Pedido</Button>
            </LeftSide>
            <RightSide>
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
            </RightSide>
          </MainWrapper>
        </Container>
      </section>
      <section style={{ backgroundColor: '#f9f9fb' }}>
      <Container>
        <CategoriesWrapper>
          {categoriesList.map((i,k)=>
            <CategoriesItem>
              <img src={i.img} alt="" />
              <p>{i.name}</p>
            </CategoriesItem>
          )}
        </CategoriesWrapper>
        <SearchWrapper>
          <h3>Pesquise o seu <br /> restaurante preferido!</h3>
          <form action="">
            <img src={search} alt="Busca" />
            <input type="text" placeholder='Digite o nome do restaurante' value={q} onChange={e=> setQ(e.target.value)}/>
          </form>
        </SearchWrapper>
      </Container>
      </section>
    </>
  )
}

export default Home