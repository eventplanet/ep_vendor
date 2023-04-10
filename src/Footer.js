import React, { useState } from 'react'
import FooterList from './FooterList'
import FooterSocial from './FooterSocial';

const Footer = () => {
    const [list1, setList1] = useState([
        {
            title: 'Home',
            href: '#'
        },
        {
            title: 'About EventPlanet',
            href: '#'
        },
        {
            title: 'Contact Us',
            href: '#'
        },
        {
            title: 'Terms & Conditions',
            href: '#'
        },
        {
            title: 'Privacy Policy',
            href: '#'
        },
        {
            title: 'Blogs',
            href: '#'
        },
    ]);
    const [list2, setList2] = useState([
        {
            title: 'Venue',
            href: '#'
        },
        {
            title: 'Vendors',
            href: '#'
        },
        {
            title: 'Destination Wedding',
            href: '#'
        },
        {
            title: 'Birthday',
            href: '#'
        },
        {
            title: 'Corporate Events',
            href: '#'
        },
        {
            title: 'Government Events',
            href: '#'
        },
    ]);
    const [list3, setList3] = useState([
        {
            title: 'Transportation',
            href: '#'
        },
        {
            title: 'Event Insurance',
            href: '#'
        },
        {
            title: 'Outfits',
            href: '#'
        },
        {
            title: 'Photoshoot',
            href: '#'
        },
        {
            title: 'Catering',
            href: '#'
        },
        {
            title: 'Artist',
            href: '#'
        },
    ]);
    return (
        <section className="bg-white">
            <div className="container">
                <div className="row py-4">
                    <FooterList list={list1} />
                    <FooterList list={list2} />
                    <FooterList list={list3} />
                    <FooterSocial />
                </div>
                <div className="row d-flex justify-content-center py-2">
                    &copy; 2022 EVENT PLANET
                </div>
            </div>
        </section>
    )
}

export default Footer