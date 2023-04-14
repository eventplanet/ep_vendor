import React, { useState, useEffect } from 'react'
import { Line, Circle } from 'rc-progress';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { doc, setDoc, getDoc, getDocs, collection } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import init from './../firebase'
import { useUserAuth } from '../context/UserAuthContext';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import './Profile.css'
import { v4 as uuidv4 } from 'uuid';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import avatar from '../assets/avatar.png'
import VenueTTK from './thingstoknow/VenueTTK';
import PhotographyTTK from './thingstoknow/PhotographyTTK';
import './thingstoknow/style.css'
import BridalmakeupTTK from './thingstoknow/BridalmakeupTTK';
const Profile = () => {
    const [edit, setEdit] = useState(false)
    const [progresspercent, setProgresspercent] = useState(0);
    const [previousImgProgress, setPreviousImgProgress] = useState(0);
    const [imgUrl, setImgUrl] = useState(null);
    const [previousImgUrl, setPreviousImgUrl] = useState(null);
    const [category, setCategory] = useState([])
    const [subCategory, setSubCategories] = useState([])
    const [loading, setLoading] = useState(true);
    const { user } = useUserAuth();
    const merchant_id = user.uid;
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
        workingSince: '',
        contactPersonName: '',
        fb: '',
        insta: '',
        introduction: ''
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

    const getCategories = async () => {
        try {
            const mycollection = collection(init.db, 'categories');
            const data = await getDocs(mycollection);
            setCategory(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        } catch (error) {
            console.log(`Error ${error} `)
        }
    }

    const getSubCategories = async () => {
        try {
            const mycollection = collection(init.db, 'sub_categories');
            const data = await getDocs(mycollection);
            setSubCategories(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        } catch (error) {
            console.log(`Error ${error} `)
        }
    }
    useEffect(() => {
        getCategories()
        getSubCategories()
    }, [])
    useEffect(() => {
        getSingleDocumentHandler()
    }, [imgUrl, previousImgUrl])
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
            workingSince,
            contactPersonName,
            fb,
            insta,
            introduction
        } = data;
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
                        workingSince,
                        contactPersonName: contactPersonName || '',
                        fb: fb || '',
                        insta: insta || '',
                        introduction: introduction || ''
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
                    workingSince: '',
                    contactPersonName: '',
                    fb: '',
                    insta: '',
                    introduction: ''
                })
                getSingleDocumentHandler()
                setEdit(!edit)
            } catch (err) {
                console.log(err)
            }
        } else {
            toast.error('Please fill all the mendatary field')
        }
    }
    const imgUploader = (e) => {
        console.log("Image process", e.target.files[0])
        const file = e.target.files[0];
        const fileExtension = file.name.split('.').pop();
        // console.log('File name ' + file + 'fileExtension ' + fileExtension)
        const storageRef = ref(init.storage, `${uuidv4()}.${fileExtension}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgresspercent(progress);
            },
            (err) => {
                console.log(err);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('Uploaded image', downloadURL)
                    setImgUrl(downloadURL);
                    updateSingleDocumentHandler(downloadURL);
                    toast.success('Profile Picture Updated Successfully');
                });
            }
        );
    }
    const updateSingleDocumentHandler = async (downloadURL) => {
        try {
            await setDoc(doc(init.db, "merchants", merchant_id), {
                ...merchant,
                profilePicture: {
                    image: downloadURL
                }
            });
            toast.success('Image Updated Successfully');
        } catch (err) {
            console.log(`Error ${err}`)
        }
    }
    const previousUploader = (e) => {
        console.log("Image process", e.target.files[0])
        const file = e.target.files[0];
        const fileExtension = file.name.split('.').pop();
        // console.log('File name ' + file + 'fileExtension ' + fileExtension)
        const storageRef = ref(init.storage, `${uuidv4()}.${fileExtension}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                //setProgresspercent(progress);
                setPreviousImgProgress(progress)
            },
            (err) => {
                console.log(err);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('Uploaded image', downloadURL)
                    setPreviousImgUrl(downloadURL);
                    uploadPreviousWork(downloadURL);
                });
            }
        );
    }
    const uploadPreviousWork = async (downloadURL) => {
        await setDoc(doc(init.db, "merchants", merchant_id), {
            ...merchant,
            PreviousWork: [...merchant.PreviousWork, downloadURL]
        });
    }

    const thingsToKnowFinder = () => {
        switch (merchant.sub_cat_id) {
            case '52vn6kWKmCCUGk6DqKfM': return <VenueTTK />
            case '8x7UFtmckFjIuWUA4oaj': return <VenueTTK />
            case 'Gsj5h6LfHMqWKbbWDdeh': return <VenueTTK />
            case 'WgPT5AjEU6y3lnpxxkIq': return <VenueTTK />
            case '8EaQ32WZPPKQHhCb0rHa': return <PhotographyTTK />
            case 'REgfHYF9tUNeip9MoIiJ': return <BridalmakeupTTK />
            default: return <Skeleton />
        }
    }
    const [showAll, setShowAll] = useState(false);

    const showMore = () => setShowAll(true);
    const showLess = () => setShowAll(false);
    const LongText = ({ content, limit }) => {
        const [showAll, setShowAll] = useState(false);

        const showMore = () => setShowAll(true);
        const showLess = () => setShowAll(false);

        if (content?.length <= limit) {
            // there is nothing more to show
            return <div>{content}</div>
        }
        if (showAll) {
            // We show the extended text and a link to reduce it
            return <div>
                {content}
                <b onClick={showLess} style={{ cursor: 'pointer' }}>Read less</b>
            </div>
        }
        // In the final case, we show a text with ellipsis and a `Read more` button
        const toShow = content?.substring(0, limit) + "...";
        return <div>
            {toShow}
            <b onClick={showMore} style={{ cursor: 'pointer' }}>Read more</b>
        </div>
    }
    return (
        <div className="page-wrapper">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className='card-header bg-white'>
                                <h3>Profile</h3>
                                {/* <div style={{ height: '150px', width: '150px' }}>
                                    <Circle percent={90} strokeWidth={4} strokeColor="skyblue" />
                                </div> */}
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
                                                                <div style={{ position: 'relative' }}>
                                                                    {loading ? <Skeleton style={{ height: '200px', width: '200px', borderRadius: '50%', }} /> : (
                                                                        <img src={merchant.profilePicture?.image || avatar} className='profile_picture' />
                                                                    )
                                                                    }

                                                                    {edit && (
                                                                        <form>
                                                                            <input type="file" id="custom_input" hidden onChange={imgUploader} />
                                                                            <label for="custom_input" className='custum__upload__btn'>
                                                                                Change Profile Picture &nbsp;
                                                                                <i className='fa fa-camera' />

                                                                            </label>
                                                                        </form>
                                                                    )}


                                                                    {
                                                                        !imgUrl && progresspercent ?
                                                                            <div className="progress bg-white">
                                                                                <div className="progress-bar progress-bar-striped bg-success" role="progressbar" style={{ width: `${progresspercent}%` }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{progresspercent} %</div>
                                                                            </div>
                                                                            : ''
                                                                    }
                                                                </div>



                                                            </div>
                                                            <div className='col-md-9'>
                                                                {loading ? <Skeleton count={1} /> : <h1 style={{ fontWeight: 'bold', color: '#41B0FA' }}>{merchant?.business_name}</h1>}

                                                                <div className='row my-3'>
                                                                    <div className='col-md-12'>
                                                                        <p style={{ marginBottom: '-5px', fontWeight: 'bold', fontSize: '22px' }}>Business Category</p>
                                                                    </div>
                                                                    <div className='row mt-2'>
                                                                        <div className='col-md-6'>
                                                                            <div className='form-group'>

                                                                                <select className='form-control' disabled>
                                                                                    <option>Select Category</option>
                                                                                    {
                                                                                        category.map((item, index) => {
                                                                                            return (
                                                                                                <option value={item.id} selected={(item.id === merchant.serviceId)} key={index} >{item.cat_name}</option>
                                                                                            )
                                                                                        })
                                                                                    }
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                        <div className='col-md-6'>
                                                                            <div className='form-group'>
                                                                                <select className='form-control' disabled>
                                                                                    <option>Select Sub Category</option>
                                                                                    {
                                                                                        subCategory.map((item, index) => {
                                                                                            return (
                                                                                                <option value={item.id} selected={(item.id === merchant.sub_cat_id)} key={index}>{item.sub_cat_name}</option>
                                                                                            )
                                                                                        })
                                                                                    }
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                        {/* <div className='col-md-4'>
                                                                            <button className='btn btn-primary'>Submit</button>
                                                                        </div> */}
                                                                    </div>
                                                                </div>
                                                                <p style={{ marginBottom: '-5px', fontWeight: 'bold', fontSize: '22px' }}>About Us</p>
                                                                {loading ? <Skeleton count={5} /> : (
                                                                    <p style={{ textAlign: 'justify', border: '2px solid #41B0FA', padding: '8px', borderRadius: '10px', color: 'rgba(0,0,0,0.5)' }}>

                                                                        <LongText content={data.introduction} limit={200} />
                                                                    </p>
                                                                )
                                                                }

                                                            </div>
                                                        </div>
                                                        <div className='row'>
                                                            <div className='col-md-12'>
                                                                <div className='d-flex justify-content-between'>
                                                                    <h3>Complete Your Business Profile</h3>
                                                                </div>
                                                                {
                                                                    merchant.vendorProfile &&
                                                                    (
                                                                        <>
                                                                            <div className='table-responsive'>
                                                                                <table className='table text-center ttk_preview' cellPadding={0} cellSpacing={0} style={{ border: '1px solid #fff ' }}>
                                                                                    <tr style={{ color: '#41B0FA' }}>
                                                                                        <th>Country</th>
                                                                                        <th>State</th>
                                                                                        <th>City</th>
                                                                                        <th>Pincode</th>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>
                                                                                            {
                                                                                                country?.filter((pre) => pre.id === data.country_id).map((item, index) => {
                                                                                                    return (
                                                                                                        <>{item.name}</>
                                                                                                    )
                                                                                                })
                                                                                            }
                                                                                        </td>
                                                                                        <td>
                                                                                            {
                                                                                                state?.filter((pre) => pre.id === data.state_id).map((item, index) => {
                                                                                                    return (
                                                                                                        <>{item.name}</>
                                                                                                    )
                                                                                                })
                                                                                            }
                                                                                        </td>
                                                                                        <td>
                                                                                            {
                                                                                                city?.filter((pre) => pre.id === data.city_id).map((item, index) => {
                                                                                                    return (
                                                                                                        <>{item.city}</>
                                                                                                    )
                                                                                                })
                                                                                            }
                                                                                        </td>
                                                                                        <td>{merchant.vendorProfile?.pincode}</td>
                                                                                    </tr>
                                                                                    <tr style={{ color: '#41B0FA' }}>
                                                                                        <th>Locality</th>
                                                                                        <th>Street</th>
                                                                                        <th>Landmark</th>
                                                                                        <th>Email Address</th>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>
                                                                                            {
                                                                                                locality?.filter((pre) => pre.id === data.locality_id).map((item, index) => {
                                                                                                    return (
                                                                                                        <>{item.name}</>
                                                                                                    )
                                                                                                })
                                                                                            }
                                                                                        </td>
                                                                                        <td>{merchant.vendorProfile?.street}</td>
                                                                                        <td>{merchant.vendorProfile?.landmark}</td>
                                                                                        <td>{merchant.vendorProfile?.email}</td>
                                                                                    </tr>
                                                                                    <tr style={{ color: '#41B0FA' }}>
                                                                                        <th>Mobile Number</th>
                                                                                        <th>GST Number</th>
                                                                                        <th>Working since</th>
                                                                                        <th>Contact Person Name</th>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>{merchant.vendorProfile?.mobno}</td>
                                                                                        <td>{merchant.vendorProfile?.gst}</td>
                                                                                        <td>{merchant.vendorProfile?.workingSince}</td>
                                                                                        <td>{merchant.vendorProfile?.contactPersonName}</td>
                                                                                    </tr>
                                                                                    <tr style={{ color: '#41B0FA' }}>
                                                                                        <th>Facebook Link</th>
                                                                                        <th>Instagram Link</th>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>{merchant.vendorProfile?.fb}</td>
                                                                                        <td>{merchant.vendorProfile?.insta}</td>
                                                                                    </tr>
                                                                                </table>
                                                                            </div>
                                                                        </>
                                                                    )
                                                                }
                                                                <center><button className='btn btn-primary btn-sm' onClick={() => setEdit(!edit)}><i className='fa fa-edit' ></i>{`${merchant.vendorProfile ? 'Update Basic Details' : 'Complete Your Profile'}`}</button></center>
                                                                {
                                                                    edit && (
                                                                        <form className='py-3'>
                                                                            <div className='row'>
                                                                                <div className='form-group col-md-6 mb-3'>
                                                                                    <label style={{ color: '#41B0FA' }}>Country<span className='text-danger'>*</span></label>
                                                                                    <select className={`form-control ${!edit ? 'blur_input' : ''}`} name="country_id" onChange={formHandler} disabled={!edit ? true : false}>
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
                                                                                    <select className={`form-control ${!edit ? 'blur_input' : ''}`} name="state_id" onChange={formHandler} disabled={!edit ? true : false}>
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
                                                                                    <select className={`form-control ${!edit ? 'blur_input' : ''}`} name="city_id" onChange={formHandler} disabled={!edit ? true : false}>
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
                                                                                    <input type="text" name="pincode" placeholder="Enter Pincode" value={data.pincode} onChange={formHandler} className={`form-control ${!edit ? 'blur_input' : ''}`} disabled={!edit ? true : false} />
                                                                                </div>
                                                                            </div>
                                                                            <div className='row'>
                                                                                <div className='form-group col-md-6 mb-3'>
                                                                                    <label style={{ color: '#41B0FA' }}>Locality<span className='text-danger'>*</span></label>
                                                                                    <select className={`form-control ${!edit ? 'blur_input' : ''}`} name="locality_id" onChange={formHandler} disabled={!edit ? true : false} >
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
                                                                                    <input type="text" name="street" placeholder="Street Address" className={`form-control ${!edit ? 'blur_input' : ''}`} value={data.street} onChange={formHandler} disabled={!edit ? true : false} />
                                                                                </div>
                                                                            </div>
                                                                            <div className='row'>
                                                                                <div className='form-group col-md-6 mb-3'>
                                                                                    <label style={{ color: '#41B0FA' }}>Landmark</label>
                                                                                    <input type="text" name="landmark" placeholder="Enter Landmark" value={data.landmark
                                                                                    } onChange={formHandler} className={`form-control ${!edit ? 'blur_input' : ''}`} disabled={!edit ? true : false} />
                                                                                </div>
                                                                                <div className='form-group col-md-6 mb-3'>
                                                                                    <label style={{ color: '#41B0FA' }}>Email Address<span className='text-danger'>*</span></label>
                                                                                    <input type="text" name="email" className={`form-control ${!edit ? 'blur_input' : ''}`} value={data.email} onChange={formHandler} placeholder='Email Address' disabled={!edit ? true : false} />
                                                                                </div>
                                                                            </div>
                                                                            <div className='row'>
                                                                                <div className='form-group col-md-6 mb-3'>
                                                                                    <label style={{ color: '#41B0FA' }}>Mobile Number<span className='text-danger'>*</span></label>
                                                                                    <input type="text" name="mobno" placeholder="Mobile Number" value={data.mobno} onChange={formHandler} className={`form-control ${!edit ? 'blur_input' : ''}`} disabled={!edit ? true : false} />
                                                                                </div>
                                                                                <div className='form-group col-md-6 mb-3'>
                                                                                    <label style={{ color: '#41B0FA' }}>GST Number</label>
                                                                                    <input type="text" name="gst" placeholder="GST Number" value={data.gst} onChange={formHandler} className={`form-control ${!edit ? 'blur_input' : ''}`} disabled={!edit ? true : false} />
                                                                                </div>
                                                                            </div>
                                                                            <div className='row'>
                                                                                <div className='form-group col-md-6 mb-3'>
                                                                                    <label style={{ color: '#41B0FA' }}>Working since<span className='text-danger'>*</span></label>
                                                                                    <input type="text" name="workingSince" value={data.workingSince} onChange={formHandler} placeholder="Working since" className={`form-control ${!edit ? 'blur_input' : ''}`} disabled={!edit ? true : false} />
                                                                                </div>
                                                                                <div className='form-group col-md-6 mb-3'>
                                                                                    <label style={{ color: '#41B0FA' }}>Contact Person Name</label>
                                                                                    <input type="text" name="contactPersonName" value={data.contactPersonName} onChange={formHandler} placeholder="Contact Person Name" className={`form-control ${!edit ? 'blur_input' : ''}`} disabled={!edit ? true : false} />
                                                                                </div>
                                                                            </div>
                                                                            <div className='row'>
                                                                                <div className='form-group col-md-6 mb-3'>
                                                                                    <label style={{ color: '#41B0FA' }}>Facebook Link</label>
                                                                                    <input type="text" name="fb" value={data.fb} onChange={formHandler} placeholder="Facebook Link" className={`form-control ${!edit ? 'blur_input' : ''}`} disabled={!edit ? true : false} />
                                                                                </div>
                                                                                <div className='form-group col-md-6 mb-3'>
                                                                                    <label style={{ color: '#41B0FA' }}>Instagram Link</label>
                                                                                    <input type="text" name="insta" value={data.insta} onChange={formHandler} placeholder="Instagram Link" className={`form-control ${!edit ? 'blur_input' : ''}`} disabled={!edit ? true : false} />
                                                                                </div>
                                                                            </div>
                                                                            <div className='form-group'>
                                                                                <label style={{ color: '#41B0FA' }}>Business Introduction</label>
                                                                                <textarea className={`form-control ${!edit ? 'blur_input' : ''}`} name="introduction" onChange={formHandler} placeholder='Introduction' value={data.introduction} disabled={!edit ? true : false} />
                                                                            </div>
                                                                            <div className='form-group text-center'>
                                                                                <button className='btn btn-primary' onClick={btnHandler} disabled={!edit}>Submit</button>
                                                                            </div>

                                                                        </form>
                                                                    )
                                                                }


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
                <div className='row' >

                    <div className='card'>
                        <div className='card-header bg-primary text-white'>
                            Previous Work Image
                        </div>
                        <div className='card-body'>
                            <div className='row'>
                                {loading && (
                                    <>
                                        <div className='col-md-2 col-4'>
                                            <Skeleton count={1} style={{ height: '100px', width: '100px', borderRadius: '10px', margin: '1px' }} />
                                        </div>
                                        <div className='col-md-2 col-4'>
                                            <Skeleton count={1} style={{ height: '100px', width: '100px', borderRadius: '10px', margin: '1px' }} />
                                        </div>
                                        <div className='col-md-2 col-4'>
                                            <Skeleton count={1} style={{ height: '100px', width: '100px', borderRadius: '10px', margin: '1px' }} />
                                        </div>
                                        <div className='col-md-2 col-4'>
                                            <Skeleton count={1} style={{ height: '100px', width: '100px', borderRadius: '10px', margin: '1px' }} />
                                        </div>

                                    </>

                                )
                                }
                                {
                                    merchant?.PreviousWork?.slice(0, 4).reverse(merchant.PreviousWork).map((item, i) => {
                                        return (
                                            <div className='col-md-2 col-6'>
                                                <img src={item} style={{ height: '100px', width: '100px', borderRadius: '10px', border: '2px solid rgba(0,0,0,0.3)', margin: '1px' }} className='img__style' key={i} />
                                            </div>
                                        )
                                    })
                                }
                                <div className='col-md-2 col-6'>

                                    <input type="file" id="previous_input" hidden onChange={previousUploader} />
                                    <label for="previous_input" className=''>
                                        <div style={{ height: '100px', width: '100px', borderRadius: '10px', border: '2px solid rgba(0,0,0,0.3)', margin: '1px', display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', color: '#000' }}>
                                            <i className='fa fa-plus' style={{ fontSize: '22px' }}></i>
                                            Add More
                                        </div>
                                    </label>
                                </div>
                                <div className='col-md-2 col-6'>
                                    <Link to="/dashboard/previous-work-list" style={{ textDecoration: 'none' }}>
                                        <div style={{ height: '100px', width: '100px', borderRadius: '10px', border: '2px solid rgba(0,0,0,0.3)', margin: '1px', display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', color: '#000' }}>
                                            <i className='fa fa-search' style={{ fontSize: '22px' }}></i>
                                            View All
                                        </div>
                                    </Link>
                                </div>



                            </div>

                            <div className='row'>
                                {
                                    !previousImgUrl && previousImgProgress ?
                                        <div className="progress bg-white">
                                            <div className="progress-bar progress-bar-striped bg-success" role="progressbar" style={{ width: `${previousImgProgress}%` }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{progresspercent} %</div>
                                        </div>
                                        : ''
                                }
                            </div>
                        </div>
                    </div>





                </div>

                <div className='row'>
                    <>
                        {thingsToKnowFinder}
                    </>
                </div>

            </div>
            <ToastContainer />
        </div >
    )
}

export default Profile