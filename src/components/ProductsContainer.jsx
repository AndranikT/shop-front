import React, {useEffect, useRef} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import {setHeaders, url} from "../features/api";
import {useState} from "react"
import {productsFetch} from "../features/productSlice";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router";
import styled from "styled-components";
import {FaSearch} from "react-icons/fa";
import {productsFilterFetch} from "../features/selectSlice";
import {cartFetch} from "../features/cartSlice";

const ProductsContainer = ({ data,searchResult }) => {
    const userId = localStorage.getItem("user-id")
    const navigate = useNavigate();
    const popupRef = useRef();
    const AllData = searchResult?.length > 0 ? searchResult : data
    const [open, setOpen] = useState(false)

    const handleAddToCart =  async(product) => {
        if(userId){
            product.isLike?.length > 0 ? ( product.isLike.map((id) => id !== userId ? navigate(`/product/${product._id}`) : navigate('/cart'))) :
                navigate(`/product/${product._id}`)
        }else{
            toast.info("Please Sing up or Login")
        }
    };

    return (
         <div className="products">
             {
                 AllData[0]?.type === "not-found" ? <DontFound>
                    <h3>Dont Found</h3>
                    <FaSearch id={"search"}/>
                 </DontFound> :
                     AllData?.map((product) => (
                 <div key={product._id} className="product" ref={popupRef}>
                     <Link to={`/product/${product._id}`}>
                         <img src={product.image?.url} alt={product.name}/>
                     </Link>
                     <h3>{product?.name}</h3>
                     <div className="btn-heart">
                     {
                        userId ? (
                            <HandleIds isLike={product.isLike} userId={userId} productId={product._id} />
                        ) : (
                            <div onClick={() => toast.info("please signup or login")}>
                                <EmptyIsLike />
                            </div>
                        )
                     }
                         <button onClick={() => handleAddToCart(product)}>
                             Buy
                         </button>
                     </div>
                     <div className="details">
                         {/*<span>{product.storage}</span>*/}
                         <span className="price">${product.price}</span>
                     </div>

                 </div>
                ))
             }
         </div>
    );
};
function HandleIds ({isLike, userId, productId}){
    const dispatch = useDispatch()
    const handleDeleteFromServer = async () =>{
        console.log('remove')
        try{
            await axios.put(`${url}/users/product/${userId}`,{
                type : "remove",
                productId : productId,
            }, setHeaders())
                .then((result)=>{
                    dispatch(productsFetch())
                    dispatch(cartFetch())
                    dispatch(productsFilterFetch())
                })
            toast.success("Deleted product from bag ")
        }catch(err){
            console.log(err)
        }
    }
    const handleAddToServer = async( productId ) => {
        console.log("add")
        try{
             await axios.put(`${url}/users/product-id/${userId}`,{
                productId : productId
            } ,setHeaders())
                 .then((res)=>{
                     dispatch(productsFetch())
                     dispatch(cartFetch())
                     dispatch(productsFilterFetch())
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
                             enableBackground="new 0 0 48 48" height="50px" width="45px" xmlns="http://www.w3.org/2000/svg">
                             <path fill="#F44336" d="M34,9c-4.2,0-7.9,2.1-10,5.4C21.9,11.1,18.2,9,14,9C7.4,9,2,14.4,2,21c0,11.9,22,24,22,24s22-12,22-24 C46,14.4,40.6,9,34,9z"></path>
                    </svg>
                </div>
            )}}
        return (
        <div key={Math.random() * 1001} onClick={ () => handleAddToServer(productId)}>
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0"
                 viewBox="0 0 16 16" height="45px" width="40px" xmlns="http://www.w3.org/2000/svg">
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
                 viewBox="0 0 16 16" height="45px" width="40px" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"></path>
            </svg>
        </div>
    )
}
export default ProductsContainer;

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