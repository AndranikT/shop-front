import React, {useEffect} from 'react';
import styled from "styled-components";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {setHeaders, url} from "../../../features/api";
import {toast} from "react-toastify";
import {FaSearch} from "react-icons/fa";
import {filterProductRenderIsLike, filterProductRenderDisLike, productsFilterFetch} from "../../../features/selectSlice";
const PhoneContainer = ({ dataInfo }) => {
    const navigate = useNavigate()
    const userId = localStorage.getItem("user-id")

    const handleAddToCart =  async(product) => {
        if(userId){
            product.isLike.length > 0 ? (product.isLike.map((id) => id !== userId ? navigate(`/product/${product._id}`) : navigate('/cart'))) :
                navigate(`/product/${product._id}`)
        }else{
            toast.info("Please Sing up or Login")
        }
    };

    return (
        <ProductCon>
            {
                dataInfo[0]?.type === "not-found" ?
                    <DontFound>
                        <h3>Dont Found</h3>
                        <FaSearch id={"search"}/>
                    </DontFound> :
                dataInfo?.map((product) => (
                    <ProductContainer key={product._id}  >
                            <Link to={`/product/${product._id}`}>
                                <img src={product.image?.url}  alt={product.name} />
                            </Link>
                            <h3>{ product.name }</h3>
                            <div className="details">
                                <span className="price">${product.price}</span>
                            </div>
                            <div className="btn-heart">
                                {
                                    userId ? (
                                        <HandleIconsHeart isLike={product.isLike} userId={userId} productId={product._id}  />
                                    ) : (
                                        <div onClick={() => toast.info("Pleas sign up or login") }>
                                            <EmptyIsLike />
                                        </div>
                                    )
                                }
                                <button onClick={ () => handleAddToCart(product)}>
                                    Buy
                                </button>
                            </div>
                    </ProductContainer>
                ))
            }
        </ProductCon>
    );
};
function HandleIconsHeart ({isLike, userId, productId}){
    const dispatch = useDispatch()

    useEffect(()=>{
        console.log("useEffect Phone")
    },[filterProductRenderIsLike, filterProductRenderDisLike])
    const handleDeleteFromServer = async (productId) => {
        try{
            await axios.put(`${url}/users/product/${userId}`,{
                type : "remove",
                productId : productId,
            }, setHeaders())
                .then((res)=>{
                dispatch(productsFilterFetch())
                dispatch(filterProductRenderDisLike({userId, productId}))
                })
            toast.success("Deleted product from bag ")
        }catch(err){
            console.log(err)
        }
    }
    const handleAddToServer = async( productId ) => {
        try{
            await axios.put(`${url}/users/product-id/${userId}`,{
                productId : productId
            })
                .then((res)=>{
                dispatch(productsFilterFetch())
                dispatch(filterProductRenderIsLike({userId,productId }))
                })
            toast.success("Added cart ")
        }catch (err){
            console.log(err)
        }
    }

    for(let i = 0 ; i <= isLike.length; i++){
        if( isLike[i] === userId){
            return  (
                <div  key={Math.random() * 1001} onClick={ ()=> handleDeleteFromServer( productId) }>
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" version="1" viewBox="0 0 48 48"
                         enableBackground="new 0 0 48 48" height="25px" width="25px" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#F44336"
                              d="M34,9c-4.2,0-7.9,2.1-10,5.4C21.9,11.1,18.2,9,14,9C7.4,9,2,14.4,2,21c0,11.9,22,24,22,24s22-12,22-24 C46,14.4,40.6,9,34,9z"></path>
                    </svg>
                </div>
            )}
    }
    return (
        <div key={Math.random() * 1001} onClick={ () => handleAddToServer(productId)}>
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0"
                 viewBox="0 0 16 16" height="25px" width="25px" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"></path>
            </svg>
        </div>
    )
}
const EmptyIsLike =()=> {
    return (
        <div key={Math.random() * 1001}>
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0"
                 viewBox="0 0 16 16" height="25px" width="25px" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"></path>
            </svg>
        </div>
    )
}
export default PhoneContainer;

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 1rem 1rem;
  padding: 5px 5px;
  border-radius: 15px;
  width: 150px;
  max-width: 100%;
  height: 250px;
  box-shadow: -5px -5px 10px rgba(255, 255, 255, 0.5), 2px 2px 5px rgba(94, 104, 121, 0.3);;
  background: white;
  
  img{
    width: 120px;
    height: 140px;
    margin: 0 10px;
  }
  h3{
    font-size: 14px;
  }
  span{
    margin: 0 40px;
    font-weight: 700;
    font-family: sans-serif;
  }
  button {
      width: 60px;
      height: 30px;
      border-radius: 5px;
      /*margin-top: 2rem;*/
      font-weight: 400;
      letter-spacing: 1.15px;
      background-color: #4b70e2;
      color: #f9f9f9;
      border: none;
      outline: none;
      cursor: pointer;
    }
`

const ProductCon = styled.div`
  width: 100%;
  min-width: 700px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0 2rem;
`

const DontFound = styled.div`
  width: 100%;
  min-width: 70%;
  display: flex;
  //flex-direction: column;

  h3{
    margin-top: 2rem;
    margin-left: 5rem;
    font-size: 35px;
    color: #a26b2d;
  }
  #search{
    margin-top: 2rem;
    margin-left:1rem;
    font-size: 50px;
    color: #4b70e2;
  }
`
const LoadingDiv = styled.div`
  max-width: 100%;
  height: 100%;
  margin: 7rem 35rem;
`