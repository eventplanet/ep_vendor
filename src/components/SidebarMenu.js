import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { MdDashboard, MdMenu, MdPeople, MdSubscriptions } from 'react-icons/md'
const SidebarMenu = (props) => {
  const [status, setStatus] = useState(false)
  return (
    <>
      <li className="sidebar-item" onClick={(e) => setStatus(!status)}>
        <Link
          className={`sidebar-link ${status ? 'active' : ''} has-arrow waves-effect waves-dark`}
          to="/dashboard"
          aria-expanded="false">
          {props.icon}
          <span className="hide-menu" >{props.title}</span></Link>
        <ul aria-expanded="false" className={`collapse first-level ${status ? 'in' : ''}`}>
          {props.dropDown?.map((item, index) => {
            return (
              <li className="sidebar-item" key={index}>
                <Link to={item.href} className="sidebar-link"

                >
                  {/* <MdMenu size={24} style={{display:'inline-block',color:'white', textAlign:'center', width:'35px'}}/> */}
                  {item.icon}
                  <span className="hide-menu">{item.title}</span></Link>
              </li>
            )
          })}
        </ul>
      </li>
    </>
  )
}

export default SidebarMenu