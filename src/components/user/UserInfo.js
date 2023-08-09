import styled from "styled-components"
import {useEffect, useState} from "react";
import axios from "axios";
import {setHeaders, url} from "../../features/api";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";

const UserInfo =() => {
    const auth = useSelector((state)=> state.auth)
    const [user, setUser] = useState({
        id : "",
        email : "",
        name : "",
        password : "",
        createdAt : ""

    })
    const [pass, setPass] = useState({})
    const [loading, setLoading] = useState(false)
    const userId = localStorage.getItem("user-id")

    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const response = await axios.get(`${url}/users/find/${userId}`,
                    setHeaders())
                    .then((res) => { setUser({
                        id : res.data._id,
                        name : res.data.name,
                        email: res.data.email,
                        isAdmin : res.data.isAdmin,
                        createdAt : res.data.createdAt
                    });
                console.log(res)
                })
                return response
            }catch(err){
                console.log(err)
            }
        }
        fetchData()
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${url}/login/password`, {
                email : user.email,
                password : pass.password
            },setHeaders())
              .then((res)=> {
                  if(res.data){
                      console.log("res", res.daa)
                  fetchUserUpdate()
                  }
              })
            return response
        }catch (err){
            console.log(err)
            toast.error("Invalid Email or Password")
        }
    }

    const fetchUserUpdate = async ()=>{
        try{
            const response = await axios.put(`${url}/users/${userId}`, {
                ...user
            } ,setHeaders())
                .then((res)=> {
                setUser({...res.data, password: ""})
                toast.success("Profile Updated...")
            })
            return response
        }catch (err){
            console.log(err)
        }
    }

    return (
        <StyledUserInfo>
                <ProfileContainer>
                    <Customer> Customer ID-{ userId}</Customer>
                    <h3 style={{color : "#4b70e2"}}> Account create at {user.createdAt?.slice(0,10)} </h3>
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="name">  Name : </label>
                                        <input
                                            type="text"
                                            id="name"
                                            value={user.name}
                                            onChange={(e)=> setUser({...user, name : e.target.value})}
                                        />
                                        <label htmlFor="password"> Password :  </label>
                                        <input
                                            type="text"
                                            id="password"
                                            value={pass.password ? pass.password : ""}
                                            required
                                            onChange={(e)=> setPass({  password: e.target.value})}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email"> Email : </label>
                                        <input
                                            type="text"
                                            id="email"
                                            value={user.email}
                                            onChange={(e)=> setUser({...user, email: e.target.value})}
                                        />
                                        <label htmlFor="password"> New-Password :</label>
                                        <input
                                            type="text"
                                            id="password"
                                            value={user.password ? user.password : ""}
                                            onChange={(e)=> setUser({...user, password: e.target.value})}
                                        />
                                    </div>
                                    <Edit> Edit </Edit>
                                </form>
                </ProfileContainer>
        </StyledUserInfo>
    )
}
export default UserInfo

const StyledUserInfo = styled.div`
  max-width: 800px;
  width: 100%;
  margin-bottom: 80px;
`
const ProfileContainer = styled.div`
  width: 100%;
  height: 350px;;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  color: rgba(22, 22, 31, 0.87);
  border-radius: 15px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  
  form {
    display: flex;
    flex-direction: column;
  }
  h3 {
    margin-bottom: 0.5rem;
  }
  label {
    margin-bottom: 0.5rem;
    margin-top: 0.5rem;
    color: gray;
  }
  input {
    font-size: 18px;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    outline: none;
    border: none;
    border-bottom: 1px solid rgba(150, 154, 155, 0.91);
  }
`

const Edit = styled.button`
  background: #4b70e2;
  color: #f9f9f9;
  font-size: 18px;
  padding: 10px 35px;
  border: white;
  border-radius: 5px;
  margin-top: 2rem;
`
const Customer = styled.div`
  color : rgb(38, 198, 249);
  background-color: rgb(38, 198, 249, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
  margin-bottom: 1rem;
`