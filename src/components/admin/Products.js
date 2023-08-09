import {Outlet, useNavigate} from "react-router-dom";
import { AdminHeaders, PrimaryButton } from "./CommonStyled";
import {useSelector} from "react-redux";

const Products = () => {
    const items =  useSelector(state => state.items)
    const navigate = useNavigate()

    return (
             <>
                 <AdminHeaders>
                     <h2>Products</h2>
                     <PrimaryButton
                         onClick={() => navigate("/admin/products/create-product")}>
                      Create
                     </PrimaryButton>
                 </AdminHeaders>
                 <Outlet />
             </>

        )
}
export default Products