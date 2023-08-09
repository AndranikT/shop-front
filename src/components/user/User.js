import {useEffect, useState} from "react";
import axios from "axios";
import {url, setHeaders} from "../../features/api";
import {useSelector} from "react-redux";
import styled from "styled-components";
import UserOrders from "./UserOrders";
import UserInfo from "./UserInfo";
import NavMenu from "../NavMenu";
const User = () => {

    return (
         <StyledDashboard>
             <NavMenu/>
             <UserDetails>
                <UserInfo/>
                <UserOrders/>
             </UserDetails>
        </StyledDashboard>
    )
}
export default User

const StyledDashboard = styled.div`
  max-width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 3rem 3rem;
  //background: #f1f1f1;
  display: flex;
  flex-direction: row;
  //margin-left: 50px;
`;
const UserDetails = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
  
`

