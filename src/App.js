import './App.css'
import "react-toastify/dist/ReactToastify.css"
import {BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import {ToastContainer} from "react-toastify"
import NavBar from "./components/NavBar";
import Cart from "./components/Cart";
import Home from "./components/Home"
import NotFound from "./components/NotFound";
import Register from './components/auth/Register';
import Login from "./components/auth/Login";
import CheckoutSuccess from "./components/CheckoutSuccess";
import Dashboard from "./components/admin/Dashboard";
import Products from "./components/admin/Products";
import Summary from "./components/admin/Summary";
import CreateProduct from "./components/admin/CreateProduct";
import ProductsList from "./components/admin/list/ProductsList";
import Users from "./components/admin/Users";
import Orders from "./components/admin/Orders";
import Product from "./components/Details/Product";
import Order from "./components/Details/Order";
import UserProfile from "./components/Details/UserProfile";
import User from "./components/user/User"
import UserInfo from "./components/user/UserInfo";
import UserOrder from "./components/user/UserOrders"
import Phones from "./components/menu-lists/phones/Phones";
import Footer from "./components/Footer";
function App() {

  return (
    <div className="App">
    <BrowserRouter>
    <ToastContainer/>
      <NavBar/>
      <Routes>
        <Route path='/' exact element={<Home/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path="/checkout-success" element={<CheckoutSuccess/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/product/:id" element={<Product/>} />
        <Route path="/user/:id" element={<UserProfile/>} />
        <Route path="/order/:id" element={<Order/>} />
        <Route path="/admin" element={<Dashboard/>} >
          <Route path="products" element={<Products/>}>
             <Route index element={<ProductsList/>} />
             <Route path="create-product" element={<CreateProduct/>} />
          </Route>
          <Route path="summary" element={<Summary />}/>
          <Route path="orders" element={<Orders />} />
          <Route path="users" element={<Users />}/>
        </Route>
        <Route path="/user-page" element={<User/>}>
          <Route path="info" element={<UserInfo/>}/>
          <Route path="order" element={<UserOrder/>}/>
        </Route>
        <Route path="/nav-menu/phones" exact element={<Phones/>}/>
        <Route path='*'  element={<NotFound/>} />
      </Routes>
    {/*<Footer/>*/}
    </BrowserRouter>
    </div>
  );
}

export default App;
