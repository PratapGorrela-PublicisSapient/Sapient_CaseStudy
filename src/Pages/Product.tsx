import React,{useState,useEffect, useContext} from 'react'
import axios from 'axios'
import { Iproduct  } from '../model/ProductModel'
import { Col, Row } from 'react-bootstrap'
import ProductCard from '../Components/ProductCard'
import {ProductContext} from '../Context/ProductContext'
import { Types } from '../Reducer/Reducers'
import {Endpoints} from '../Configuration/endpoints_config_api'
import { useLocation } from 'react-router-dom';
import './style.css'

function Product() {
  const params = useLocation();
  let _filterID=params.search.split('=')?.[1];
  let [filter,setFilter] = useState<string|null>(_filterID ?? null)
  const {state,dispatch} = useContext(ProductContext)
  let {products} = state
  console.log(products)

  useEffect(()=>{
    async function getProducts(){
      let data = await axios.get(Endpoints.GET_PRODUCTS)
      if(data.data?.length>0) dispatch({type:Types.InsertList,payload:data?.data})
    }
    getProducts()
  },[])

  const filter_data = [{name:'ALL',id:null},{name:'Fruits & Vegetables',id:'5b6899953d1a866534f516e2'},{name:'Backery Cakes and Dairy',id:'5b6899123d1a866534f516de'},{name:'Beverages',id:'5b675e5e5936635728f9fc30'},
                      {name:'Beauty and Hygine',id:'5b68994e3d1a866534f516df'},{name:'Baby Care',id:'5b6899683d1a866534f516e0'}]

  return (
    <div className='product__page__main'>
      <section className='product__filter__section'> 
        {filter_data.map((p)=>(<p className='filter__category' key={p.id} onClick={()=>setFilter(p.id)}>{p.name}</p>))}
      </section>    
          
      <div className='produts__container'>
        <Row  xs={3} md={4} lg={4} xxl={5} className="products__row g-3 d-flex flex-wrap">      
            {filter ?
              products.filter(c=>c.category===filter).map((i:Iproduct)=>(<Col key={i.id}><ProductCard  item={i} /></Col>))
            :
              products.map((i:Iproduct)=>(<Col key={i.id}><ProductCard  item={i} /></Col>))
            }
        </Row>      
      </div>    
    </div>
  )
}

export default Product