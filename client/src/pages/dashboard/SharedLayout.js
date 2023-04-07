import { Outlet } from 'react-router-dom';
import Wrapper from '../../assets/wrappers/SharedLayout';
import { NavBar, SmallSidebar, BigSidebar } from '../../components';

const SharedLayout = () => {
  return (
    <Wrapper>
      {/* THIS WILL BE SHOWN IN DEFAULT HOME PAGE AND ALL SUB PAGES-COMPONENTS */}
      <main className='dashboard'>
        {/* SmallSidebar and BigSidebar DISPLAYS ARE CONTROLLED BY THEIR COMPONENTS CSS */}
        <SmallSidebar />
        <BigSidebar />

        <div>
          <NavBar />

          <div className='dashboard-page'>
            {/* ADDING THE LINKS TO THE SUB PAGES-COMPONENTS USING Outlet ROUTER DOM COMPONENT */}
            {/* Outlet is is a component in which sub components(pages) are displayed in */}
            <Outlet /> 
          </div>

        </div>
      </main>
      
    </Wrapper>
  )
}

export default SharedLayout
