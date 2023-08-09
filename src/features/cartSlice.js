import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { toast } from "react-toastify"
import axios from "axios";
import {url, setHeaders} from "./api";

const initialState = {
  cartItems : [],
  status : "",
  cartTotalQuantity : 0,
  cartTotalAmount : 0,
}

export const cartFetch = createAsyncThunk(
    "cart/cartFetch",
    async() => {
        const id = localStorage.getItem("user-id")
      try{
        const response = await axios.get(`${url}/users/found/${id}`)
      console.log("cart-fetch")
        return response.data.products
      }catch(err){
        console.log(err)
        }
    })

const cartSlice = createSlice({
  name : "cart",
  initialState,
  reducers : {
      getTotals(state, action){
        let { total, quantity } = state.cartItems?.reduce(( cartTotal, cartItem)=>{
          const{ price, cartQuantity } = cartItem
          const itemTotal = price * cartQuantity
          cartTotal.quantity += cartQuantity
          cartTotal.total += itemTotal
          // console.log(cartTotal)
          return cartTotal
        },{
          total :0 ,
          quantity : 0,
        })
        state.cartTotalQuantity = quantity;
        state.cartTotalAmount = total;
      }
  },
  extraReducers : {
    [cartFetch.pending] : (state, action )=>{
      state.status = "pending"
    },
    [cartFetch.fulfilled] : (state, action) => {
      state.status = "success"
      state.cartItems = action.payload
    },
    [cartFetch.rejected] : (state, action )=>{
      state.status = "rejected"
    },
  }
});
export const { addToCart , removeFromCart , decreaseCart , allClearCart , getTotals } = cartSlice.actions;
export default cartSlice.reducer; 
