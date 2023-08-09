import {createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"
import {setHeaders, url} from "./api"

const initialState =  {
    list : [],
    orderListUser : [],
    status : null,
}
export const ordersFetchUser = createAsyncThunk(
    "orders/ordersFetchUser",
    async (id)=>{
        try{
            const response = await axios.get(`${url}/orders/orderFind/${id}`, setHeaders())
            return response.data
        }catch(err){
            console.log(err)
        }
    }
)

export const ordersFetch = createAsyncThunk(
    "orders/ordersFetch",
    async ()=>{
        try{
            const response = await axios.get(`${url}/orders`, setHeaders())
            return response.data
        }catch(err){
            console.log(err)
        }
    }
)
export const ordersEdit = createAsyncThunk(
    "orders/ordersEdit",
    async(values, { getState } )=>{
        const state = getState()

        let currentOrder = state.orders.list.filter( order => order._id === values._id )
        console.log("st-ord", state.orders.list )
        const newOrder = {
            ...currentOrder[0],
            delivery_status : values.delivery_status,
        };
        try{
            const response = await axios.put(
                `${url}/orders/${values.id}`,
                newOrder,
                setHeaders())
            return response.data
        }catch (err){
            console.log("err -- edit order")
        }
    }
)

const ordersSlice = createSlice({
    name : "orders",
    initialState,
    reducers : {},
    extraReducers : {
        [ordersFetch.pending] : (state, action) =>{
            state.status = "pending"
        },
        [ordersFetch.fulfilled] : (state, action) =>{
            state.status = "success"
            state.list = action.payload
        },
        [ordersFetch.rejected] : (state, action) =>{
            state.status = "rejected"
        },

        [ordersEdit.pending] : (state, action) =>{
            state.status = "pending"
        },
        [ordersEdit.fulfilled] : (state, action) =>{
            const update = state.list.map((order)=>
                order._id === action.payload._id ? action.payload : order
            )
            state.list = update
            state.status = "success"
        },
        [ordersEdit.rejected] : (state, action) =>{
            state.status = "rejected"
        },

        [ordersFetchUser.pending] : (state, action) =>{
            state.status = "pending"
        },
        [ordersFetchUser.fulfilled] : (state, action) =>{
                state.orderListUser = action.payload
                state.status = "success"
        },
        [ordersFetchUser.rejected] : (state, action) =>{
            state.status = "rejected"
        },

    },
})

export default ordersSlice.reducer