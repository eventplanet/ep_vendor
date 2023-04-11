import React, { useState, } from 'react'
import {
  MdDashboard, MdMenu, MdPeople, MdSubscriptions, MdOutlineProductionQuantityLimits, MdAccountBox, MdOutlineBusinessCenter,
  MdOutlineLibraryAdd, MdOutlineViewList

} from 'react-icons/md'
import { Link } from 'react-router-dom'
import './style.min.css'
import SidebarMenu from './SidebarMenu'
const Sidenavbar = () => {
  const [status, setStatus] = useState(false)
  const [item, setItem] = useState([
    {
      title: "Profile Management",
      icon: <MdPeople className='my__nav__icon' />,
      dropDown: [
        {
          title: "Profile",
          icon: < MdAccountBox className='my__nav__icon' />,
          href: 'profile'
        },
        {
          title: "Add Product",
          icon: <MdOutlineLibraryAdd className='my__nav__icon' />,
          href: 'add-product'
        },
        {
          title: "Product List",
          icon: <MdOutlineViewList className='my__nav__icon' />,
          href: 'product-list'
        },
      ]
    },
    {
      title: "Staf Management",
      icon: < MdAccountBox className='my__nav__icon' />,
      dropDown: [
        {
          title: "Previous Work",
          icon: <MdDashboard className='my__nav__icon' />,
          href: 'previous-work'
        },
        {
          title: "Basic Details",
          icon: <MdDashboard className='my__nav__icon' />,
          href: 'basic-details'
        },
      ]
    },
    {
      title: "Business Management",
      icon: <MdOutlineBusinessCenter className='my__nav__icon' />,
      dropDown: [
        {
          title: "Previous Work",
          icon: <MdDashboard className='my__nav__icon' />,
          href: 'previous-work'
        },
        {
          title: "Basic Details",
          icon: <MdDashboard className='my__nav__icon' />,
          href: 'basic-details'
        },
      ]
    }
  ])
  return (
    <aside className="left-sidebar" data-sidebarbg="skin5" >
      {/* <!-- Sidebar scroll--> */}
      <div className="scroll-sidebar">
        {/* <!-- Sidebar navigation--> */}
        <nav className="sidebar-nav">
          <ul id="sidebarnav" className="pt-4">
            <li className="sidebar-item">
              <Link
                className="sidebar-link waves-effect waves-dark sidebar-link"
                to="dash_board"
                aria-expanded="false"
              ><MdDashboard size={23} style={{ display: 'inline-block', color: 'white', textAlign: 'center', width: '35px' }} /><span className="hide-menu">Dashboard</span></Link>
            </li>
            {
              item.map((item, index) => {
                return (
                  <SidebarMenu title={item.title} icon={item.icon} dropDown={item.dropDown} key={index} />
                )
              })
            }





          </ul>
        </nav>

      </div>

    </aside>
  )
}

export default Sidenavbar