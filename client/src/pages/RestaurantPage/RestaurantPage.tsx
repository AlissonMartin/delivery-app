import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Button from '../../components/Button'
import Container from '../../components/Container'
import Header from '../../components/Header/Header'
import deliveryApi from '../../services/deliveryApi/deliveryApi'
import { Banner, Cart, Item, ComboWrapper, ProductsItem, ProductsMenu, ProductsWrapper, RestaurantInfo, CartFooter, CartButton } from './RestaurantPageElements'

interface Adress {
    number: number;
    street: string;
    district: string;
    city: string;
    state: string;
}


interface RestaurantInterface {
    adress: Adress;
    foods: any[];
    drinks: any[];
    id: string;
    name: string;
    description: string;
    email: string;
    category: string;
    photo: string;
    banner: string;
}

interface CartItemProps {
    id: string,
    quantity: number
}

const RestaurantPage = () => {
    const api = deliveryApi

    const { id } = useParams()

    const [restaurant, setRestaurant] = useState<RestaurantInterface>()
    const [selected, setSelected] = useState('foods')
    const [cartItems, setCartItems] = useState<CartItemProps[]>([])

    const increaseQuantity = (id:string)=> {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id) == null) {
                return [...currItems, {id, quantity: 1}]
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 1}
                    } else {
                        return item
                    }
                })
            }
        })
    }

    const decreaseQuantity = (id:string)=> {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id)?.quantity === 1) {
                return currItems.filter(item => item.id !== id)
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1}
                    } else {
                        return item
                    }
                })
            }
            
        })
    }

    useEffect(()=>{
        if (id) {
            const getRestaurant = async()=> {
                const json = await api.getRestaurant(id)
                setRestaurant(json)
            }
            getRestaurant()
        }
    },[])

    const CartItem = ({id, quantity}:CartItemProps)=> {

        let item = restaurant?.foods.find(i=> i._id === id)
        if (item === undefined) {
            item = restaurant?.drinks.find(i=> i._id === id)
            if (item === undefined) return null
        }

        
        return (
            <Item>
                <div className="leftSide">                
                    <img src={item.image} alt="" />
                    <div className='counter'>
                        <button onClick={()=> {decreaseQuantity(id)}}>-</button>
                        {quantity}
                        <button onClick={()=> {increaseQuantity(id)}}>+</button>
                    </div>
                </div>
                <div className="rightSide">
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <p>R$ {item.price * quantity},00</p>
                </div>
            </Item>
        )
    }

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
                    <h2 onClick={()=> { setSelected('foods')}} className={selected === 'foods' ? 'active' : ''}>Comidas</h2>
                    <h2 onClick={()=> { setSelected('drinks')}} className={selected === 'drinks' ? 'active' : ''}>Bebidas</h2>
                </ProductsMenu>
                    {selected === 'foods' &&
                        <ProductsWrapper>
                            {restaurant?.foods.map((i,k)=>
                                <ProductsItem key={k} onClick={()=>{increaseQuantity(i._id)}}>
                                    <div style={{width: '60%'}}>
                                        <h2>{i.name}</h2>
                                        <p>{i.description}</p>
                                        <p>R$ {i.price},00</p>
                                    </div>
                                    <img src={i.image} alt="" />
                                </ProductsItem>
                            )}
                        </ProductsWrapper>
                    }
                    {selected === 'drinks' &&
                        <ProductsWrapper>
                            {restaurant?.drinks.map((i,k)=>
                                <ProductsItem key={k} onClick={()=>{increaseQuantity(i._id)}}>
                                  <div style={{width: '60%'}}>
                                        <h2>{i.name}</h2>
                                        <p>{i.description}</p>
                                        <p>R$ {i.price},00</p>
                                    </div>
                                    <img src={i.image} alt="" />
                                </ProductsItem>
                            )}
                        </ProductsWrapper>
                    }
            </Container>
        </section>
        {cartItems.length > 0  &&
            <Cart>
                <div className="closeButton" onClick={(()=> {setCartItems([])})}>x</div>
                <h2>Carrinho</h2>
                {cartItems.map((i,k)=>
                    <CartItem id={i.id} quantity={i.quantity} key={k}/>
                )}
                <CartFooter>
                    <div>
                        <p className='total'>Total</p>
                        <p className='price'>R$ {cartItems.reduce((total, cartItem)=> {
                            const foods = restaurant?.foods.find(i=> i._id === cartItem.id)
                            const drinks = restaurant?.drinks.find(i=> i._id === cartItem.id)
                            return total + ((foods?.price || 0) * cartItem.quantity) + ((drinks?.price || 0) * cartItem.quantity) 
                        }, 0)}</p>
                    </div>
                    <CartButton>Fazer pedido</CartButton>
                </CartFooter>
            </Cart>
        }
    </>
  )
}

export default RestaurantPage