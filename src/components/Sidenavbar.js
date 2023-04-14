import React, { useState, useEffect } from 'react'
import {
  MdDashboard, MdPeople, MdSubscriptions, MdOutlineProductionQuantityLimits, MdAccountBox, MdOutlineBusinessCenter,
  MdOutlineLibraryAdd, MdOutlineViewList

} from 'react-icons/md'
import { Link } from 'react-router-dom'
import './style.min.css'
import SidebarMenu from './SidebarMenu'
const Sidenavbar = () => {
  const [windowDimension, setWindowDimension] = useState(window.innerWidth);
  const [isOpen, setIsOpen] = useState(true);

  const detectSize = () => {
    setWindowDimension(window.innerWidth)
    if (windowDimension < 768) {
      setIsOpen(false)
    } else {
      setIsOpen(true)
    }
  }
  useEffect(() => {
    if (windowDimension < 768) {
      setIsOpen(false)
    }
    window.addEventListener('resize', detectSize)
    return () => {
      window.removeEventListener('resize', detectSize)
    }
  }, [windowDimension])
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
      title: "Staff Management",
      icon: <MdAccountBox className='my__nav__icon' />,
      dropDown: [
        {
          title: "Manage Staff",
          icon: <MdDashboard className='my__nav__icon' />,
          href: 'manage-staff'
        }
      ]
    },
    // {
    //   title: "Business Management",
    //   icon: <MdOutlineBusinessCenter className='my__nav__icon' />,
    //   dropDown: [
    //     {
    //       title: "Add New Booking",
    //       icon: <MdDashboard className='my__nav__icon' />,
    //       href: 'add_new_booking'
    //     }
    //   ]
    // }
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
            <li className="sidebar-item">
              <Link
                className="sidebar-link waves-effect waves-dark sidebar-link"
                to="/dashboard/business-management"
                aria-expanded="false"
              ><MdOutlineBusinessCenter size={23} style={{ display: 'inline-block', color: 'white', textAlign: 'center', width: '35px' }} /><span className="hide-menu">Business Management</span></Link>
            </li>





          </ul>
        </nav>

      </div>

    </aside>
  )
}

export default Sidenavbar