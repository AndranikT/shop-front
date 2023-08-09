import React, {useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {cartFetch, getTotals} from "../features/cartSlice";
import axios from "axios";
import {setHeaders, url} from "../features/api";

const CartContainer = ({ cart }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userId = localStorage.getItem("user-id")

    useEffect(()=>{
        dispatch(cartFetch())
        console.log("cart-fetch", cart.cartItems)
    },[])


    useEffect(() => {
        dispatch(getTotals());
    }, [cart, dispatch]);

    const handleAddToCart = async(product) => {
        try{
            const response = await axios.put(`${url}/users/product/${userId}`,{
                type : "plus",
                productId : product._id,
            }, setHeaders()).then((res)=> {
                dispatch(cartFetch())
            })
        }catch (err){
            console.log(err)
        }

    };
    const handleDecreaseCart = async(product) => {
        try{
            const response = await axios.put(`${url}/users/product/${userId}`,{
                type : "minus",
                productId : product._id,
            }, setHeaders()).then((res)=> {
                dispatch(cartFetch())
            })
        }catch (err){
            console.log(err)
        }
    };
    const handleRemoveFromCart = async(product) => {
        try{
            const response = await axios.put(`${url}/users/product/${userId}`,{
                type : "remove",
                productId : product._id,
            }, setHeaders()).then((res)=> {
                dispatch(cartFetch())

            })
        }catch (err){
            console.log(err)
        }
    };

    return (
        <div className="cart-items">
            {cart.cartItems &&
                cart.cartItems?.map((cartItem) => (
                    <div className="cart-item" key={cartItem._id}>
                        <div className="cart-product">
                            <Link to={`/product/${cartItem._id}`}>
                                <img src={cartItem.image?.url} alt={cartItem.name} />
                            </Link>
                            <div>
                                <Link to={`/product/${cartItem._id}`}>
                                    <h3> {cartItem.name} </h3>
                                </Link>
                                <p>{cartItem.desc}</p>
                                <button onClick={() => handleRemoveFromCart(cartItem)}>
                                    Remove
                                </button>
                            </div>
                        </div>
                        <div className="cart-product-price">
                            ${cartItem.price}
                        </div>
                        <div className="cart-product-quantity">
                            <button onClick={() => handleDecreaseCart(cartItem)}>
                                -
                            </button>
                            <div className="count">{cartItem.cartQuantity}</div>
                            <button onClick={() => handleAddToCart(cartItem)}>
                                +
                            </button>
                        </div>
                        <div className="cart-product-total-price">
                            ${cartItem.price * cartItem.cartQuantity}
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default CartContainer;