import {useEffect, useState} from "react"
import { useDispatch, useSelector } from "react-redux"
import { registerUser } from "../../features/authSlice"
import {StyledForm, StyledInput} from "./StyledForm";
import {useNavigate} from "react-router";
 

const Register = () =>{

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const auth = useSelector((state) => state.auth)
  const [user, setUser] =useState({
    name : "",
    email : "",
    password : "",
  })

  useEffect(()=>{
    if(auth._id){
      navigate("/")
    }else{}
  },[auth._id, navigate])

  const handleSubmit = (e) =>{
    e.preventDefault()
    dispatch(registerUser(user))
    console.log("user : ", user)
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
    <h2> Register </h2>
      <StyledInput>
    <input type="text" placeholder="name" 
    onChange={(e)=>setUser({...user, name : e.target.value})}/>
    <input type="email" placeholder="email"
     onChange={(e)=>setUser({...user, email : e.target.value})}/>
    <input type="password" placeholder="password"
     onChange={(e)=>setUser({...user, password : e.target.value})}/>
    <button>  {auth.registerStatus === "pending" ? "Sumbiting" : "Register" } </button>
      </StyledInput>
      {auth.registerStatus == "rejected" ? (
      <p>{auth.registerError}</p>
      ): null
      }
    </StyledForm>
  )
}
export default Register