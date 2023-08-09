import React, {useState} from 'react';
import styled from "styled-components"
import {FaSearch} from "react-icons/fa";
import {useSelector} from "react-redux";

const SearchBar = ({setResultSearch}) => {
    const [input, setInput] = useState("")
    const { items: data} =  useSelector((state) => state.products);

    function searchData(value){
       let searchItems = data.filter((item)=>{
            return(
                value &&
                item &&
                item.name &&
                item.name.toLowerCase().includes(value)
            )
        })
        if(searchItems.length > 0){
            setResultSearch(searchItems)
        } else if(value === ""){
            setResultSearch([])
        }else{
            setResultSearch([{
                type:"not-found"
            }])
        }

    }
    const handlerChange = (value) => {
            setInput(value)
            searchData(value)
        // console.log("value",  value)
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

export default SearchBar;

const InputWrapper = styled.div`
  background-color: white;
  width: 50%;
  border-radius: 10px;
  height: 2.5rem;
  padding: 0 15px;
  box-shadow: 0 0 8px #ddd;
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