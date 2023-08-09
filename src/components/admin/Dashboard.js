import styled from "styled-components";
import { Outlet, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import {FaUsers, FaStore, FaClipboard, FaTachometerAlt} from "react-icons/fa";

const Dashboard = () => {
    const auth = useSelector((state) => state.auth);

    if (!auth.isAdmin) return <p>Access denied. Not an Admin!</p>;

    return (
        <StyledDashboard>
            <SideNav>
                <h3>Quick Links</h3>
                <NavLink className={({ isActive }) =>
                    isActive ? "link-active" : "link-inactive"}
                         to="/admin/summary">
                 <FaTachometerAlt /> Summary
                </NavLink>
                <NavLink className={({ isActive }) =>
                        isActive ? "link-active" : "link-inactive"}
                         to="/admin/products">
                <FaStore/>  Products
                </NavLink>
                <NavLink className={({ isActive }) =>
                        isActive ? "link-active" : "link-inactive"}
                         to="/admin/orders">
                <FaClipboard/> Orders
                </NavLink>
                <NavLink
                    className={({ isActive }) =>
                        isActive ? "link-active" : "link-inactive"}
                        to="/admin/users">
                  <FaUsers /> Users
                </NavLink>
            </SideNav>
            <Content>
                <Outlet />
            </Content>
        </StyledDashboard>
    );
};

export default   Dashboard;

const StyledDashboard = styled.div`
  padding: 3rem;
  display: flex;
  height: 100vh;
  margin-bottom: 10rem;
`;

const SideNav = styled.div`
  max-width: 200px;
  width: 100%;
  height: 250px;
  position: fixed;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  overflow-y: auto;
  background: rgba(6, 29, 79, 0.91);
  color: rgba(234, 234, 255, 0.87);
  border-radius: 10px;
  box-shadow: rgba(164, 164, 213, 0.8) 0 7px 29px 0;

  h3 {
    
    margin: 0 0 1rem 0;
    padding: 0;
    text-transform: uppercase;
    font-size: 20px;
    
  }

  a {
    text-decoration: none;
    margin-bottom: 1rem;
    font-size: 14px;
    display: flex;
    align-items: center;
    font-weight: 700;
    color: rgba(234, 234, 255, 0.87);
    
    svg{
      color: white;
      margin-right: 0.5rem;
      font-size: 18px;
    }
  }
`;

const Content = styled.div`
  margin-left: 200px;
  padding: 2rem 3rem;
  width: 100%;
`;