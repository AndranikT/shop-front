import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {cartFetch} from "../features/cartSlice";
import CartSummary from "./CartSummary";
import CartContainer from "./CartContainer";


const Cart = () => {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch()


    return (
        <div className="cart-container">
            <h2>Shopping Cart</h2>
            { cart.cartItems?.length === 0 ? (
                <div className="cart-empty">
                    <p>Your cart is currently empty</p>
                    <div className="start-shopping">
                        <Link to="/">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                className="bi bi-arrow-left" viewBox="0 0 16 16">
                                <path
                                    fillRule="evenodd"
                                    d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                                />
                            </svg>
                            <span>Start Shopping</span>
                        </Link>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="titles">
                        <h3 className="product-title">Product</h3>
                        <h3 className="price">Price</h3>
                        <h3 className="quantity">Quantity</h3>
                        <h3 className="total">Total</h3>
                    </div>
                    <CartContainer cart={cart} />
                    <CartSummary cart={cart} />
                </div>
                )
            }
        </div>
    );
};

export default Cart;