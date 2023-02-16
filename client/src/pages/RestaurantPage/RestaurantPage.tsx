import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import Container from '../../components/Container'
import Footer from '../../components/Footer/Footer'
import { CloseButton, Hamburguer, HeaderButton, HeaderContainer, HeaderSection, Logo, MenuMobile, NavBar, NavItem } from '../../components/Header/HeaderElements'
import logo from '../../assets/fast.png'
import deliveryApi from '../../services/deliveryApi/deliveryApi'
import { isLogged } from '../../utils/authHandler'
import { Banner, Cart, Item, ComboWrapper, ProductsItem, ProductsMenu, ProductsWrapper, RestaurantInfo, CartFooter, CartButton } from './RestaurantPageElements'
import Button from '../../components/Button'

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
    const navigate = useNavigate()

    const { id } = useParams()

    const [restaurant, setRestaurant] = useState<RestaurantInterface>()
    const [selected, setSelected] = useState('foods')
    const [cartItems, setCartItems] = useState<CartItemProps[]>([])
    const [isOpen, setIsOpen] = useState(false)
    const [isActive, setIsActive] = useState(false)

    const increaseQuantity = (id: string) => {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id) == null) {
                return [...currItems, { id, quantity: 1 }]
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }

    const decreaseQuantity = (id: string) => {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id)?.quantity === 1) {
                return currItems.filter(item => item.id !== id)
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1 }
                    } else {
                        return item
                    }
                })
            }

        })
    }

    useEffect(() => {
        if (id) {
            const getRestaurant = async () => {
                const json = await api.getRestaurant(id)
                setRestaurant(json)
            }
            getRestaurant()
        }
    }, [])

    const CartItem = ({ id, quantity }: CartItemProps) => {

        let item = restaurant?.foods.find(i => i._id === id)
        if (item === undefined) {
            item = restaurant?.drinks.find(i => i._id === id)
            if (item === undefined) return null
        }


        return (
            <Item>
                <div className="leftSide">
                    <img src={item.image} alt="" />
                    <div className='counter'>
                        <button onClick={() => { decreaseQuantity(id) }}>-</button>
                        {quantity}
                        <button onClick={() => { increaseQuantity(id) }}>+</button>
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

    const logged = isLogged()
    return (
        <>
            {isActive &&
                <MenuMobile>
                    <Link to={'/'}><Logo src={logo} alt="logo" /></Link>
                    <nav className='navBarMobile'>
                        <NavItem onClick={() => { navigate('/restaurants') }}>Restaurantes</NavItem>
                        <NavItem onClick={() => { navigate('') }}>Contato</NavItem>
                    </nav>
                    {logged &&
                        <Button>Meu perfil</Button>
                    }
                    {!logged &&
                        <Link to={'/signin'}><Button>Fazer Login</Button></Link>
                    }
                    <CloseButton onClick={() => { setIsActive(!isActive) }}>x</CloseButton>
                </MenuMobile>
            }
            <HeaderSection>
                <HeaderContainer>
                    <Link to={'/'}><Logo src={logo} alt="logo" /></Link>
                    <NavBar>
                        <NavItem onClick={() => { navigate('/restaurants') }}>Restaurantes</NavItem>
                        <NavItem onClick={() => { navigate('') }}>Contato</NavItem>
                    </NavBar>
                    <div className='shoppingCart' onClick={() => { setIsOpen(true) }}>
                        <p>{cartItems.length}</p>
                    </div>
                    {logged &&
                        <HeaderButton>Meu perfil</HeaderButton>
                    }
                    {!logged &&
                        <Link to={'/signin'}><HeaderButton>Fazer Login</HeaderButton></Link>
                    }
                    <Hamburguer onClick={() => { setIsActive(!isActive) }}>
                        <div className='bar'></div>
                        <div className='bar middle' ></div>
                        <div className='bar'></div>
                    </Hamburguer>
                </HeaderContainer>
            </HeaderSection>
            <section>
                <Container>
                    <Banner src={restaurant?.banner}></Banner>
                    <RestaurantInfo>
                        <img src={restaurant?.photo} alt="logo" className='photo' />
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
                        <h2 onClick={() => { setSelected('foods') }} className={selected === 'foods' ? 'active' : ''}>Comidas</h2>
                        <h2 onClick={() => { setSelected('drinks') }} className={selected === 'drinks' ? 'active' : ''}>Bebidas</h2>
                    </ProductsMenu>
                    {selected === 'foods' &&
                        <ProductsWrapper>
                            {restaurant?.foods.map((i, k) =>
                                <ProductsItem key={k} onClick={() => { increaseQuantity(i._id); setIsOpen(cartItems.length === 0 ? true : isOpen) }}>
                                    <div style={{ width: '60%' }}>
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
                            {restaurant?.drinks.map((i, k) =>
                                <ProductsItem key={k} onClick={() => { increaseQuantity(i._id); setIsOpen(cartItems.length === 0 ? true : isOpen) }}>
                                    <div style={{ width: '60%' }}>
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
            {isOpen &&
                <Cart>
                    <div className="closeButton" onClick={(() => { setIsOpen(false) })}>x</div>
                    <h2>Carrinho</h2>
                    {cartItems.map((i, k) =>
                        <CartItem id={i.id} quantity={i.quantity} key={k} />
                    )}
                    <CartFooter>
                        <div>
                            <p className='total'>Total</p>
                            <p className='price'>R$ {cartItems.reduce((total, cartItem) => {
                                const foods = restaurant?.foods.find(i => i._id === cartItem.id)
                                const drinks = restaurant?.drinks.find(i => i._id === cartItem.id)
                                return total + ((foods?.price || 0) * cartItem.quantity) + ((drinks?.price || 0) * cartItem.quantity)
                            }, 0)}</p>
                        </div>
                        <CartButton>Fazer pedido</CartButton>
                    </CartFooter>
                </Cart>
            }
            <Footer />
        </>
    )
}

export default RestaurantPage