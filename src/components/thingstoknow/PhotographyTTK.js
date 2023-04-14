import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { doc, setDoc, getDoc, collection, getDocs } from 'firebase/firestore';
import init from '../../firebase'
import { useUserAuth } from '../../context/UserAuthContext';
import Select from 'react-select'
import { checkboxData } from './checkboxData';
import './style.css'
const PhotographyTTK = () => {
    const [ttkEditMode, setTtkEditMode] = useState(false)
    const { user } = useUserAuth();
    const merchant_id = user.uid;
    const [merchant, setMerchant] = useState({});
    const [thingsToKnow, setThinksToKnow] = useState([])
    const getSingleDocumentHandler = async () => {
        try {
            const res = await getDoc(doc(init.db, "merchants", merchant_id));
            setMerchant(res.data());
            setThinksToKnow(res.data().thingsToKnow)
        } catch (error) {
            console.log(`Error : ${error}`)
        }
    }
    useEffect(() => {
        getSingleDocumentHandler()
    }, [merchant_id])
    const [workingSince, setWorkingSince] = useState([])
    const [travelPrefer, setTravelPrefer] = useState([])
    const [serviceOffer, setServiceOffer] = useState([])
    const [areaOfWork, setAreaOfWork] = useState([])
    const [deliveryDate, setDeliveryDate] = useState([])
    const [data, setData] = useState({
        canditPrice: '',
        cinematicPrice: '',
        albumPrice: '',
        videographyPrice: '',
        budgetPhotoPrice: '',
        budgetVideoPrice: '',
        mostBookedPackage: '',
        smallFunctionPhotoPrice: '',
        studioPhotoPrice: '',
        noOfEmployee: '',
    })
    const formHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData({ ...data, [name]: value })
        console.log(data)
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        const { canditPrice, cinematicPrice, albumPrice, videographyPrice, budgetPhotoPrice, budgetVideoPrice, mostBookedPackage, smallFunctionPhotoPrice, studioPhotoPrice, noOfEmployee } = data;
        if (canditPrice !== '' && cinematicPrice !== '' && albumPrice !== '' &&
            videographyPrice !== '' && budgetPhotoPrice !== '' && budgetVideoPrice !== '' && mostBookedPackage !== '' && smallFunctionPhotoPrice !== '' && studioPhotoPrice !== '' && noOfEmployee !== '') {
            try {
                await setDoc(doc(init.db, "merchants", merchant_id), {
                    ...merchant,
                    thingsToKnow: {
                        canditPrice,
                        cinematicPrice,
                        albumPrice,
                        videographyPrice,
                        budgetPhotoPrice,
                        budgetVideoPrice,
                        mostBookedPackage,
                        smallFunctionPhotoPrice,
                        studioPhotoPrice,
                        noOfEmployee,
                        workingSince,
                        travelPrefer,
                        serviceOffer,
                        areaOfWork,
                        deliveryDate
                    }
                }, { merge: true });
                toast.success('Data updated successfully.')
                getSingleDocumentHandler()
                setData({
                    canditPrice: '',
                    cinematicPrice: '',
                    albumPrice: '',
                    videographyPrice: '',
                    budgetPhotoPrice: '',
                    budgetVideoPrice: '',
                    mostBookedPackage: '',
                    smallFunctionPhotoPrice: '',
                    studioPhotoPrice: '',
                    noOfEmployee: '',
                });
                getSingleDocumentHandler()
            } catch (err) {
                console.log(`Error ${err}`)
            }
        } else {
            toast.error('Please fill all the mandetary field')
        }
    }
    const workingSinceHandler = (e) => {
        setWorkingSince(e)
    }
    const travelPreferHandler = (e) => {
        setTravelPrefer(e)
    }
    const serviceOfferHandler = (e) => {
        setServiceOffer(e)
    }
    const areaOffWorkingHandler = (e) => {
        setAreaOfWork(e)
    }
    const deleveryDateHandler = (e) => {
        setDeliveryDate(e)
    }
    const workingSinceOption = checkboxData.workSinceOption;
    const travelPreferenceOption = checkboxData.travelPreference
    const serviceOfferedOption = checkboxData.serviceOffered
    const areaOfWorkingOption = checkboxData.areaOfWorking
    const deleryDateOption = checkboxData.deliveryDate


    return (
        <div className='col-md-12'>
            <div className='card'>
                <div className='card-header bg-primary text-white'>
                    Things to Know
                </div>
                <div className='card-body'>
                    {
                        merchant.thingsToKnow && (
                            <>
                                <div className='table-responsive'>
                                    <table className='table text-center' cellPadding={0} cellSpacing={0} style={{ border: '1px solid #fff ' }}>
                                        <tbody className='ttk_preview'>
                                            <tr style={{ color: '#41B0FA' }}>
                                                <th style={{ width: '25%' }}>Working Since</th>
                                                <th style={{ width: '25%' }}>Candid Photography price</th>
                                                <th style={{ width: '25%' }}>Cinematic Photography price</th>
                                                <th style={{ width: '25%' }}>Albums price </th>
                                            </tr>
                                            <tr>
                                                <td>{
                                                    merchant.thingsToKnow.workingSince?.map((item, index) => {
                                                        return <p key={index}>{item.value}</p>
                                                    })
                                                }</td>
                                                <td>&#8377; {merchant.thingsToKnow.canditPrice}</td>
                                                <td>&#8377; {merchant.thingsToKnow.cinematicPrice}</td>
                                                <td>&#8377; {merchant.thingsToKnow.albumPrice}</td>
                                            </tr>
                                            <tr style={{ color: '#41B0FA' }}>
                                                <th>Traditional Videography price</th>
                                                <th>Travel Preference</th>
                                                <th>Service Offered</th>
                                                <th>Budget (Photo Package) price </th>
                                            </tr>
                                            <tr>
                                                <td>&#8377; {merchant.thingsToKnow.videographyPrice}</td>
                                                <td>{
                                                    merchant.thingsToKnow.travelPrefer
                                                        ?.map((item, index) => {
                                                            return <>
                                                                <i className='fa fa-check text-success' />
                                                                <span key={index}>{item.value} </span>
                                                            </>
                                                        })
                                                }</td>
                                                <td>{
                                                    merchant.thingsToKnow.serviceOffer
                                                        ?.map((item, index) => {
                                                            return (
                                                                <>
                                                                    <i className='fa fa-check text-success' />
                                                                    <span key={index}>{item.value} </span>
                                                                </>
                                                            )
                                                        })
                                                }</td>
                                                <td>&#8377; {merchant.thingsToKnow.budgetPhotoPrice}</td>
                                            </tr>
                                            <tr style={{ color: '#41B0FA' }}>
                                                <th>Budget (Photo & Video) price</th>
                                                <th>Most Booked Package</th>
                                                <th>Delivery Time</th>
                                                <th>Area of working </th>
                                            </tr>
                                            <tr>
                                                <td>{merchant.thingsToKnow.budgetVideoPrice}</td>
                                                <td>&#8377; {merchant.thingsToKnow.mostBookedPackage}</td>
                                                <td>{
                                                    merchant.thingsToKnow.deliveryDate

                                                        ?.map((item, index) => {
                                                            return (
                                                                <>
                                                                    <i className='fa fa-check text-success' />
                                                                    <span key={index}>{item.value} </span>
                                                                </>
                                                            )
                                                        })
                                                }</td>

                                                <td>{
                                                    merchant.thingsToKnow.areaOfWork
                                                        ?.map((item, index) => {
                                                            return (
                                                                <>
                                                                    <i className='fa fa-check text-success' />
                                                                    <span key={index}>{item.value} </span>
                                                                </>
                                                            )
                                                        })
                                                }</td>
                                                <td>{
                                                    merchant.thingsToKnow.alcoholPolicy
                                                        ?.map((item, index) => {
                                                            return (
                                                                <>
                                                                    <i className='fa fa-check text-success' />
                                                                    <span key={index}>{item.value} </span>
                                                                </>
                                                            )
                                                        })
                                                }</td>
                                            </tr>
                                            <tr style={{ color: '#41B0FA' }}>
                                                <th>Studio Photography price</th>
                                                <th>No. of employees</th>
                                            </tr>
                                            <tr>
                                                <td>&#8377; {merchant.thingsToKnow.studioPhotoPrice}</td>
                                                <td> {merchant.thingsToKnow.noOfEmployee}</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </div>
                            </>
                        )
                    }
                    <center >
                        <button className='btn btn-primary mb-2' onClick={() => setTtkEditMode(!ttkEditMode)}>{`${merchant.thingsToKnow ? 'Make Changes' : 'Tell me more about yourself'}`}</button>
                    </center>
                    {
                        ttkEditMode && (
                            <form>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <div className='form-group'>
                                            <label>Working Since <span className='text-danger'>*</span></label>
                                            <Select
                                                closeMenuOnSelect={false}
                                                defaultValue={thingsToKnow.workingSince}
                                                isMulti
                                                options={workingSinceOption}
                                                selected
                                                onChange={workingSinceHandler}
                                            />
                                        </div>

                                    </div>

                                    <div className='col-md-6'>
                                        <div className='form-group'>
                                            <label>Candit Photography price</label>
                                            <input type='number' placeholder='Candit Photography price' className='form-control' name="canditPrice" value={data.canditPrice || thingsToKnow.canditPrice} onChange={formHandler} />
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='form-group'>
                                            <label>Cinematic Photography price</label>
                                            <input type='number' placeholder='Cinematic Photography price' className='form-control' name="cinematicPrice" value={data.cinematicPrice || thingsToKnow.cinematicPrice} onChange={formHandler} />
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='form-group'>
                                            <label>Albums price</label>
                                            <input type='number' placeholder='Albums price' className='form-control' name="albumPrice" value={data.albumPrice || thingsToKnow.albumPrice} onChange={formHandler} />
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='form-group'>
                                            <label>Traditional Videography price</label>
                                            <input type='number' placeholder='Traditional Videography price' className='form-control' name="videographyPrice" value={data.videographyPrice || thingsToKnow.videographyPrice} onChange={formHandler} />
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='form-group'>
                                            <label>Travel Preference</label>
                                            <Select
                                                closeMenuOnSelect={false}
                                                defaultValue={thingsToKnow.travelPrefer}
                                                isMulti
                                                options={travelPreferenceOption}
                                                selected
                                                onChange={travelPreferHandler}
                                            />
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='form-group'>
                                            <label>Service Offered</label>
                                            <Select
                                                closeMenuOnSelect={false}
                                                defaultValue={thingsToKnow.serviceOffer}
                                                isMulti
                                                options={serviceOfferedOption}
                                                selected
                                                onChange={serviceOfferHandler}
                                            />
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='form-group'>
                                            <label>Budget (Photo Package) price</label>
                                            <input type='number' placeholder='Budget (Photo Package)' className='form-control' name="budgetPhotoPrice" value={data.budgetPrice || thingsToKnow.budgetPrice} onChange={formHandler} />
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='form-group'>
                                            <label>Budget (Photo & Video) price</label>
                                            <input type='number' placeholder='Budget (Photo & Video)' className='form-control' name="budgetVideoPrice" value={data.budgetVideoPrice || thingsToKnow.budgetPhotoPrice} onChange={formHandler} />
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='form-group'>
                                            <label>Most Booked Package</label>
                                            <input type='number' placeholder='Most Booked Package' className='form-control' name=
                                                "mostBookedPackage" value={data.mostBookedPackage || thingsToKnow.mostBookedPackage} onChange={formHandler} />
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='form-group'>
                                            <label>Delivery Time</label>
                                            <Select
                                                closeMenuOnSelect={false}
                                                defaultValue={thingsToKnow.deliveryDate}
                                                isMulti
                                                options={deleryDateOption}
                                                selected
                                                onChange={deleveryDateHandler}
                                            />
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='form-group'>
                                            <label>Small function photography price (Photo & Video)</label>
                                            <input type='number' placeholder='Small function photography price (Photo & Video)' className='form-control' name=
                                                "smallFunctionPhotoPrice" value={data.smallFunctionPhotoPrice || thingsToKnow.smallFunctionPhotoPrice} onChange={formHandler} />
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='form-group'>
                                            <label>Area of working </label>
                                            <Select
                                                closeMenuOnSelect={false}
                                                defaultValue={thingsToKnow.areaOfWork}
                                                isMulti
                                                options={areaOfWorkingOption}
                                                selected
                                                onChange={areaOffWorkingHandler}
                                            />
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='form-group'>
                                            <label>Studio Photography price</label>
                                            <input type='number' placeholder='Studio Photography' className='form-control' name=
                                                "studioPhotoPrice" value={data.studioPhotoPrice || thingsToKnow.studioPhotoPrice} onChange={formHandler} />
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='form-group'>
                                            <label>No. of employees</label>
                                            <input type='number' placeholder='No. of employees' className='form-control' name=
                                                "noOfEmployee" value={data.noOfEmployee || thingsToKnow.noOfEmployee} onChange={formHandler} />
                                        </div>
                                    </div>
                                </div>
                                <div className='form-group text-center'>
                                    <button className='btn btn-primary' onClick={submitHandler}>Submit</button>
                                </div>
                            </form>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
export default PhotographyTTK