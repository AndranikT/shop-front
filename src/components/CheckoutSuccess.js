import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {allClearCart, getTotals} from "../features/cartSlice";
import styled from "styled-components"

const CheckoutSuccess = () => {

    const dispatch = useDispatch()
    const cart = useSelector((state )=> state.cart)

    useEffect(()=>{
        // dispatch(allClearCart())
    },[dispatch])

    useEffect(()=> {
        dispatch(getTotals())
    },[cart, dispatch])
    return (
            <Container>
                <h2> Checkout Success </h2>
                <p> Your order might take some time to process</p>
                <p> Check your order status at your profile after about 5 mins.</p>
                <p>
                    Incase of any inqueries contact the support at {" "}
                    <strong> support@onlineshop.com </strong>
                </p>

            </Container>
        )
}
export default CheckoutSuccess

const Container = styled.div`
  min-height: 80vh;
  max-width: 800px;
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h2{
    margin-bottom: 0.5rem;
    color: #029e02;
  }
`