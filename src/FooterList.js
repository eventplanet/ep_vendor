import React from 'react'
import './Footer.css';
const FooterList = ({list}) => {
  return (
    <div className="col-lg-3 col-md-3 footer_list">
        <ul>
          {
            list.map((val,i)=>{
              return(
                <li key={i}><a href={val.href}>{val.title}</a></li>
              )
            })
          }
        </ul>
    </div>
  )
}

export default FooterList