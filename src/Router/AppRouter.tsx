import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import App from '../App'
import Home from '../Pages/Home'
import Product from '../Pages/Product'
import {ProductProvider} from '../Context/ProductContext'
import Footer from '../Components/Footer'
import Login from '../Pages/Login'
import Register from '../Pages/Register'


function RouterComp() {

    return (
      <div className="RouterComp">
        <Router>
            <ProductProvider>
            <App/>
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/home' element={<Home/>} />
                <Route path='/products' element={<Product/>} />
                <Route path='/signin' element={<Login/>} />
                <Route path='/register' element={<Register/>} />
            </Routes>
            <Footer/>
            </ProductProvider>
        </Router>
      </div>
    )
  }
  
  export default RouterComp
  
