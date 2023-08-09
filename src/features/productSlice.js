import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"
import { url, setHeaders } from "./api"
import { toast } from "react-toastify";

const initialState = {
    items: [],
    status: null,
    createStatus : null,
    editStatus : null,
    deleteStatus : null
}



// Fetch Product
export const productsFetch = createAsyncThunk(
  "products/productsFetch",
  async() => {
    try{
      const response = await axios.get(`${url}/products`)
        return response.data
    }catch( error ){
        console.log("error" ,error)
    }
  })

// Create Product
export const productsCreate = createAsyncThunk(
    "products/productsCreate",
    async(values) => {
        try{
            const response = await axios.post(`${url}/products`,
                values,
                setHeaders()
            );
            return response.data;
        }catch( error ){
            console.log("error" ,error.message)
            toast.error(error.response?.data)
        }
    })

// Edit Product
export const productsEdit = createAsyncThunk(
    "products/productsEdit",
    async(values) => {
        try{
            const response = await axios.put(`${url}/products/${values.product._id}`,
                values,
                setHeaders()
            );
            return response.data;
        }catch( error ){
            console.log("error" ,error.message)
            toast.error(error.response?.data)
        }
    })

// Delete Product
export const productsDelete = createAsyncThunk(
    "products/productsDelete",
    async(id) => {
        try{
            const response = await axios.delete(`${url}/products/${id}`,
                setHeaders()
            );
            return response.data;
        }catch( error ){
            console.log("error" ,error.message)
            toast.error(error.response?.data)
        }
    })



const productsSlice = createSlice({
  name :'products',
  initialState,
  reducers: {},
  extraReducers: {
      // Fetch
      [productsFetch.pending]: (state) => {
          state.status = "pending";
      },
      [productsFetch.fulfilled]: (state, action) => {
          state.items = action.payload;
          state.status = "success";
      },
      [productsFetch.rejected]: (state) => {
          state.status = "rejected";
      },
      // Create
      [productsCreate.pending]: (state, ) => {
          state.createStatus = "pending";
      },
      [productsCreate.fulfilled]: (state, action) => {
          state.items.push(action.payload);
          state.createStatus = "success";
          toast.success("Product Created!");
      },
      [productsCreate.rejected]: (state,) => {
          state.deleteStatus = "rejected";
      },
      // Edit
      [productsEdit.pending]: (state, ) => {
          state.editStatus = "pending";
      },
      [productsEdit.fulfilled]: (state, action) => {
          state.items  = state.items.map((product) =>
                product._id === action.payload._id ? action.payload : product)
          state.editStatus = "success";
          toast.info("Product Edited !")
      },
      [productsEdit.rejected]: (state, ) => {
          state.editStatus = "rejected";
      },
      // Delete
      [productsDelete.pending]: (state, ) => {
          state.deleteStatus = "pending";
      },
      [productsDelete.fulfilled]: (state, action) => {
          toast.error("Product Deleted!");
          state.items = state.items.filter( item => item._id !== action.payload._id)
          state.deleteStatus = "success";
      },
      [productsDelete.rejected]: (state) => {
          state.createStatus = "rejected";
      },
  },

})
export default productsSlice.reducer