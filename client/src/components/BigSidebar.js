import { useAppContext } from '../context/appContext';
import NavLinks from './NavLinks';
import Logo from '../components/Logo';
import Wrapper from '../assets/wrappers/BigSidebar';

const BigSidebar = () => {
  // GET THE USER STATE FOR TOGGLING THE SIDE BAR
  const { showSidebar } = useAppContext();
  return (
    <Wrapper>
      <div 
        className={showSidebar ? 'sidebar-container ' : 'sidebar-container show-sidebar'}
      >
        <div className='content'>
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
        
      </div>
    </Wrapper>
  );
};

export default BigSidebar;