import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from"axios"
import { url } from "./api";
import jwtDecode from "jwt-decode"

const initialState = {
  token : localStorage.getItem("token"),
  name : "",
  email : "",
  _id : "",
  isAdmin : "",
  products : [],
  registerStatus : "",
  registerError : "",
  loginStatus : "",
  loginError : "",
  userLoaded : "false",
  createdAt : "",
}
export const registerUser = createAsyncThunk(
  "auth/registerUser",
 async (values, {rejectWithValue}) => {
    try{
      const token = await axios.post(`${url}/register`,{
          name : values.name,
          email : values.email,
          password : values.password
        })
      localStorage.setItem("token", token.data)

      return token.data
    }catch(err){
      // console.log("error Async Action ", err.response.data)
      return rejectWithValue(err.response.data)
    }
  })

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (values, {rejectWithValue}) => {
      try{
        const obj = await axios.post(`${url}/login`,{
          email : values.email,
          password : values.password
        })
        localStorage.setItem("token", obj.data.token)
        localStorage.setItem("user-id", obj.data.user._id)
        return obj.data
      }catch(err){
        // console.log("error Async Action ", err.response.data)
        return rejectWithValue(err.response.data)
      }
    })

const authSlice = createSlice({
  name : "auth",
  initialState,
  reducers : {
    loaderUser(state){
      const token = state.token
      if(token){
        const user = jwtDecode(token)
        return {
          ...state,
          token  ,
          name : user.name,
          email : user.email,
          _id : user._id,
          isAdmin: user.isAdmin,
          userLoaded: true
        }
      }
    },
    logoutUser(state){
      localStorage.clear()
      return {
        ...state,
        token :  "",
        name : "",
        email : "",
        _id : "",
        isAdmin: false,
        registerStatus : "",
        registerError : "",
        loginError : "",
        userLoaded : "false",
      }
    }
  },
  extraReducers : (builder) => {
    builder.addCase( registerUser.pending, (state,  )=>{
      return {
        ...state,
        registerStatus : "pending"}
    });

    builder.addCase(registerUser.fulfilled, (state, action )=>{
      if( action.payload  ){
        const user = jwtDecode(action.payload)
        localStorage.setItem("user-id", user._id)
        return{
          ...state,
          token : action.payload,
          _id : user._id,
          name : user.name,
          email : user.email,
          isAdmin: user.isAdmin,
          products: user.products,
          registerStatus : "success"
        }
      }else{
        return state
      }
    });

    builder.addCase(registerUser.rejected, (state, action)=>{
      return {
        ...state,
        registerStatus : "rejected",
        registerError : action.payload
      }
    });

    builder.addCase( loginUser.pending, (state )=>{
      return {
        ...state,
        loginStatus : "pending"}
    });

    builder.addCase(loginUser.fulfilled, (state, action )=>{
      if(action.payload.token){
        // const user = action.payload.user
        return {
          ...state,
          token : action.payload.token,
          name : action.payload.user.name,
          email : action.payload.user.email,
          _id : action.payload.user._id,
          isAdmin: action.payload.user.isAdmin,
          products : action.payload.user.products,
          loginStatus : "success"
        }
      }else{
        return state
      }
    });

    builder.addCase(loginUser.rejected, (state, action)=>{
      return {
        ...state,
        loginStatus : "rejected",
        loginError : action.payload
      }
    })
  }
})
export const {loaderUser, logoutUser} = authSlice.actions
export default authSlice.reducer
