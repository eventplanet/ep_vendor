import React, { useState } from 'react'
import './BusinessAnalysis.css'
import { FaWhatsappSquare, FaFacebookSquare, FaTwitterSquare } from 'react-icons/fa'
import { AiFillRightCircle } from 'react-icons/ai'
import { Chart } from "react-google-charts";
import { Link } from 'react-router-dom'
import { FaFirstOrder } from 'react-icons/fa'
const BusinessAnalysis = () => {
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
            title: 'Receive queries',
            quatity: '70',
            url: 'https://img.icons8.com/office/256/booking.png'
        },
        {
            title: 'Pending queries',
            quatity: '76',
            url: 'https://cdn-icons-png.flaticon.com/512/8286/8286738.png'
        },
        {
            title: 'Total Impressions ',
            quatity: '56',
            url: 'https://cdn.iconscout.com/icon/premium/png-256-thumb/impression-2634419-2187376.png'
        },
        {
            title: 'Your Response Time',
            quatity: '433',
            url: 'https://cdn.iconscout.com/icon/premium/png-256-thumb/response-time-2682020-2232039.png'
        },
        {
            title: 'Total  reviews',
            quatity: '343',
            url: 'https://cdn-icons-png.flaticon.com/512/5702/5702664.png'
        },



    ])
    return (
        <div className="page-wrapper">
            <div className="container-fluid">
                <div className="card">
                    <div class="card-body">
                        <div class="d-md-flex align-items-center">
                            <h4 class="card-title">Dashboard</h4>

                        </div>

                        <div class="col-lg-12">
                            <div class="row">

                                {
                                    box.map((cur, index) => {
                                        return (
                                            <div class="col-md-3 col-6" key={index}>
                                                <div class=" p-10  text-center total_card shadow-sm ">

                                                    <div className='data d-flex justify-content-around'>
                                                        <img src={cur.url} className='dash_icon' alt="Event Planet" />
                                                        <h4 class="">{cur.quatity}</h4>
                                                    </div>
                                                    <p class=" p-2">{cur.title}</p>


                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>

                </div>
                <div className='row'>
                    <div className='col-md-4'>
                        <div class="card_link shadow card">
                            <div class="card-body">
                                <h3 class="my-3">Share Profile link</h3>
                                <p>Customers can visit the following link and place their orders.</p>
                                <div className='share_link'>
                                    <ul>
                                        <Link to='https://eventplanet.in/' className='text-danger'>https://eventplanet.in/</Link>
                                    </ul>
                                    <span> Share Via
                                        <a href="https://api.whatsapp.com/send?text=https://eventplanet.in/" target="_blank"><FaWhatsappSquare className='watsapp' /></a>
                                        <a href="https://facebook.com/share.php?u=https://eventplanet.in/" target="_blank" rel="noreferrer"><FaFacebookSquare className='facebook' /></a>
                                        <a href="http://twitter.com/share?text=Event%20Planet&url=https://eventplanet.in/" target="_blank" rel="noreferrer"><FaTwitterSquare className='twitter' /></a>
                                    </span>
                                    <div className='card_footer'>
                                        <center> <h4>Get your custom domain <AiFillRightCircle className='rightarrow' /></h4></center>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-8 mb-3' >
                        <Chart
                            chartType="ComboChart"
                            width="100%"
                            height="400px"
                            data={data}
                            options={options}
                        />
                    </div>
                </div>

            </div>
        </div>


    )
}

export default BusinessAnalysis