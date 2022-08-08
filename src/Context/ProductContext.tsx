import React,{ createContext, useReducer} from 'react'
import {Iproduct} from '../model/ProductModel'
import {productReducer, ProductActions} from '../Reducer/Reducers'

interface IProductCart {
    products:Iproduct[],
    shoppingCart:number
}

const InitialState:IProductCart = {
    products:[],
    shoppingCart:0
}

const ProductContext = createContext<{state:IProductCart,dispatch:React.Dispatch<any>}>({
    state:InitialState,
    dispatch:()=>null
})

type ProductChildernProps={
    children:React.ReactNode
}

const mainReducer = (products:IProductCart,action:ProductActions)=>{return productReducer(products,action)}

const ProductProvider = ({children}:ProductChildernProps)=>{

    const [state, dispatch] = useReducer(mainReducer,InitialState);

    return <ProductContext.Provider value={{state, dispatch}}>{children}</ProductContext.Provider>
}

export {ProductProvider, ProductContext}