import React, {useState} from 'react';
import {FaSearch} from "react-icons/fa";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {filterSearchProducts} from "../../../features/selectSlice";

const MenuSearch = ( ) => {

    const [input, setInput] = useState("")
    const dispatch = useDispatch()
    function searchData(value){
        if(value !== ""){
            dispatch(filterSearchProducts(value))
        }else{
            console.log("[]")
            dispatch(filterSearchProducts([]))
        }



    }
    const handlerChange = (value) => {
        setInput(value)
        searchData(value)
    }

    return (
        <div style={{alignContent:"center"}}>
            <InputWrapper>
                <FaSearch id={"search-icon"} />
                <input
                    value={input}
                    placeholder={"Type to search"}
                    onChange={(e)=> handlerChange(e.target.value)}
                />
            </InputWrapper>
        </div>
    );
};

export default MenuSearch;

const InputWrapper = styled.div`
  background-color: white;
  width: 50%;
  border-radius: 10px;
  height: 2.5rem;
  padding: 0 15px;
  box-shadow: 0px 0px 8px #ddd;
  display: flex;
  align-items: center;
  margin: 0 30%;
  input{
    background-color: transparent;
    border: none;
    height: 100%;
    font-size: 1.25rem;
    width: 50%;
    margin-left: 5px;
  }
  input:focus{
    outline: none;
  }
  `