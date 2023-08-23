import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components"
import {Link, NavLink} from "react-router-dom";
import '../App.css'
import {useNavigate} from "react-router";
import {filterBrand, productsFilterFetch} from "../features/selectSlice";
import {useDispatch} from "react-redux";

const NavMenu = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [openMenu, setOpenMenu] = useState(false);
    let menuNavRef = useRef();

    useEffect(()=>{
            let handler = (e)=> {
                if(!menuNavRef.current?.contains(e.target)){
                    setOpenMenu(false);
                }
            };
            document.addEventListener("mousedown", handler);
            return() =>{
                document.removeEventListener("mousedown", handler);
        }
    })

    const  handleFilterPhones = (e) =>{
        if(e.target.id === "iphone"){
            dispatch(filterBrand("iphone"))
        }
        if(e.target.id === "samsung"){
            dispatch(filterBrand("samsung"))
        }
        if(e.target.id === "xiaomi"){
            dispatch((filterBrand("xiaomi")))
        }
    }

    return (
        <NavContainer>
            <div className={"nav-menu-drop"} onClick={ ()=> setOpenMenu(true)} ref={menuNavRef}>
                <DropDown onDoubleClick={ ()=> navigate("/nav-menu/phones") }>
                      { openMenu ? `Phones  < ` : `Phones   > ` }
                </DropDown>
                <LinkDiv className={`nav-dropdown-menu ${openMenu? 'active' : 'inactive'}`}>
                <div onClick={handleFilterPhones} >
                    <Link to={"/nav-menu/phones"} id={"iphone"}>
                        - Iphone
                    </Link>
                </div>
                <div onClick={handleFilterPhones} >
                    <Link to={"/nav-menu/phones"} id={"samsung"}>- Samsung </Link>
                </div>
                <div onClick={handleFilterPhones}>
                    <Link to={"/nav-menu/phones"} id={"xiaomi"}>- Xiaomi </Link>
                </div>
                </LinkDiv>
            </div>
        </NavContainer>
    );
};

export default NavMenu;

const NavContainer = styled.div`
  max-width: 200px;
  width: 100%;
  height: 150px;
  display: flex;
  flex-direction: column;
  padding: 5px 0;
  background: rgba(6, 29, 79, 0.91);
  border-radius: 10px;
  box-shadow: rgba(164, 164, 213, 0.8) 0 7px 29px 0;
 
`
  const LinkDiv = styled.div`
    display: flex;
    flex-direction: column;
    a {
      width: 150px;
      padding: 8px 12px;
      list-style: none;
      text-decoration: none;
      color: #efe9e9;
      background-color: rgba(136, 136, 147, 0.87);
      border-radius: 8px;
      cursor: pointer;
    }
    div{
      margin: 10px 0;
    }
  `
const DropDown = styled.div`
  width: 180px;
  padding: 10px 20px;
  position: absolute;
  top: 0;
  right: 5px;
  background-color: rgba(136, 136, 147, 0.87);
  border-radius: 8px;
  cursor: pointer;
  
  ::before{
    content: '';
    position: absolute;
    top: -5px;
    right: 20px;
    height: 20px;
    width: 20px;
    transform: rotate(45deg)
  }
  .active{
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
  .inactive{
    opacity: 0;
    visibility: hidden;
    transform: translateY(-20px);
  }
  img{
    max-width: 20px;
    margin-right: 10px;
    opacity: 0.5;
  }
  :hover a{
    color: rgb(212, 33, 9);
    cursor: pointer;
  }
 
`



