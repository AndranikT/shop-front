import { useDispatch, useSelector } from "react-redux";
import { cartFetch} from "../features/cartSlice";
import {useEffect, useState} from "react";
import {productsFetch} from "../features/productSlice";
import NavMenu from "./NavMenu";
import SearchBar from "./SearchBar";
import ProductsContainer from "./ProductsContainer";
import {productsFilterFetch} from "../features/selectSlice";
const Home = () => {
    const dispatch = useDispatch();

    const { items : data}  =  useSelector((state) => state.products);
    const { status } = useSelector((state)=> state.filter)
    const [searchResult,  setSearchResult] = useState([])

    useEffect(()=>{
        dispatch(cartFetch())
        dispatch(productsFetch())
        dispatch(productsFilterFetch())
    },[])

    return (
        <div className="home-container">

                <div>
                    <SearchBar setResultSearch={setSearchResult}/>
                    <div className="navMenu-products">
                        <NavMenu/>
                        <ProductsContainer data={data} searchResult={searchResult} />
                    </div>
                </div>
    </div>
    );
};

export default Home;
