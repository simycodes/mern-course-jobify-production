import main from '../assets/images/main.svg';
// Using styled components (Wrapper - components that have styles only no js logic) - importing library
import Wrapper from '../assets/wrappers/LandingPage';
import { Logo } from '../components/';
import { Link, Navigate } from 'react-router-dom';
import { useAppContext } from '../context/appContext';
import { React } from 'react'

const Landing = () => {
  const { user } = useAppContext();

  return (
    <>
      {/* REDIRECT USER TO HOME PAGE IF USER TRIES TO GO TO landing.js AFTER LOGGING IN  */}
      {user && <Navigate to='/' />}

      {/* Wrapper is a styled component with no js logic that provides css styles to sub components */}
      <Wrapper> 
        <nav>
          <Logo />
        </nav>

        {/* Main content area */}
        <div className='container page'>

          {/* Info section */}
          <div className='info'>
            <h1>
              job <span>tracking</span> app
            </h1>

            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur.
            </p>
            <Link to='/register' className='btn btn-hero'>
              Login / Register
            </Link>
          </div>

          {/* Main image section */}
          <img src={main} alt='job hunt' className='img main-img' />

        </div>
      </Wrapper>
    </> 
  );
};

export default Landing;
