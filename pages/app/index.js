
import React, { useState } from 'react'
import Sidebar from '../../components/SideBar'
import MenuBarMobile from '../../components/MenuBarMobile';

const index = () => {
    const [showSidebar, setShowSidebar] = useState(false);
  return (
<div className="min-h-screen">
  {/* <Sidebar aria-label="Default sidebar example">
    <Sidebar.Items>
      <Sidebar.ItemGroup>
        <Sidebar.Item
          href="#"
        >
          Dashboard
        </Sidebar.Item>
        <Sidebar.Item
          href="#"
          label="Pro"
          labelColor="alternative"
        >
          Kanban
        </Sidebar.Item>
        <Sidebar.Item
          href="#"
          label="3"
        >
          Inbox
        </Sidebar.Item>
        <Sidebar.Item
          href="#"
        >
          Users
        </Sidebar.Item>
        <Sidebar.Item
          href="#"
        >
          Products
        </Sidebar.Item>
        <Sidebar.Item
          href="#"
        >
          Sign In
        </Sidebar.Item>
        <Sidebar.Item
          href="#"
        >
          Sign Up
        </Sidebar.Item>
      </Sidebar.ItemGroup>
    </Sidebar.Items>
  </Sidebar> */}
  <Sidebar show={showSidebar} setter={setShowSidebar} />
  <MenuBarMobile setter={setShowSidebar}/>
</div>
  )
}

export default index