import './ItemsDashboard.css'
import ManageProducts from './ManageProducts'
import ProductsAccount from './ProductsAccount'
import { FaPlus } from 'react-icons/fa'

const ItemsDashboard = () => {

  const accountMe = [
    {
      title : "Products",
      profile : "/assets/images/account.png",
      alt : "profile",
      name : "Moni Roy",
      description : "Admin",
    }
  ]

  const products = [
    {
      title : "Manage Products",
      icon : <FaPlus />,
      btn : "Add Product",
      tr : {
          thOne : "#",
          thTwo : "Product Name",
          thThird : "Price",
          thFour: "Image",
          thFive: "Actions"
        }
    }
    
  ]

  return (
    <>
        <div className='itemsdashboard'>
              <ProductsAccount accountMe={accountMe} />
              <ManageProducts products={products} />
                
        </div>
    </>
  )
}

export default ItemsDashboard