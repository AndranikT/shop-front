import styled from "styled-components"
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {setHeaders, url} from "../../features/api";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router";
import {toast} from "react-toastify";
import Loading from "../Loading/loading"

const Product = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const  [product, setProduct] = useState({})
    const  [isLoading, setIsLoading] = useState(false)
    const userId  = localStorage.getItem("user-id")

    useEffect(() => {
        setIsLoading(true)
        async function fetchData(product){
            try{
                const res = await axios.get(`${url}/products/find/${params.id}`,setHeaders())
                setProduct(res.data)
            }catch(err){
                console.log(err)
            }
            setIsLoading(false)
        }
        fetchData()
    },[])

    const handleCheckOut = (product)=> {
        if(userId){
            let cartItems = [product]
            console.log("pay-button", cartItems)
            axios.post(`${url}/stripe/create-checkout-session`,{
                cartItems,
                userId : userId,
            }).then((res)=>{
                if(res.data.url){
                    window.location.href = res.data.url
                }
                console.log("res-url", res.data.url)
            }).catch((err)=> console.log(err.message))
        }else{
            toast.info("Please sign up or login")
        }
    }

    return (
        <StyledProduct>
            <ProductContainer>
                {   isLoading ?
                    <LoadingDiv>
                        <Loading/>
                    </LoadingDiv> : (
                   <>
                       <ImageContainer>
                           <img src={product.image?.url} alt="product"/>
                       </ImageContainer>
                       <ProductDetails>
                       <h3> {product.name} </h3>
                           <p>  Brand :  {product.brand} </p>
                           <p>  Model :  {product.model} </p>
                           <p>  Storage :  {product.storage} </p>
                           <p>  Color :  {product.color} </p>
                           <p> Location :  {product.location} </p>
                           <p><span> Description : </span> {product.desc} </p>
                       <Price> $ {product.price?.toLocaleString()}</Price>
                       <button className="product-add-to-cart" onClick={()=>handleCheckOut(product)}> Buy </button>
                       </ProductDetails>
                   </>
                 )
                }
            </ProductContainer>
        </StyledProduct>
    )
}
export default Product

const StyledProduct  = styled.div`
  margin: 3rem;
  display: flex;
  justify-content: center;
`;

const ProductContainer = styled.div`
  max-width: 800px;
  width: 100%;
  height: auto;
  display: flex;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 5px;
  padding: 2rem;
`
const ImageContainer = styled.div`
  flex: 1;
  img {
    width: 250px;
  }
`;
const ProductDetails = styled.div`
  flex: 2;
  margin-left: 2rem;
  h3{
    font-size: 35px;
  }
  p  {
    font-weight: bold;
    margin-top: 1rem;
    //margin: 0 1rem;
  }
`;

const Price = styled.div`
  margin: 1rem 0 ;
  font-weight: bold;
  font-size: 25px;
`;

const LoadingDiv = styled.div`
  max-width: 100%;
  height: 100%;
  margin: 7rem 30rem;
  font-size: 450px;
`