import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { doc, setDoc, getDoc, getDocs, collection } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import init from './../firebase'
import { useUserAuth } from '../context/UserAuthContext';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const Profile = () => {
    const [loading, setLoading] = useState(true);
    const { user } = useUserAuth();
    const merchant_id = user.uid;
    console.log('Merchant ID', merchant_id)
    const auth = init.auth;
    const [merchant, setMerchant] = useState([]);
    const [country, setCountry] = useState([]);
    const [state, setState] = useState([]);
    const [city, setCity] = useState([]);
    const [locality, setLocality] = useState([])
    const [data, setData] = useState({
        country_id: '',
        state_id: '',
        city_id: '',
        pincode: '',
        locality_id: '',
        street: '',
        landmark: '',
        email: '',
        mobno: '',
        gst: '',
        workingSince: ''
    })

    const getSingleDocumentHandler = async () => {
        try {
            console.log(`fetching document data  for merchant Id ${merchant_id}`)
            const res = await getDoc(doc(init.db, "merchants", merchant_id));
            setMerchant(res.data());
            setData(res.data().vendorProfile);
            setLoading(false);
        } catch (error) {
            console.log(`Error ${error} `)
        }
    }
    useEffect(() => {
        getSingleDocumentHandler()
    }, [])
    const getCountry = async () => {
        try {
            const mycollection = collection(init.db, 'countries');
            const data = await getDocs(mycollection);
            setCountry(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        } catch (error) {
            console.log(`Error ${error} `)
        }
    }
    const getState = async () => {
        try {
            const mycollection = collection(init.db, 'states');
            const data = await getDocs(mycollection);
            setState(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        } catch (err) {
            console.log(`Error is ${err}`)
        }
    }
    const getCity = async () => {
        try {
            const mycollection = collection(init.db, 'cities');
            const data = await getDocs(mycollection);
            setCity(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        } catch (err) {
            console.log(`Error is ${err}`)
        }
    }
    const getLocality = async () => {
        try {
            const mycollection = collection(init.db, 'locality');
            const data = await getDocs(mycollection);
            setLocality(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        } catch (err) {
            console.log(`Error is ${err}`)
        }
    }
    useEffect(() => {
        getCountry()
        getState()
        getCity()
        getLocality()
        getSingleDocumentHandler()
    }, [merchant_id])
    const formHandler = (e) => {

        const name = e.target.name;

        const value = e.target.value;

        setData({ ...data, [name]: value })

    }
    const btnHandler = async (e) => {
        const { country_id,
            state_id,
            city_id,
            pincode,
            locality_id,
            street,
            landmark,
            email,
            mobno,
            gst,
            workingSince } = data;
        e.preventDefault();
        if (country_id != '' && state_id != '' && city_id != '' && pincode != '' && email != '' && mobno != '' && workingSince != '') {
            try {
                await setDoc(doc(init.db, "merchants", merchant_id), {
                    ...merchant,
                    vendorProfile: {
                        country_id,
                        state_id,
                        city_id,
                        pincode,
                        locality_id,
                        street: street || '',
                        landmark: landmark || '',
                        email,
                        mobno,
                        gst: gst || '',
                        workingSince
                    }
                }, { merge: true });
                toast.success('Profile Updated Successfully');
                setData({
                    country_id: '',
                    state_id: '',
                    city_id: '',
                    pincode: '',
                    locality_id: '',
                    street: '',
                    landmark: '',
                    email: '',
                    mobno: '',
                    gst: '',
                    workingSince: ''
                })

            } catch (err) {
                console.log(err)
            }
        } else {
            toast.error('Please fill all the mendatary field')
        }
    }
    const stateHandler = (e) => {
        const state_id = e.target.value;
        const updatedCity = city.filter(prev => prev.state_id === state_id);
        console.log('Current City State Wise ', updatedCity)
        // setCity(updatedCity);
    }
    return (
        <div className="page-wrapper">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className='card-header bg-white'>
                                <h3>Product Information</h3>
                            </div>
                            <div className='card-body'>
                                {
                                    merchant && (
                                        <>
                                            <div className="container">
                                                <div className="row py-3">
                                                    <div className="col-md-12">

                                                        <div className='row'>
                                                            <div className='col-md-3 text-center'>
                                                                {merchant?.profilePicture?.image ? (
                                                                    <img src={merchant.profilePicture?.image} style={{ height: '200px', width: '200px', borderRadius: '50%', border: '2px solid skyblue' }} />
                                                                ) : (
                                                                    <Link to="/dashboard/profile-picture" style={{ textDecoration: 'none' }}>
                                                                        <div style={{ height: '200px', width: '200px', borderRadius: '50%', border: '2px solid skyblue', margin: '1px', display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', color: '#000' }}>
                                                                            <i className='fa fa-plus' style={{ fontSize: '32px' }}></i>
                                                                            Add Profile Picture
                                                                        </div>
                                                                    </Link>
                                                                )
                                                                }


                                                            </div>
                                                            <div className='col-md-9'>
                                                                {loading ? <Skeleton count={1} /> : <h1 style={{ fontWeight: 'bold', color: '#41B0FA' }}>{merchant?.business_name}</h1>}

                                                                <div className='row my-3'>
                                                                    <div className='col-md-12'>
                                                                        <p style={{ marginBottom: '-5px', fontWeight: 'bold', fontSize: '22px' }}>Business Category</p>
                                                                    </div>
                                                                    <div className='row mt-2'>
                                                                        <div className='col-md-4'>
                                                                            <div className='form-group'>

                                                                                <select className='form-control'>
                                                                                    <option>Select Category</option>
                                                                                    <option>Venue</option>
                                                                                    <option>Vendor</option>
                                                                                    <option>Transport</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                        <div className='col-md-4'>
                                                                            <div className='form-group'>
                                                                                <select className='form-control'>
                                                                                    <option>Select Sub Category</option>
                                                                                    <option>Venue</option>
                                                                                    <option>Vendor</option>
                                                                                    <option>Transport</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                        <div className='col-md-4'>
                                                                            <button className='btn '>Submit</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <p style={{ marginBottom: '-5px', fontWeight: 'bold', fontSize: '22px' }}>About Us</p>
                                                                {loading ? <Skeleton count={5} /> : (
                                                                    <p style={{ textAlign: 'justify', border: '2px solid #41B0FA', padding: '8px', borderRadius: '10px', color: 'rgba(0,0,0,0.5)' }}>{merchant?.basicDetails?.business}</p>
                                                                )
                                                                }

                                                            </div>
                                                        </div>
                                                        <div className='row'>
                                                            <div className='col-md-12'>
                                                                <h3>Complete Your Business Profile</h3>

                                                                <form className='py-3'>
                                                                    <div className='row'>
                                                                        <div className='form-group col-md-6 mb-3'>
                                                                            <label style={{ color: '#41B0FA' }}>Country<span className='text-danger'>*</span></label>
                                                                            <select className='form-control' name="country_id" onChange={formHandler} >
                                                                                <option>Select Country</option>
                                                                                {
                                                                                    country?.map((item, index) => {
                                                                                        return (
                                                                                            <option value={item.id} key={index} selected={(item.id === data.country_id)}>{item.name}</option>
                                                                                        )
                                                                                    })
                                                                                }
                                                                            </select>
                                                                        </div>
                                                                        <div className='form-group col-md-6 mb-3'>
                                                                            <label style={{ color: '#41B0FA' }}>State<span className='text-danger'>*</span></label>
                                                                            <select className='form-control' name="state_id" onChange={formHandler}>
                                                                                <option>Select State</option>
                                                                                {
                                                                                    state.filter((pre) => pre.country_id === data.country_id).map((item, index) => {
                                                                                        return (
                                                                                            <option value={item.id} key={index} selected={(item.id === data.state_id)}>{item.name}</option>
                                                                                        )
                                                                                    })
                                                                                }
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                    <div className='row'>
                                                                        <div className='form-group col-md-6 mb-3'>
                                                                            <label style={{ color: '#41B0FA' }}>City<span className='text-danger'>*</span></label>
                                                                            <select className='form-control' name="city_id" onChange={formHandler}>
                                                                                <option>Select City</option>
                                                                                {
                                                                                    city.filter((pre) => pre.state_id === data.state_id).map((item, index) => {
                                                                                        return (
                                                                                            <option value={item.id} selected={(item.id === data.city_id)}>{item.city}</option>
                                                                                        )
                                                                                    })
                                                                                }
                                                                            </select>
                                                                        </div>
                                                                        <div className='form-group col-md-6 mb-3'>
                                                                            <label style={{ color: '#41B0FA' }}>Pincode<span className='text-danger'>*</span></label>
                                                                            <input type="text" name="pincode" placeholder="Enter Pincode" value={data.pincode} onChange={formHandler} className='form-control' />
                                                                        </div>
                                                                    </div>
                                                                    <div className='row'>
                                                                        <div className='form-group col-md-6 mb-3'>
                                                                            <label style={{ color: '#41B0FA' }}>Locality<span className='text-danger'>*</span></label>
                                                                            <select className='form-control' name="locality_id" onChange={formHandler}>
                                                                                <option>Select Locality</option>
                                                                                {
                                                                                    locality.filter((pre) => pre.city_id === data.city_id).map((item, index) => {
                                                                                        return (
                                                                                            <option value={item.id} key={index} selected={(item.id === data.locality_id)}>{item.name}</option>
                                                                                        )
                                                                                    })
                                                                                }

                                                                            </select>
                                                                        </div>
                                                                        <div className='form-group col-md-6 mb-3'>
                                                                            <label style={{ color: '#41B0FA' }}>Street</label>
                                                                            <input type="text" name="street" placeholder="Street Address" className='form-control' value={data.street} onChange={formHandler} />
                                                                        </div>
                                                                    </div>
                                                                    <div className='row'>
                                                                        <div className='form-group col-md-6 mb-3'>
                                                                            <label style={{ color: '#41B0FA' }}>Landmark</label>
                                                                            <input type="text" name="landmark" placeholder="Enter Landmark" value={data.landmark
                                                                            } onChange={formHandler} className='form-control' />
                                                                        </div>
                                                                        <div className='form-group col-md-6 mb-3'>
                                                                            <label style={{ color: '#41B0FA' }}>Email Address<span className='text-danger'>*</span></label>
                                                                            <input type="text" name="email" className='form-control' value={data.email} onChange={formHandler} placeholder='Email Address' />
                                                                        </div>
                                                                    </div>
                                                                    <div className='row'>
                                                                        <div className='form-group col-md-6 mb-3'>
                                                                            <label style={{ color: '#41B0FA' }}>Mobile Number<span className='text-danger'>*</span></label>
                                                                            <input type="text" name="mobno" placeholder="Mobile Number" value={data.mobno} onChange={formHandler} className='form-control' />
                                                                        </div>
                                                                        <div className='form-group col-md-6 mb-3'>
                                                                            <label style={{ color: '#41B0FA' }}>GST Number</label>
                                                                            <input type="text" name="gst" placeholder="GST Number" value={data.gst} onChange={formHandler} className='form-control' />
                                                                        </div>
                                                                    </div>
                                                                    <div className='row'>
                                                                        <div className='form-group col-md-6 mb-3'>
                                                                            <label style={{ color: '#41B0FA' }}>Working since<span className='text-danger'>*</span></label>
                                                                            <input type="text" name="workingSince" value={data.workingSince} onChange={formHandler} placeholder="Working since" className='form-control' />
                                                                        </div>
                                                                    </div>
                                                                    <div className='form-group text-center'>
                                                                        <button className='btn btn-primary' onClick={btnHandler}>Submit</button>
                                                                    </div>

                                                                </form>
                                                            </div>
                                                            <div className='row p-2' style={{ border: '2px solid #41B0FA', borderRadius: '10px' }}>


                                                                {
                                                                    merchant?.PreviousWork?.slice(0, 4).map((item, i) => {
                                                                        return (
                                                                            <div className='col-md-2 col-4'>
                                                                                <img src={item} style={{ height: '100px', width: '100px', borderRadius: '10px', border: '2px solid rgba(0,0,0,0.3)', margin: '1px' }} className='img__style' key={i} />
                                                                            </div>
                                                                        )
                                                                    })
                                                                }

                                                                <div className='col-md-2 col-4'>
                                                                    <Link to="/dashboard/previous-work" style={{ textDecoration: 'none' }}>
                                                                        <div style={{ height: '100px', width: '100px', borderRadius: '10px', border: '2px solid rgba(0,0,0,0.3)', margin: '1px', display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', color: '#000' }}>
                                                                            <i className='fa fa-plus' style={{ fontSize: '22px' }}></i>
                                                                            Add More
                                                                        </div>
                                                                    </Link>
                                                                </div>
                                                                <div className='col-md-2 col-4'>
                                                                    <Link to="/dashboard/previous-work" style={{ textDecoration: 'none' }}>
                                                                        <div style={{ height: '100px', width: '100px', borderRadius: '10px', border: '2px solid rgba(0,0,0,0.3)', margin: '1px', display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', color: '#000' }}>
                                                                            <i className='fa fa-search' style={{ fontSize: '22px' }}></i>
                                                                            View All
                                                                        </div>
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div >
                                            </div >
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <ToastContainer />
        </div>
    )
}

export default Profile