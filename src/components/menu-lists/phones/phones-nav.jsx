import React, { useState} from 'react';
import styled from "styled-components";
import {FiRefreshCcw} from "react-icons/fi"
import {IoMdArrowRoundBack} from "react-icons/io"
import {useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {
    filterBrand, filterColor, filterLocation,
    filterModel, filterStorage, filterPriceMin,
    filterPriceMax, removeFilterProducts
} from "../../../features/selectSlice";
const PhonesNav = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {brandFilter, filterProducts, allProducts} = useSelector(state => state.filter)
    const [location, setLocation] = useState("loc")
    const [brand, setBrand] = useState("")
    const [model, setModel] = useState("")
    const [color, setColor] = useState("")
    const [storage, setStorage] = useState("")
    const [priceMin, setPriceMin] = useState("")
    const [priceMax, setPriceMax] = useState("")

    function foo(){
        console.log("filterBrand", brandFilter)
        console.log("filterProducts", filterProducts)
        console.log("allProducts", allProducts)
    }

    const handleReload = ()=>{
        dispatch(removeFilterProducts())
        setLocation("")
        setBrand("")
        setModel("")
        setColor("")
        setStorage("")
        setPriceMin("")
        setPriceMax("")
    }
    const handleSelectChange = ( e )=>{
        if( e.target.id === "location" ){
            dispatch(filterLocation(e.target.value))
            setLocation(e.target.value)
            if( e.target.value === ""){
                dispatch(filterBrand(""))
                dispatch(filterModel(""))
                dispatch(filterColor(""))
                dispatch(filterStorage(""))
                dispatch(filterPriceMin(""))
                dispatch(filterPriceMax(""))
            }
        }
        if( e.target.id === "brand" ){
            setBrand(e.target.value)
            dispatch(filterBrand(e.target.value))
        }
        if( e.target.id === "models"){
            setModel(e.target.value)
            dispatch(filterModel(e.target.value))
        }
        if( e.target.id === "color"){
            setColor(e.target.value)
            dispatch(filterColor(e.target.value))
        }
        if(e.target.id === "storage"){
            setStorage(e.target.value)
            dispatch(filterStorage(e.target.value))
        }
        if(e.target.id === "price-min"){
            setPriceMin(e.target.value)
            dispatch(filterPriceMin(e.target.value))
            console.log("value-min", e.target.value)
        }
        if(e.target.id === "price-max"){
            setPriceMax(e.target.value)
            dispatch(filterPriceMax(e.target.value))
            console.log("value-max", e.target.value)

        }

    }

    const handleBackPage = ()=>{
        dispatch(removeFilterProducts())
        navigate("/")
    }
    return (
        <NavContainer>
            <ReloadAndBack>
                <div onClick={handleBackPage}>
                <IoMdArrowRoundBack/>
                </div>
                <div onClick={handleReload} >
                <FiRefreshCcw/>
                </div>
                {/*<div onClick={()=> foo()}>*/}
                {/*    <button> Click </button>*/}
                {/*</div>*/}
            </ReloadAndBack>
            <select id={"location"} onChange={handleSelectChange}  value={location}>
                <option value="">Location</option>
                <option value="Armenia">Armenia</option>
                <option value="USA">USA</option>
                <option value="Japan">Japan</option>
            </select>
            <select id="brand" onChange={handleSelectChange}  value={brand}>
                <option value=""> Brand </option>
                <option value="iphone">Iphone</option>
                <option value="samsung">Samsung</option>
                <option value="xiaomi">Xiaomi</option>
                <option value="other">Other</option>
            </select>
            {
                brand === "iphone" ? (
                    <select id={"models"} onChange={handleSelectChange} value={model} >
                        <option value=""> Model</option>
                        <option value="X"> X </option>
                        <option value="11"> 11 </option>
                        <option value="11PRO"> 11 PRO </option>
                        <option value="11PROMAX">11 PRO MAX</option>
                        <option value="12"> 12 </option>
                        <option value="13PROMAX">13 PRO MAX</option>
                    </select>
                ) : brand === "samsung" ? (
                    <select  id={"models"} onChange={handleSelectChange} value={model} >
                        <option value=""> Model </option>
                        <option value="A20"> Galaxy A20 </option>
                        <option value="S10"> S10  </option>
                        <option value="S21"> S21  </option>
                    </select>
                ) : brand === "xiaomi" ? (
                    <select id={"models"} onChange={handleSelectChange} value={model}>
                        <option value=""> Model</option>
                        <option value="12S">12S</option>
                        <option value="RedmiNote10"> Redmi Note 10 </option>
                        <option value="RedmiNote9"> Redmi Note 9 </option>
                        <option value="MI11"> MI 11 </option>
                    </select>
                ) : null
            }
            <select id={"storage"} onChange={handleSelectChange} value={storage}>
                <option value="" >Storage Space</option>
                <option value="32GB"> 32 GB  </option>
                <option value="64GB"> 64 GB  </option>
                <option value="128GB"> 128 GB </option>
                <option value="256GB"> 256 GB </option>
                <option value="512GB"> 512 GB </option>
            </select>
            <select  id={"color"} onChange={handleSelectChange} value={color}>
                <option value="">Color</option>
                <option value="Black"> Black </option>
                <option value="White">White</option>
                <option value="Wurple"> Purple </option>
                <option value="Gray">Gray</option>
                <option value="Gold">Green</option>
                <option value="Blue">Blue</option>
            </select >
            <div
                style={{display : "flex", justifyContent:"space-around", marginTop:"10px", alignItems:"center"}}>
               <span> Price </span>
                <select  id={"price-min"} onChange={handleSelectChange} value={priceMin}>
                    <option value="">FROM</option>
                    <option value="100">100</option>
                    <option value="200">200</option>
                    <option value="300">300</option>
                    <option value="400">400</option>
                    <option value="500">500</option>
                </select>
                <select  id={"price-max"} onChange={handleSelectChange} value={priceMax}>
                    <option value="">TO</option>
                    <option value="600">600</option>
                    <option value="700">700</option>
                    <option value="800">800</option>
                    <option value="900">900</option>
                    <option value="1000">1000</option>
                </select>
           </div>
    </NavContainer>
    );
};

export default PhonesNav;

const NavContainer = styled.div`
  padding: 25px 0;
  display: flex;
  flex-direction: column;
  width: 300px;
  max-width: 300px;
  min-width: 250px;
  height: 400px;
  background: rgba(6, 29, 79, 0.91);
  border-radius: 10px;
  box-shadow: rgba(164, 164, 213, 0.8) 0px 7px 29px 0px;
  
  select{
    padding: 8px;
    margin: 12px;
    border: none;
    font-family: sans-serif ;
    border-radius: 10px;
  }
 #location option {
   //background: #4b70e2;
  border-radius: 50px;
 }
  input{
    width: 50px;
    height: 25px;
    border-radius: 5px;
    border: none;
  }
  input:focus{
    outline: none;
  }
  select:focus{
    outline: none;
  }
  span{
    color: #f9f9f9;
    font-family: sans-serif;
    font-size: 16px;
  }

  button{
    width: 60px;
    height: 30px;
    border-radius: 5px;
    margin-top: 35px;
    margin-left: 60px;
    font-weight: 400;
    letter-spacing: 1.15px;
    background-color: #4b70e2;
    color: #f9f9f9;
    border: none;
    outline: none;
    cursor: pointer;
  }
`

const ReloadAndBack = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  
  
  div{
    color: white;
    font-size: 25px;
  }
`



