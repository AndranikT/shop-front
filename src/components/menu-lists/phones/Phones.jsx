import React, {useEffect, useState} from 'react';
import styled from "styled-components"
import PhonesNav from "./phones-nav";
import {useDispatch, useSelector} from "react-redux";
import PhoneContainer from "./PhoneContainer";
import MenuSearch from "./MenuSearch";
import Loading from "../../Loading/loading";
import {productsFilterFetch} from "../../../features/selectSlice";
import {productsFetch} from "../../../features/productSlice";
const Phones = () => {
    const dispatch = useDispatch()
    const [searchResult,  setSearchResult] = useState([])
    const { status } = useSelector((state)=> state.products)
    const { allProducts: data }  =  useSelector((state) => state.filter);
    const { filterProducts, filterProductsIsNotFound , searchFilter} =  useSelector((state)=> state.filter)
    const dataInfo  =  filterProductsIsNotFound[0]?.type ? filterProductsIsNotFound
        : filterProducts?.length > 0 ? filterProducts  : data ;

    useEffect(()=> {
        dispatch(productsFetch())
        dispatch(productsFilterFetch())
    },[])



    return (
        <PhonesContainer>
            {/*{ status === "pending" ? (*/}
            {/*        <LoadingDiv>*/}
            {/*            <Loading/>*/}
            {/*        </LoadingDiv>*/}
            {/*    ) : status === "success" ? (*/}
               <div>
                    <MenuSearch setResultSearch={setSearchResult}/>
                   <Con>
                    <PhonesNav/>
                    <PhoneContainer dataInfo={dataInfo} status={status} searchResult={searchResult} />
                  </Con>
               </div>
                {/*) : status === "rejected" ? (*/}
                {/*<p> Unexpected error occured...</p>*/}
                {/*) : <h1>Error</h1>*/}

        </PhonesContainer>
    );
};

export default Phones;

const PhonesContainer = styled.div`
  width: 100%;
  padding: 3rem 3rem;
  background: #f1f1f1;
`
const Con = styled.div`
  margin-top: 1rem;
  display: flex;
`

const LoadingDiv = styled.div`
  max-width: 100%;
  height: 100%;
  margin: 7rem 35rem;
`