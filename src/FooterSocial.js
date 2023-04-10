import React from 'react'
import './Footer.css';
import { FaFacebookF, FaTwitter, FaTelegramPlane, FaLinkedin, FaInstagram, FaPhoneAlt } from "react-icons/fa";
const FooterSocial = () => {
    return (
        <div className="col-lg-3 col-md-3 tex-center d-flex justify-content-center align-items-center flex-column">
            <p>KEEP IN TOUCH</p>
            <div className="social_link">
                <div className="link_item">
                    <FaFacebookF />
                </div>
                <div className="link_item">
                    <FaTwitter />
                </div>
                <div className="link_item">
                    <FaTelegramPlane />
                </div>
                <div className="link_item">
                    <FaLinkedin />
                </div>
                <div className="link_item">
                    <FaInstagram />
                </div>
            </div>
            <div className="consult_link">
                <a href="#">Free Consultation with a Wedding Expert</a>
                <p>We’re here to help! </p>

            </div>
            <div className="phone_section">
                <FaPhoneAlt /> <a href="tel:9090909090">9090909090</a>
            </div>

        </div>
    )
}

export default FooterSocial