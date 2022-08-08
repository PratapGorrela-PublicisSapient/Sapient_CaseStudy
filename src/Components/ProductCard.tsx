import React, {useContext} from 'react'
import { Button, Card } from 'react-bootstrap'
import { Iproduct  } from '../model/ProductModel'
import {ProductContext} from '../Context/ProductContext'
import { Types } from '../Reducer/Reducers'
import './style.css'

interface IproductCardProps extends Iproduct{
  count?:number
}

interface IProductCartProps{
  item:IproductCardProps,
}

const ProductCard: React.FC<IProductCartProps>=({item})=> {
  const {state,dispatch} = useContext(ProductContext)

  const onBuynowAddClick=(item:IproductCardProps)=>{
    if(state.products?.length>0){
      dispatch({type:Types.Add,payload:item})
      // let _data = state.products.map(p=>{
      //   if(p.id===item.id && p.cartCount && p.cartCount>0){
      //     return {...p,cartCount:p?.cartCount+1}
      //   }
      //   else if(p.id===item.id && !p.cartCount) return {...p,cartCount:1}
      //   else return p
      // })
    }
    // if(state.products?.length>=1){
    //   let _match = state.products?.filter(p=>p.id==item.id)
    //   if(_match?.length>0) {
    //     item = {..._match[0],stock:(parseInt(_match[0].stock)+1).toString()} 
    //     changeCartCount(item.id,parseInt(_match[0].stock)+1)
    //   }
    //   else {
    //     item={...item,stock:"1"}  
    //     changeCartCount(item.id,1)
    //   }    
    //   dispatch({type:Types.Add,payload:item})
    // }
    // else  { 
    //   changeCartCount(item.id,1)
    //   dispatch({type:Types.Add,payload:{...item,stock:"1"}})
    // }
  }

  const onBuynowRemoveClick=(item:IproductCardProps)=>{
    if(state.products?.length>0){
      dispatch({type:Types.Remove,payload:item})
    }
    // if(state.products?.length>=1){
    //   let _match = state.products?.filter(p=>p.id==item.id)
    //   if(_match?.length>0) {
    //     let _cnt=parseInt(_match[0].stock)
    //     item = {..._match[0],stock:(_cnt<=0 ? 0 : _cnt-1).toString()} 
    //     // changeCartCount(item.id,(_cnt<=0 ? 0 : _cnt-1))
    //     dispatch({type:Types.Remove,payload:item})
    //   }  
    // }
  }

  return (
    <Card key={item.id} className='product__card d-flex flex-wrap' >
      <Card.Title className='card__title' >
        {item.name}
      </Card.Title>
      <Card.Img  variant='top' height='150px' style={{objectFit:'cover'}} src={item.imageURL} />
      <Card.Body className='card__body'>
        <p className='card__description'>{item.description.toString().slice(0,150)}</p>
        <Card.Footer className='footer__card d-flex justify-content-between align-items-baseline'>
          <strong className='price__info'>MRP Rs.{item.price}</strong>
          {item.cartCount!=undefined && item.cartCount>=1 ?
              <div className="d-flex align-items-center justify-content-center"
                style={{ gap: ".5rem" }}
              >
                  <i className="fa-solid fa-minus cart__action__icons" onClick={() => onBuynowRemoveClick(item)}></i>
                    <strong style={{ fontSize: "12px" }}>{item.cartCount}</strong>                    
                  <i className="fa-solid fa-plus cart__action__icons"  onClick={() => onBuynowAddClick(item)}></i>
              </div>
            :
            <Button className='buy__btn' variant="danger" onClick={()=>{onBuynowAddClick(item)}} size="sm">Buy Now</Button>
          }
        </Card.Footer>
      </Card.Body>
    </Card>
  )
}

export default ProductCard