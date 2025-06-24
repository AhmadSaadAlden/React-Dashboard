import { useEffect, useState, useContext } from 'react'
import './ManageProducts.css'
import axios from 'axios'
import { Link , Outlet, useLocation } from 'react-router-dom'
import PrimaryButtons from '../PrimaryButtons/PrimaryButtons'
import updateIcon from '/assets/images/update.png'
import deleteIcon from '/assets/images/bin.png'
import { ProductContext } from './ProductContext/ProductContext'


const ManageProducts = ({products}) => {
    const base_url = 'https://vica.website/api/items'
    const { add, edit, setMode, fetchItems } = useContext(ProductContext)
    const [productItem , setProductItem] = useState([])
    const location = useLocation()

    useEffect(() => {
        const fetchItems = async () => {
            try{
                const token = localStorage.getItem("token");
                if (!token) {
                    console.error("Token not found in localStorage");
                    return;
                }
                const config = {
                    headers : {
                        'Authorization': `Bearer ${token}`,
                        'Accept' : "application/json",
                    }
                }
                const response  = await axios.get(base_url , config)
                console.log('Response:', response); 
                console.log('Response data:', response.data); 
                if (response.data && Array.isArray(response.data)) {
                    localStorage.setItem("items" , JSON.stringify(response.data))
                    setProductItem(response.data)
                }else{
                    console.error("Unexpected server response:", response);
                }
            }
            catch (error) {
                console.error("Error fetching data:", error);
                if (error.response && error.response.status === 401) {
                    console.error("Unauthorized access - token might be invalid or expired.");
                }
            }
        }
        fetchItems()
    } , []) 
    
    const isSubPage = location.pathname.endsWith('/add-product') ||
                    location.pathname.includes('edit-product/') ||
                    location.pathname.includes('delete-product/')

    
  return (
    <>
        <ProductContext.Provider value={{add , edit, fetchItems}}>
            {isSubPage ? (
                <Outlet />
            ) : (
                <div className='content'>
                    {products?.map((product , index) => (
                        <div key={index} className='data'>
                            <header>
                                <div>
                                    <h1>{product.title}</h1>
                                </div>
                                <Link to={"add-product"} onClick={() => setMode('add')}>
                                    <PrimaryButtons>
                                    {product.icon}
                                    {product.btn}
                                    </PrimaryButtons>
                                </Link>
                            </header>

                            <div className='all-products'>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>{product.tr.thOne}</th>
                                            <th>{product.tr.thTwo}</th>
                                            <th>{product.tr.thThird}</th>
                                            <th>{product.tr.thFour}</th>
                                            <th>{product.tr.thFive}</th>
                                        </tr>
                                    </thead>
                                    <tbody className="table-content">
                                        {productItem.map((item , index) => {
                                            return (
                                                <tr key={index} className='row'>
                                                    <td>{item.id}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.price}</td>
                                                    <td><img src={item.image_url} alt="upload image" className='upload-image' /></td>
                                                    <td className="table-actions">
                                                        <Link to={`edit-product/${item.id}`} onClick={() => setMode('edit')}>
                                                            <button className="edit-btn">
                                                                <img src={updateIcon} alt="update" />
                                                            </button>
                                                        </Link>
                                                        <Link to={`delete-product/${item.id}`}>
                                                            <button className="delete-btn">
                                                                <img src={deleteIcon} alt="bin" />
                                                            </button>
                                                        </Link>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </ProductContext.Provider>
    </>
  )
}

export default ManageProducts