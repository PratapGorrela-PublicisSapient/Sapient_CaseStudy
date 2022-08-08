import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {Icategory} from '../model/CategoryModel'
import {Ibanner} from '../model/BannerModel'
import { Button,Carousel } from 'react-bootstrap';
import {Endpoints} from '../Configuration/endpoints_config_api'
import { useNavigate } from 'react-router-dom';

function Home() {
  let history = useNavigate();
  let [categories,setCategories] = useState<Icategory[]>([])
  let [banners,setBanners] = useState<Ibanner[]>([])

  useEffect(()=>{
    async function getCategories(){
      let data = await axios.get(Endpoints.GET_CATEGORIES)
      setCategories(data?.data)
    }
    getCategories()
  },[])

  useEffect(()=>{
    async function getBanners(){
      let data = await axios.get(Endpoints.GET_BANNERES)
      setBanners(data?.data)
    }
    getBanners()
  },[])

  const goToProductCategory=(id:string)=>{
    history({ pathname: '/products', search: `id=${id}`});
  }
 
  const filter_data = [{name:'Fruits & Vegetables',id:'5b6899953d1a866534f516e2',label:'fruit-and-veg'},{name:'Backery Cakes and Dairy',id:'5b6899123d1a866534f516de',label:'backery-cakes-dairy'},{name:'Beverages',id:'5b675e5e5936635728f9fc30',label:'beverages'},
                      {name:'Beauty and Hygine',id:'5b68994e3d1a866534f516df',label:'beauty-hygine'},{name:'Baby Care',id:'5b6899683d1a866534f516e0',label:'baby'}]

  return (
   <main className='d-flex flex-column' style={{gap:'20px'}}>
    <Carousel nextLabel='Next' >
      {banners.map(b=>(
        <Carousel.Item key={b.id}>
          <img
            className="d-block w-100"
            src={b?.bannerImageUrl}
            alt={b?.bannerImageAlt}
          />
          <Carousel.Caption>
            <p>{b.bannerImageAlt}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}    
    </Carousel>
    <div>        
      {categories?.map((c:Icategory,i:number)=>(
        <section className='category__card'>
          {(i%2==0) && <img style={{width:'300px'}}  alt={c?.name} src={c.imageUrl} />}
          <section className='d-flex flex-column category__body'>
            <strong className='align-self-center'>{c?.name}</strong>
            <span className='category__description'>{c.description}</span>
            {filter_data.filter(k=>k.id===c.id)?.map(a=>(<Button size='sm' onClick={()=>goToProductCategory(a.id)} style={{alignSelf:'center',padding:'0px 0px !important'}} variant='danger'>Explore {a.label}</Button>))}
          </section>
          {(i%2!==0) && <img style={{width:'300px'}}  alt={c?.name} src={c.imageUrl} />}
        </section>
      ))}
    </div>
   </main>
  )
}     

export default Home