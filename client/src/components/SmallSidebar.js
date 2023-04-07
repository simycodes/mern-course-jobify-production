import Wrapper from "../assets/wrappers/SmallSidebar";
import { FaTimes } from 'react-icons/fa';
import { useAppContext } from '../context/appContext';
import Logo from './Logo';
import NavLinks from "./NavLinks";

export const SmallSidebar = () => {
  const {showSidebar, toggleSidebar} = useAppContext(); 
  // SAME AS CODE ABOVE - BUT useContext(AppContext); PASSED IN A COMPONENT useAppContext(); 
  // const {showSidebar, toggleSidebar} = useContext(AppContext); 
  return (
    <Wrapper>
      <div className={showSidebar? 'sidebar-container show-sidebar':'sidebar-container'}>
        <div className='content'>

          {/* THE CLOSE X BUTTON */}
          <button className='close-btn' onClick={toggleSidebar}>
            <FaTimes />
          </button>
          {/* THE LOGO */}
          <header>
            <Logo />
          </header>
          {/* THE LINKS SECTION - LINKS ARE PASSED USING A COMPONENT & DEFINED IN A COMPONENT*/}
          <NavLinks toggleSidebar={toggleSidebar} />

        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSidebar;