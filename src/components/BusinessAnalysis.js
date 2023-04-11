import React, { useState } from 'react'
import './BusinessAnalysis.css'
import { FaWhatsappSquare, FaFacebookSquare, FaTwitterSquare } from 'react-icons/fa'
import { AiFillRightCircle } from 'react-icons/ai'
import { Link } from 'react-router-dom'
const BusinessAnalysis = () => {
    const [box, setBox] = useState([

        {
            title: 'Total Booking',
            quatity: '4343',
        },
        {
            title: 'Total Products',
            quatity: '4343',
        },
        {
            title: 'Total Employees',
            quatity: '4343',
        },
        {
            title: 'Total Orders',
            quatity: '4343',
        },
        {
            title: 'Pending Orders',
            quatity: '4343',
        },
        {
            title: 'Total Shop',
            quatity: '4343',
        },
        {
            title: 'New Users',
            quatity: '4343',
        },
        {
            title: 'Total Booking',
            quatity: '4343',
        },
        {
            title: 'Total Booking',
            quatity: '4343',
        },
    ])
    return (
        <div className="page-wrapper">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div class="card-body">
                                <div class="d-md-flex align-items-center">
                                    <div>
                                        <h4 class="card-title">Site Analysis</h4>
                                        <h5 class="card-subtitle">Overview of Latest Month</h5>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-lg-12">
                                        <div class="row">
                                            {
                                                box.map((cur, index) => {
                                                    return (
                                                        <div class="col-3">
                                                            <div class="bg-dark p-10 text-white text-center total_card">
                                                                <i class="mdi mdi-account fs-3 mb-1 font-16"></i>
                                                                <h4 class="mb-0 mt-1">{cur.quatity}</h4>
                                                                <h5 class="font-light p-2">{cur.title}</h5>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }


                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className='col-md-4'>
                    <div class="card_link shadow card">
                        <div class="card-body">
                            <h3 class="my-3">Share store link</h3>
                            <p>Customers can visit the following link and place their orders.</p>
                            <div className='share_link'>
                                <ul>
                                    <Link to='https://eventplanet.in/' className='text-danger'>https://eventplanet.in/</Link>
                                </ul>
                                <span> Share Via <FaWhatsappSquare className='watsapp' /> <FaFacebookSquare className='facebook' /><FaTwitterSquare className='twitter' /></span>
                                <div className='card_footer'>
                                    <center> <h4>Get your custom domain <AiFillRightCircle className='rightarrow' /></h4></center>
                                </div>
                            </div>
                        </div>

                    </div>


                </div>
            </div>
        </div>
    )
}

export default BusinessAnalysis