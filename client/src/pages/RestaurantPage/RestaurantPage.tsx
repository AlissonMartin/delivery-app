import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Container from '../../components/Container'
import Header from '../../components/Header/Header'
import deliveryApi from '../../services/deliveryApi/deliveryApi'
import { Banner, ComboWrapper, ProductsMenu, ProductsWrapper, RestaurantInfo } from './RestaurantPageElements'

export interface Adress {
    number: number;
    street: string;
    district: string;
    city: string;
    state: string;
}

export interface Products {
    foods: any[];
    drinks: any[];
}

export interface RestaurantInterface {
    adress: Adress;
    products: Products;
    id: string;
    name: string;
    description: string;
    email: string;
    category: string;
    photo: string;
    banner: string;
}

const RestaurantPage = () => {
    const api = deliveryApi

    const { id } = useParams()

    const [restaurant, setRestaurant] = useState<RestaurantInterface>()

    useEffect(()=>{
        if (id) {
            const getRestaurant = async()=> {
                const json = await api.getRestaurant(id)
                setRestaurant(json)
            }
            getRestaurant()
        }
    },[])
  return (
    <>
        <Header/>
        <section>
            <Container>
                <Banner src={restaurant?.banner}></Banner>
                <RestaurantInfo>
                    <img src={restaurant?.photo} alt="logo" />
                    <div>
                        <h1>{restaurant?.name}</h1>
                        <p>{restaurant?.adress.city}, {restaurant?.adress.district}</p>
                    </div>
                </RestaurantInfo>
            </Container>
        </section>
        <section>
            <Container>
                <ComboWrapper>

                </ComboWrapper>
            </Container>
        </section>
        <section>
            <Container>
                <ProductsMenu>
                    <h2>Comidas</h2>
                    <h2>Bebidas</h2>
                </ProductsMenu>
                <ProductsWrapper>
                    
                </ProductsWrapper>
            </Container>
        </section>
    </>
  )
}

export default RestaurantPage