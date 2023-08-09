import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios"
import {url, setHeaders} from "./api";
import {toast} from "react-toastify";

const initialState = {
    list : [],
    status : null,
    deletedStatus : null
}
export const usersFetch = createAsyncThunk(
    "users/usersFetch",
    async()=>{
        try{
            const response = await axios.get(`${url}/users`, setHeaders())

            return response.data;
        }catch(err){
            console.log(err)
        }
    }
)

export const usersDelete = createAsyncThunk(
    "users/usersDelete",
    async(id)=>{
        try{
            const response = await axios.delete(`${url}/users/${id}`, setHeaders())

            return response.data;
        }catch(err){
            console.log(err.response.data)
            toast.error(err.response?.data, {
                position:"bottom-left"
            })
        }
    }
)


const usersSlice = createSlice({
    name : "users",
    initialState,
    reducers : {},
    extraReducers : {
        [usersFetch.pending] : (state, action)=>{
            state.status = "pending"
        },
        [usersFetch.fulfilled] : (state, action)=>{
            state.list = action.payload
            state.status = "success"
        },
        [usersFetch.rejected] : (state, action)=>{
            state.status = "rejected"
        },
        [usersDelete.pending] : (state, action)=>{
            state.deletedStatus = "pending"
        },
        [usersDelete.fulfilled] : (state, action)=>{
            const newList = state.list.filter((user)=> user._id !== action.payload._id)
            state.list = newList
            state.deletedStatus = "success"
            toast.error("User deleted" , {
                position : "bottom-left"
            })
        },
        [usersDelete.rejected] : (state, action)=>{
            state.deletedStatus = "rejected"
        }
    },
})

export default usersSlice.reducer