import styled from "styled-components";
import axios from "axios"
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {url , setHeaders} from "../../features/api";
import Loading from "../../components/Loading/loading"

const Order = () => {
const params = useParams()

    const [order, setOrder] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        const fetchOrder = async () =>{
                setLoading(true)
            try{
                const res = await  axios.get(`${url}/orders/findOne/${params.id}`,
                    setHeaders()
                )
                console.log("res", res.data)
                setOrder(res.data)
                setLoading(false)
            }catch(err){
                console.log(err)
            }
        }
        fetchOrder()
    },[params.id])

    return (
        <StyledOrder>
            { loading ? (
                <LoadingDiv>
                    <Loading/>
                </LoadingDiv>
                ) : (
                        <OrdersContainer>

                        <h3> Order Details </h3>
                     <p>
                         Delivery Status : {" "}
                         {
                             order.delivery_status === "pending" ? (
                                 <Pending> Pending </Pending>
                             ) : order.delivery_status === "dispatched" ? (
                                <Dispatched> Dispatched </Dispatched>
                             ) : order.delivery_status === "delivered" ? (
                                 <Delivered> Delivered </Delivered>
                             ) : "error"
                         }
                     </p>
                    <h3> Ordered Products </h3>
                        <Items>
                            {order.products?.map((product , index)=> (
                                <Item key={index}>
                                    <span> Description - {product.description}</span>
                                    <span> Quantity - {product.quantity}</span>
                                    <span> Price - {
                                        "$ " + (product.amount_total / 100).toLocaleString()
                                    }
                                    </span>
                                </Item>
                            ))}
                        </Items>
                        <div>
                            <h3>Total Price</h3>
                            <span> {
                                "$ " + (order.total / 100).toLocaleString()
                            }   </span>
                        </div>
                        <div>
                            <h3>Shipping Details</h3>
                            <p> Customer : {order.shipping?.name}</p>
                            <p> City : {order.shipping?.address.city}</p>
                            <p> Email : {order.shipping?.email}</p>
                            <p> Phone : {order.shipping?.phone}</p>
                        </div>
                    </OrdersContainer>
                )
            }
        </StyledOrder>
    )
}
export default Order

const StyledOrder = styled.div`
  margin: 3rem;
  display: flex;
  justify-content: center;
  h3{
    margin: 1.5rem 0 0.5rem 0;
  }
`
const OrdersContainer = styled.div`
  max-width: 500px;
  width: 100%;
  height: auto;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 5px;
  padding: 2rem;
  p{
    font-size: 18px;
    letter-spacing: 0.5px;
  }

`;

const Items = styled.div`
  span{
    margin-right: 1.5rem;
    font-size: 18px;
    letter-spacing: 0.5px;
  }
`

const Item = styled.li`
  display: flex;
  flex-direction: column;
  margin-left: 0.5rem;
  margin-bottom: 0.5rem;
`
const Pending = styled.span`
  color: rgb(253,181,40);
  background: rgb(253, 181, 40, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;
const Dispatched = styled.span`
  color: rgb(38, 198, 249);
  background-color: rgba(38, 198, 249, 0.12);
  padding: 3px 5px;
  font-size: 14px;
`;
const Delivered = styled.span`
  color: rgb(102, 108, 255);
  background-color: rgba(102, 108, 255, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;

const LoadingDiv = styled.div`
  max-width: 100%;
  height: 100%;
  margin: 7rem 35rem;
`