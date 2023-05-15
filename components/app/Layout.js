import React, { useState } from 'react'
import Sidebar from '../SideBar'
import MenuBarMobile from '../MenuBarMobile'
import AppNav from './AppNav';

const Layout = ({children}) => {
const [showSidebar, setShowSidebar] = useState(false);
  return (
    <div className="min-h-screen  bg-[#0F172A]">

  <Sidebar show={showSidebar} setter={setShowSidebar} />
  <MenuBarMobile setter={setShowSidebar}/>

  <div className='px-[30px] flex-grow md:pl-[280px] pt-20 md:pt-0'>
  <AppNav/>
  {children}
  </div>

</div>
  )
}

export default Layout