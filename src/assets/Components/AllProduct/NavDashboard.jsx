import { NavLink } from 'react-router-dom'
import './NavDashboard.css'
import NavBarList from '../NavBarList/NavBarList'
import NavItemList from '../NavItemList/NavItemList'

const NavDashboard = ({infoNav}) => {
  return (
    <>
        <nav>
            <NavBarList>
                {infoNav.map((item , index) => (
                    <NavItemList key={index}>
                        <NavLink to={item.href}>
                            <i>{item.icon}</i>
                            <span>{item.content}</span>
                        </NavLink>
                    </NavItemList>
                ))}
            </NavBarList>
        </nav>
    </>
  )
}

export default NavDashboard