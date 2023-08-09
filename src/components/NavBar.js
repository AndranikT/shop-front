import '../App.css'
import { Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import styled from "styled-components"
import {logoutUser} from "../features/authSlice";
import {useEffect, useRef, useState} from "react";
import {cartFetch} from "../features/cartSlice";
import user from './img/user.png';
import logout from './img/log-out.png';

const NavBar = () => {

const dispatch = useDispatch()
const { cartTotalQuantity } = useSelector( (state) => state.cart )
const auth = useSelector( (state) => state.auth )
const [open, setOpen] = useState(false);
let menuRef = useRef();

    useEffect(()=>{
        dispatch(cartFetch())
    }, [cartTotalQuantity])

    useEffect(()=>{
        let handler = (e)=> {
            if(!menuRef.current?.contains(e.target)){
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return() =>{
            document.removeEventListener("mousedown", handler);
        }
    })

    return(
        <div>
            <nav className='nav-bar'>
                <Link to='/'>
                    <h2> Shop </h2>
                </Link>
                <Link to='/cart'>
                    {
                        auth._id ? (
                            <div className='nav-bag'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-bag-fill" viewBox="0 0 16 16">
                                    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5z"/></svg>
                                { cartTotalQuantity > 0 ?
                                    <span className="bag-quantity">
                                         <span> { cartTotalQuantity } </span>
                                    </span> : "" }
                            </div>
                        ) : null
                    }
                </Link>
                {
                    auth.isAdmin ? (
                        <div className="nav-profile">
                            <Link to="/admin/summary">
                                <div className="nav-iconProfile">
                                    <span> Admin </span>
                                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0"
                                         viewBox="0 0 24 24" height="30px" width="40px" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 2A10.13 10.13 0 0 0 2 12a10 10 0 0 0 4 7.92V20h.1a9.7 9.7 0 0 0 11.8 0h.1v-.08A10 10 0 0 0 22 12 10.13 10.13 0 0 0 12 2zM8.07 18.93A3 3 0 0 1 11 16.57h2a3 3 0 0 1 2.93 2.36 7.75 7.75 0 0 1-7.86 0zm9.54-1.29A5 5 0 0 0 13 14.57h-2a5 5 0 0 0-4.61 3.07A8 8 0 0 1 4 12a8.1 8.1 0 0 1 8-8 8.1 8.1 0 0 1 8 8 8 8 0 0 1-2.39 5.64z">
                                        </path>
                                        <path d="M12 6a3.91 3.91 0 0 0-4 4 3.91 3.91 0 0 0 4 4 3.91 3.91 0 0 0 4-4 3.91 3.91 0 0 0-4-4zm0 6a1.91 1.91 0 0 1-2-2 1.91 1.91 0 0 1 2-2 1.91 1.91 0 0 1 2 2 1.91 1.91 0 0 1-2 2z">
                                        </path>
                                    </svg>
                                </div>
                            </Link>
                            <div className="logout" onClick={ ()=>dispatch(logoutUser(null)) }>
                                <Link to="/login">
                                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" width="40px"
                                         height="30px" xmlns="http://www.w3.org/2000/svg"><g>
                                        <path fill="none" d="M0 0h24v24H0z"></path>
                                        <path d="M5 22a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v3h-2V4H6v16h12v-2h2v3a1 1 0 0 1-1 1H5zm13-6v-3h-7v-2h7V8l5 4-5 4z">
                                        </path></g></svg>
                                </Link>
                            </div>
                        </div>
                    ) : auth._id ? (
                        <div className="nav-profile" onClick={()=>setOpen(!open)} ref={menuRef} >
                            <div className="nav-iconProfile"  >
                                <span>{auth.email}</span>
                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="30px" width="40px" xmlns="http://www.w3.org/2000/svg"><path d="M12 2A10.13 10.13 0 0 0 2 12a10 10 0 0 0 4 7.92V20h.1a9.7 9.7 0 0 0 11.8 0h.1v-.08A10 10 0 0 0 22 12 10.13 10.13 0 0 0 12 2zM8.07 18.93A3 3 0 0 1 11 16.57h2a3 3 0 0 1 2.93 2.36 7.75 7.75 0 0 1-7.86 0zm9.54-1.29A5 5 0 0 0 13 14.57h-2a5 5 0 0 0-4.61 3.07A8 8 0 0 1 4 12a8.1 8.1 0 0 1 8-8 8.1 8.1 0 0 1 8 8 8 8 0 0 1-2.39 5.64z"></path>
                                            <path d="M12 6a3.91 3.91 0 0 0-4 4 3.91 3.91 0 0 0 4 4 3.91 3.91 0 0 0 4-4 3.91 3.91 0 0 0-4-4zm0 6a1.91 1.91 0 0 1-2-2 1.91 1.91 0 0 1 2-2 1.91 1.91 0 0 1 2 2 1.91 1.91 0 0 1-2 2z"></path></svg>
                            </div>
                            <div className={`dropdown-menu ${open? 'active' : 'inactive'}`}>
                                <Link to={"/user-page"}>
                                <DropdownItem  img = {user} text = {"Profile"}/>
                                </Link>
                                <Link to={"/login"} onClick={ ()=>dispatch(logoutUser(null)) }>
                                <DropdownItem img = {logout} text = {"Logout"} />
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <AuthLinks>
                            <Link to= "/login"> Login </Link>
                            <Link to= "/register"> Register </Link>
                        </AuthLinks>
                    )
                }
            </nav>
        </div>
    )
}
function DropdownItem(props){
    return(
        <li className = 'dropdownItem'>
            <img src={props.img} alt="photo"></img>
            <a> {props.text} </a>
        </li>
    );
}
export default NavBar

const AuthLinks = styled.div`
   a{
     &:last-child{
       margin-left: 2rem;
     }
   }
`


