import Wrapper from "../assets/wrappers/Navbar";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import { useAppContext } from '../context/appContext';
import Logo from './Logo';
import { useState } from "react";

function NavBar() {
  // SET UP USE STATE VALUES TO TOGGLE THE LOGOUT BUTTON
  const [showLogout, setShowLogout] = useState(false);
  const { toggleSidebar, logoutUser, user } = useAppContext();
  
  return (
    <Wrapper>
      <div className="nav-center">
        {/* LEFT ICON IN NAV BAR */}
        <button type="button" className="toggle-btn" onClick={toggleSidebar}>
          <FaAlignLeft /> 
        </button>

        {/* MIDDLE LOGO IN SMALL SCREEN  AND DASHBOARD TEXT IN LARGE SCREEN USING CSS */}
        <div>
          <Logo />
          <h3 className="logo-text">dashboard</h3>
        </div>

        {/* RIGHT BUTTON FOR LOGOUT TOGGLE */}
        <div className="btn-container">
          <button type="button" className="btn" 
            onClick={()=> setShowLogout(!showLogout)}>
            <FaUserCircle />
             {user?.name}
            <FaCaretDown />
          </button>
          <div className={showLogout? "dropdown show-dropdown": "dropdown"}>
            <button type="button" className="dropdown-btn"
            onClick={logoutUser}>
              Logout
            </button>
          </div>
        </div>

      </div>
    </Wrapper>
  )
}
export default NavBar