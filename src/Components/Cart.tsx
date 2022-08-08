import React from 'react'
import { Button, Alert, Row, Col } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { Iproduct  } from '../model/ProductModel'
import {ProductContext} from '../Context/ProductContext'
import { Types } from '../Reducer/Reducers'

interface IcartProps{
    state:boolean,
    onHide:()=>void,
    count:number,
    products:Iproduct[],
    onCheckout:()=>void
}

function Cart(props:IcartProps) {
    const {state,dispatch} = React.useContext(ProductContext);
    let _cart_items=props.products.filter(k=>k.cartCount&& k.cartCount>0);
    
    const getTotalValue=()=>{
        let p=0
        let price = _cart_items.map(c=>(p=p+(parseInt(c.price)*(c.cartCount ?? 1))))
        return p
    }

    const onBuynowAddClick=(item:Iproduct)=>{
        if(state.products?.length>0)   dispatch({type:Types.Add,payload:item})
    }

    const onBuynowRemoveClick=(item:Iproduct)=>{
        if(state.products?.length>0)    dispatch({type:Types.Remove,payload:item})
    }

    const doCheckout=()=>{
      dispatch({type:Types.ClearCart})
      props.onCheckout()
    }

  return (
    <Modal
      show={props.state}
      onHide={props.onHide}
    //   style={{width:'1600px',height:'500px'}}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton closeVariant='white' className='cart__header'>
        <Modal.Title id="contained-modal-title-vcenter" className='cart__title'>
          My Cart {_cart_items.length>0 ? `(${props.count} item)` : ''}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='cart__modal__body'>
        {_cart_items.length>0 ? 
            <>
                <Row className="cart__products__row d-flex flex-wrap" style={{gap:'20px', backgroundColor:'#fff'}}>      
                    {_cart_items.map((item:Iproduct)=>(<Col key={item.id} className="cart__products__column">
                        <section key={item.id} className='cart__product__card d-flex flex-row justify-content-between'  style={{gap:'10px', height:'80px'}}>
                            <img height='50px' width='50px' style={{objectFit:'cover'}} src={item.imageURL} />
                            <section className='cart__actions'>
                                <span className='cart__item__title' >{item.name}</span>
                                <div className="d-flex align-items-center" style={{ gap: ".5rem" }}>
                                    <i className="fa-solid fa-minus cart__icons"  onClick={() => onBuynowRemoveClick(item)}></i>
                                        <strong style={{ fontSize: "12px" }}>{item.cartCount}</strong>                    
                                    <i className="fa-solid fa-plus cart__icons" onClick={() => onBuynowAddClick(item)}></i>
                                    <strong className='price__info'><i className="fa fa-times" aria-hidden="true"></i> Rs.{item.price}</strong>
                                </div>
                            </section>                    
                            <strong className='price__info total__price'> Rs.{parseInt(item.price)*(item.cartCount ?? 1)}</strong>
                        </section>
                    </Col>))}
                </Row>                   
                <p className='cart__tag'>You won't find it cheaper anywhere</p>
            </>
            :
                <div className='d-flex flex-column justify-content-center' style={{height:'400px'}}>
                    <strong className='cart__noitem__text'>No items in your cart</strong>
                    <span className='cart__fav__text'>Your favourite items are just a click away</span>
                </div>
            }
      </Modal.Body>
      <Modal.Footer className='cart__footer'>
        {_cart_items.length>0 ?  <><span className='cart__footer__text'>Promocode can be applied on payment page</span>
        <Button variant='danger'  className='cart__footer__btn' onClick={doCheckout}>Proceed to Checkout Rs.{getTotalValue()}</Button></>
        :
        <Button variant='danger'  className='cart__footer__btn' onClick={props.onHide}>Start Shopping</Button>}
      </Modal.Footer>
    </Modal>
  )
}

export default Cart