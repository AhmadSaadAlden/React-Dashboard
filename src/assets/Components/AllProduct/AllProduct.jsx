import './AllProduct.css'
import SideDashboard from './SideDashboard'
import ItemsDashboard from './ItemsDashboard'
import { Outlet, useLocation } from 'react-router-dom'

const AllProduct = () => {
  const location = useLocation()
  const shouldShowOutlet = location.pathname.includes('delete-product');

  
  return (
    <>
        <div className="dashboard">
            <div>
                <SideDashboard />
            </div>
            <div>
                <ItemsDashboard />
            </div>
        </div>
        {shouldShowOutlet && <Outlet />} 
    </>
  )
}


export default AllProduct