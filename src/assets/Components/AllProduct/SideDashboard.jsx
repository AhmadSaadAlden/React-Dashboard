import './SideDashboard.css'
import NavDashboard from './NavDashboard'
import { FaClock , FaPowerOff} from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import DeletProductForm from './DeletProductForm/DeletProductForm'
import { useNotification } from '../AllProduct/ProductContext/NotificationContext'

const SideDashboard = () => {
    const {toast} = useNotification()

    const infoNav = [
        {
            href : '#',
            content : "Dashboard",
            icon : <FaClock />
        },
        {
            href : '#',
            content : "Products",
            icon : <FaClock />
        }
    ]
    
    const Naviagte = useNavigate('')
    const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false)

    useEffect(() => {
        if(!localStorage.getItem('token')){
            Naviagte('/')
        }
    } , [])

    const handleConfirmLogout = () => {
        const logout = () => {
            fetch('https://vica.website/api/logout' , {
                method : "POST",
                headers : {
                    Accept : "application/json",
                    AUTHORIZATION : localStorage.getItem('token')
                },
            })
            .then(res=>res.text())
            .then(res=> {
                console.log(res)
                localStorage.removeItem('token')
                Naviagte('/')
                toast.success("goodbye, Thank you for visiting the dashboard!")
            })
            .catch(err=>console.error('Logout failed:', err))
        }
        logout()
        setShowLogoutConfirmation(false)
    }
    const handleCancelLogout = () => {
        setShowLogoutConfirmation(false)
    }

  return (
    <>
        <div className='SideDashboard'>
            <div className='info'>
                <h1><span>Dash</span>Stack</h1>
                <div className='navitem'>
                    <NavDashboard infoNav={infoNav} />
                </div>
                <div className='logout'>
                    <i><FaPowerOff />
                        <Link onClick={() => setShowLogoutConfirmation(true)} className='link'>Logout</Link>
                    </i>
                </div>
            </div>
        </div>
        {showLogoutConfirmation && (
            <DeletProductForm 
                title="Are you sure you want to logout?"
                btnAccept="Yes, Logout"
                btnDecline="Cancel"
                onConfirm={handleConfirmLogout}
                onCancel={handleCancelLogout}
            />
        )}
    </>
  )
}

export default SideDashboard