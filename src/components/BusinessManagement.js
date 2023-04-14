import React, { useState } from 'react'
import './BusinessAnalysis.css'
import { FaWhatsappSquare, FaFacebookSquare, FaTwitterSquare } from 'react-icons/fa'
import { AiFillRightCircle } from 'react-icons/ai'
import { Chart } from "react-google-charts";
import { Link } from 'react-router-dom'
import { FaFirstOrder } from 'react-icons/fa'

const BusinessManagement = () => {
    const data = [
        [
            "Month",
            "Bolivia",
            "Ecuador",
            "Madagascar",
            "Papua New Guinea",
            "Rwanda",
            "Average",
        ],
        ["2022/05", 165, 938, 522, 998, 450, 614.6],
        ["2022/06", 135, 1120, 599, 1268, 288, 682],
        ["2022/07", 157, 1167, 587, 807, 397, 623],
        ["2022/08", 139, 1110, 615, 968, 215, 609.4],
        ["2022/09", 136, 691, 629, 1026, 366, 569.6],
    ];

    const options = {
        title: "Average Orders Per Month ",
        vAxis: { title: "Cups" },
        hAxis: { title: "Month" },
        seriesType: "bars",
        series: { 5: { type: "line" } },
    };

    const [box, setBox] = useState([

        {
            title: 'Add Booking',
            quatity: '',
            url: 'https://img.icons8.com/office/256/booking.png',
            href: "/dashboard/add_new_booking"
        },
        {
            title: 'Update Your Calendar',
            quatity: '',
            url: 'https://cdn-icons-png.flaticon.com/512/8286/8286738.png'
        },
        {
            title: 'Pending Queries ',
            quatity: '56',
            url: 'https://cdn.iconscout.com/icon/premium/png-256-thumb/impression-2634419-2187376.png'
        },
        {
            title: 'Total Queries',
            quatity: '433',
            url: 'https://cdn.iconscout.com/icon/premium/png-256-thumb/response-time-2682020-2232039.png'
        },
        {
            title: 'Promote Business',
            quatity: '',
            url: 'https://cdn-icons-png.flaticon.com/512/5702/5702664.png'
        },



    ])
    return (
        <div className="page-wrapper">
            <div className="container-fluid">
                <div className="card">
                    <div class="card-body">
                        <div class="d-md-flex align-items-center">
                            <h4 class="card-title">Business Management</h4>

                        </div>

                        <div class="col-lg-12">
                            <div class="row">

                                {
                                    box.map((cur, index) => {
                                        return (

                                            <div class="col-md-3 col-6">
                                                <div class=" p-10  text-center total_card shadow-sm ">

                                                    <div className='data d-flex justify-content-around'>
                                                        <img src={cur.url} className='dash_icon'
                                                        />
                                                        <h4 class="">{cur.quatity}</h4>
                                                    </div>
                                                    <Link to={cur.href}><p class=" p-2">{cur.title}</p>  </Link>


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


    )
}

export default BusinessManagement