import React from 'react'
import { Button, Container,Nav, Navbar as NavbarBS } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

import { NavLink } from 'react-router-dom'
import Logo from '../../static/images/logo.png'
import { ProductContext } from '../Context/ProductContext'
import Cart from './Cart'

export default function Navbar() {
  const [modalShow, setModalShow] = React.useState(false);
  // const [checkOut, setCheckOut] = React.useState(false);
  let history = useNavigate();
  const {state} = React.useContext(ProductContext)
  const {products, shoppingCart} = state;
  const User = localStorage.getItem('userName')
  

  const openCart=()=>{
    setModalShow(true)
  }

  const logout=()=>{
    localStorage.removeItem('userName')
    history('/signin')
  }

  const onCheckout=()=>{
    setModalShow(false)
    setTimeout(()=>{alert('Order Success, ThankYou..!!')},1000) 
    // setCheckOut(true)
  }

  return (
        <NavbarBS sticky='top' className='bg-white shadow-lg'>
          <Container>
            <Nav className='me-auto links'>
              <NavbarBS.Brand >
                <img width="70px" height="auto" className="img-responsive" src={Logo}  alt="logo" />
              </NavbarBS.Brand>
              <Nav.Link to="/home" as={NavLink}>Home</Nav.Link>
              <Nav.Link to="/products" as={NavLink}>Products</Nav.Link>
            </Nav>
            <section className='cart__nav__container d-flex' >
              {User ? <div className='me-auto links d-flex' style={{gap:"10px", marginBottom:'10px'}}><strong className='user__info'>Welcome {User}</strong><Button className='logout__link' onClick={logout}>Logout</Button> </div>
                :<Nav className='me-auto links'>
                  <Nav.Link to="/signin" as={NavLink}>SignIn</Nav.Link>
                  <Nav.Link to="/register" as={NavLink}>Register</Nav.Link>              
                </Nav>
              }
              <Button
                onClick={openCart}
                style={{ width: "2.5rem", height: "2.5rem", position: "relative" }}
                variant="outline-primary"
                className="cart__icon"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                  fill="currentColor"
                >
                  <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
                </svg>

                <div
                  className="cart__count rounded-circle bg-danger d-flex justify-content-center align-items-center"
                  style={{
                    color: "white",
                    width: "1.2rem",
                    height: "1.2rem",
                    position: "absolute",
                    top: 0,
                    right: 0,
                    transform: "translate(25%, -25%)",
                  }}
                >
                  {shoppingCart}
                </div>
              </Button>
            </section>
          </Container>
          {/* {checkOut && <div className="alert alert-success" role="alert"> Order Success, ThankYou..!!</div>} */}
          <Cart state={modalShow} onHide={() => setModalShow(false)} count={shoppingCart} products={products} onCheckout={onCheckout} />
        </NavbarBS>
  )
}
