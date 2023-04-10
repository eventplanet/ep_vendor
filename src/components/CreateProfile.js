import React, { useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { FaCaretRight } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import init from './../firebase'
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
const CreateProfile = () => {
    let { cat_id, sub_cat_id } = useParams();
    console.log(`cat id is ${cat_id} and sub cat id is ${sub_cat_id}`)
    let navigate = useNavigate();
    const [data, setData] = useState({
        city: '',
        business_name: '',
        email: '',
        mobno: '',
        password: ''
    });

    const formHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData({ ...data, [name]: value })
    }
    const btnHandler = async () => {
        // toast('Process to backend City '+data.city+' Business Name '+data.business_name+' Email '+data.email+'Mobile Number '+data.mobno);
        //navigate('/dashboard');   
        const { city, business_name, email, mobno, password } = data;
        if (city === '') {
            toast.error('City field is required');
        } else if (business_name === '') {
            toast.error('Business Name field is required');
        }
        else if (email === '') {
            toast.error('Email field is required');
        } else if (mobno === '') {
            toast.error('Mobile Number field is required');
        } else if (password === '') {
            toast.error('Password field is required');
        }
        else {

            const auth = init.auth;
            try {
                const user = await createUserWithEmailAndPassword(
                    auth, email, password
                )
                const documentId = user.user.uid;

                await setDoc(doc(init.db, "merchants", documentId), {
                    serviceId: cat_id,
                    sub_cat_id: sub_cat_id,
                    business_name,
                    vendorProfile: [],
                    products: [],
                    calendar: [],
                    PreviousWork: [],
                    contactInfo: {
                        contactPersonName: '',
                        email,
                        mobno,
                        businessAddress: '',
                        city,
                        status: false
                    },
                    serviceAndPricing: {
                        areaName: '',
                        areaType: '',
                        floatingCapacity: '',
                        fixedCapacity: '',
                        parkingFacility: '',
                        rentalFrom: '',
                        advanceForBooking: '',
                        paymentOnEventDate: '',
                        paymentOnDelivery: '',
                        cancellationPolicy: '',
                        additionalFacility: {},
                        status: false
                    },
                    profilePicture: {},
                    basicDetails: {
                        business: "",
                        year: "",
                        number: "",
                        web: "",
                        fb: "",
                        insta: "",
                        propertyType: {},
                        status: false
                    }

                });
                navigate('/dashboard/profile');
            }
            catch (err) {
                toast.error(err.message);
            }

        }

    }
    return (
        <>
            <section className='main_container'>
                <div className="container">
                    <div className="row py-5">
                        <div className="col-md-8 mx-auto">
                            <h3>Excellent! Lets Create An Outstanding Profile.</h3>
                            <form>
                                <div className="form-floating mb-3">
                                    <select name="city" onChange={formHandler} value={data.city} className="form-select">
                                        <option >Select City</option>
                                        <option value="lucknow">Lucknow</option>
                                        <option value="mumbai">Mumbai</option>
                                        <option value="prayagraj">Prayagraj</option>
                                    </select>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="text" name="business_name" className="form-control" id="business_name" onChange={formHandler} value={data.business_name} placeholder="Your Brand/Business Name" />
                                    <label htmlFor="business_name">Your Brand/Business Name</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="email" name="email" onChange={formHandler} value={data.email} placeholder="Email address" />
                                    <label htmlFor="email">Email address</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="mobno" name="mobno" onChange={formHandler} value={data.mobno} placeholder="Mobile Number" />
                                    <label htmlFor="mobno">Mobile Number</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="password" autoComplete="false" className="form-control" id="password" name="password" onChange={formHandler} value={data.password} placeholder="Password" />
                                    <label htmlFor="password">Password</label>
                                </div>
                                <center><a className="btn btn-primary" onClick={btnHandler}>Create My Profile <FaCaretRight /></a></center>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <ToastContainer />
        </>
    )
}
export default CreateProfile