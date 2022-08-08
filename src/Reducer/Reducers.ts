import { Iproduct } from "../model/ProductModel";

type ActionMap<M extends {[index: string]: any}>={
    [key in keyof M]:M[key] extends undefined
    ?{
        type:key
    }
    :{
        type:key,
        payload:M[key]
    }
}


export enum Types{
    Add = 'ADD_ITEM',
    Remove = 'REMOVE_ITEM',
    InsertList = 'INSERT_ITEMS',
    ClearCart = 'CLEAR_CART'
}

type ProductPayload ={
    [Types.InsertList]:Iproduct[],
    [Types.Add]:{
        id:string,
        name:string,
        imageURL:string,
        description:string,
        price:string,
        stock:string,
        category:string,
        sku:string,
        cartCount?:number
    },
    [Types.Remove]:{
        id:string,
        name:string,
        imageURL:string,
        description:string,
        price:string,
        stock:string,
        category:string,
        sku:string,
        cartCount?:number
    },
    [Types.ClearCart]:null,
}

interface IProductCart{
    products:Iproduct[],
    shoppingCart:number
}

export type ProductActions  = ActionMap<ProductPayload>[keyof ActionMap<ProductPayload>];

export const productReducer = (state:IProductCart, action:ProductActions)=>{
    switch (action.type) {
        case Types.InsertList:
            return {products:action.payload,shoppingCart:0};          
            
        case Types.ClearCart:
            return {products:state.products.map(i=>{return{...i,cartCount:0}}),shoppingCart:0}; 

        case Types.Add:
            let _cnt=false;
            let _d = state.products.map(p=>{
                if(p.id===action.payload.id && p.cartCount && p.cartCount>0){
                  return {...p,cartCount:p?.cartCount+1}
                }
                else if(p.id===action.payload.id && !p.cartCount) {
                    _cnt=true
                    return {...p,cartCount:1}
                }
                else return p
            })
            return {products:_d,shoppingCart:_cnt ? state.shoppingCart+1 : state.shoppingCart}

            // let { products,shoppingCart } = state;
            // if(action.payload.stock=='1' && products.filter(p=>p.id==action.payload.id)?.length==0){
            //     products.push(action.payload)
            //     return {products,shoppingCart: shoppingCart+1};
            // }
            // else {
            //     products = products.map(i =>
            //         {if(i.id==action.payload.id) return{...i, stock:action.payload.stock}
            //         else return i
            //     }) 
            //     return {products,shoppingCart};
            // }         

        case Types.Remove:
            let cnt=false;
            let _r = state.products.map(p=>{
                if(p.id===action.payload.id && p.cartCount && p.cartCount>1){
                  return {...p,cartCount:p?.cartCount-1}
                }
                else if(p.id===action.payload.id && p.cartCount && p.cartCount==1) {
                    cnt=true
                    return {...p,cartCount:0}
                }
                else return p
            })
            return {products:_r,shoppingCart:cnt ? state.shoppingCart-1 : state.shoppingCart}
            // if(action.payload.stock>='1' && state.products.filter(p=>p.id==action.payload.id)?.length!=0){
            //     state.products = state.products.map(i =>
            //         {if(i.id==action.payload.id) return{...i, stock:action.payload.stock}
            //         else return i
            //     })
            //     return state;
            // }
            // else {
            //     state.products = state.products.filter(i =>i.id!==action.payload.id)
            //     return {...state,shoppingCart:state.shoppingCart-1};
            // }         

        default:
            return state;
    }
}