import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { doc, setDoc, getDoc, collection, getDocs } from 'firebase/firestore';
import init from '../../firebase'
import { useUserAuth } from '../../context/UserAuthContext';
import Select from 'react-select'
import { checkboxData } from './checkboxData';
import './style.css'
const VenueTTK = () => {
    const serviceOptions = checkboxData.photographyServiceOfferOption;
    const djPolicyOption = checkboxData.djPolicyOption;
    const decorPolicyOption = checkboxData.decorPolicyOption;
    const cateringPolicyOption = checkboxData.caterPolicyOptions;
    const alcoholPolicyOption = checkboxData.alcoholPolicyOption;
    const workingSinceOption = checkboxData.workSinceOption;
    const spaceOption = checkboxData.spaceOption;
    const smallPartiesOption = checkboxData.smallPartyOption;
    const parkingOption = checkboxData.parkingOption
    const { user } = useUserAuth();
    const merchant_id = user.uid;
    const [merchant, setMerchant] = useState({});
    const [data, setData] = useState({
        parkingSize: '',
        vegPrice: '',
        nonVegPrice: '',
        roomCount: '',
        avgRoomPrice: '',
    })


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
    const formHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData({ ...data, [name]: value })
    }
    const btnHandler = async (e) => {
        e.preventDefault();
        const { parkingSize, vegPrice, nonVegPrice, roomCount, avgRoomPrice } = data;
        if (parkingSize !== '' && vegPrice !== '' && nonVegPrice !== '' && roomCount !== '' && avgRoomPrice !== '') {
            try {
                await setDoc(doc(init.db, "merchants", merchant_id), {
                    ...merchant,
                    thingsToKnow: {
                        parkingSize,
                        vegPrice,
                        nonVegPrice,
                        roomCount,
                        avgRoomPrice,
                        workingSince,
                        parking,
                        smallPartiesVenue,
                        space,
                        catering,
                        decorPolicy,
                        alcoholPolicy
                    }
                }, { merge: true });
                toast.success('Data updated successfully.')
                getSingleDocumentHandler()
                setData({
                    parkingSize: '',
                    vegPrice: '',
                    nonVegPrice: '',
                    roomCount: '',
                    avgRoomPrice: '',
                });
            } catch (err) {
                console.log(`Error ${err}`)
            }
        } else {
            toast.error('Please fill all the mandetary field')
        }
    }
    const [workingSince, setWorkingSince] = useState([])
    const [parking, setParking] = useState([])
    const [smallPartiesVenue, setSmallPartiesVenue] = useState([])
    const [space, setSpace] = useState([])
    const [catering, setCatering] = useState([])
    const [decorPolicy, setDecorPolicy] = useState([])
    const [alcoholPolicy, setAlcoholPolicy] = useState([])
    const [djPoicy, setDjPolicy] = useState([])
    const workingSinceHandler = (e) => {
        setWorkingSince(e)
    }
    const parkingHandler = (e) => {
        setParking(e)
    }
    const smallPartiesVenueHandler = (e) => {
        setSmallPartiesVenue(e)
    }
    const spaceHandler = (e) => {
        setSpace(e)
    }
    const cateringHandler = (e) => {
        setCatering(e)
    }
    const decorHandler = (e) => {
        setDecorPolicy(e)
    }
    const alcoholPolicyHandler = (e) => {
        setAlcoholPolicy(e)
    }
    const djPolicyHandler = (e) => {
        setDjPolicy(e)
    }
    const [ttkEditMode, setTtkEditMode] = useState(false)
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
                                                <th style={{ width: '25%' }}>Parking</th>
                                                <th style={{ width: '25%' }}>Parking Space</th>
                                                <th style={{ width: '25%' }}>Veg Price </th>
                                            </tr>
                                            <tr>
                                                <td>{
                                                    merchant.thingsToKnow.workingSince?.map((item, index) => {
                                                        return <p key={index}>{item.value}</p>
                                                    })
                                                }</td>
                                                <td>{
                                                    merchant.thingsToKnow.parking?.map((item, index) => {
                                                        return <p key={index}>{item.value}</p>
                                                    })
                                                }</td>
                                                <td>{merchant.thingsToKnow.parkingSize}</td>
                                                <td>&#8377;{merchant.thingsToKnow.vegPrice}
                                                    <small className='text-success' style={{
                                                        fontWeight: 'bold'
                                                    }}> Per Plate</small>
                                                </td>
                                            </tr>
                                            <tr style={{ color: '#41B0FA' }}>
                                                <th>Non Veg Price</th>
                                                <th>Small Party Venue</th>
                                                <th>Space</th>
                                                <th>Room Counts </th>
                                            </tr>
                                            <tr>
                                                <td>&#8377; {merchant.thingsToKnow.nonVegPrice}
                                                    <small className='text-success' style={{
                                                        fontWeight: 'bold'
                                                    }}> Per Plate</small>
                                                </td>
                                                <td>{
                                                    merchant.thingsToKnow.smallPartiesVenue
                                                        ?.map((item, index) => {
                                                            return <p key={index}>{item.value}</p>
                                                        })
                                                }</td>
                                                <td>{
                                                    merchant.thingsToKnow.space
                                                        ?.map((item, index) => {
                                                            return (
                                                                <>
                                                                    <i className='fa fa-check text-success' />
                                                                    <span key={index}>{item.value} </span>
                                                                </>
                                                            )
                                                        })
                                                }</td>
                                                <td>{merchant.thingsToKnow.roomCount}</td>
                                            </tr>
                                            <tr style={{ color: '#41B0FA' }}>
                                                <th>Avg Room Price</th>
                                                <th>Catering Policy</th>
                                                <th>Decor Policy</th>
                                                <th>Alcohol Policy </th>
                                            </tr>
                                            <tr>
                                                <td>{merchant.thingsToKnow.nonVegPrice}</td>
                                                <td>{
                                                    merchant.thingsToKnow.catering

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
                                                    merchant.thingsToKnow.decorPolicy
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
                            <form onSubmit={btnHandler}>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <div className='form-group'>
                                            <label>Working Since <span className='text-danger'>*</span></label>
                                            <Select
                                                closeMenuOnSelect={false}
                                                isMulti
                                                options={workingSinceOption}
                                                selected
                                                onChange={workingSinceHandler}
                                            />
                                        </div>

                                    </div>
                                    <div className='col-md-6'>
                                        <div className='form-group'>
                                            <label>Parking <span className='text-danger'>*</span></label>
                                            <Select
                                                closeMenuOnSelect={false}
                                                isMulti
                                                options={parkingOption}
                                                selected
                                                onChange={parkingHandler}
                                            />
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='form-group'>
                                            <label>How many cars can be parked at your venue? <span className='text-danger'>*</span></label>
                                            <input type='number' placeholder='How many cars can be parked at your venue?' name="parkingSize" value={data.parkingSize} onChange={formHandler} className='form-control' />
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='form-group'>
                                            <label>Veg Price Per Plate<span className='text-danger'>*</span></label>
                                            <input type='number' placeholder='Veg Price Per Plate' name="vegPrice" value={data.vegPrice} onChange={formHandler} className='form-control' />
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='form-group'>
                                            <label>Non Veg Price Per Plate<span className='text-danger'>*</span></label>
                                            <input type='number' placeholder='Non Veg Price Per Plate' name="nonVegPrice" value={data.nonVegPrice} onChange={formHandler} className='form-control' />
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='form-group'>
                                            <label>Small Party Venue <span className='text-danger'>*</span></label>
                                            <Select
                                                closeMenuOnSelect={false}
                                                isMulti
                                                options={smallPartiesOption}
                                                selected
                                                onChange={smallPartiesVenueHandler}
                                            />

                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='form-group'>
                                            <label>Space <span className='text-danger'>*</span></label>
                                            <Select
                                                closeMenuOnSelect={false}
                                                isMulti
                                                options={spaceOption}
                                                selected
                                                onChange={spaceHandler}
                                            />
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='form-group'>
                                            <label>Room Count <span className='text-danger'>*</span></label>
                                            <input type='number' placeholder='Room Count' name="roomCount" value={data.roomCount} onChange={formHandler} className='form-control' />
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='form-group'>
                                            <label>Average Room Price <span className='text-danger'>*</span></label>
                                            <input type='number' placeholder='Average Room Price' name="avgRoomPrice" value={data.avgRoomPrice || merchant.thingsToKnow?.avgRoomPrice} onChange={formHandler} className='form-control' />
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='form-group'>
                                            <label>Catering Policy <span className='text-danger'>*</span></label>

                                            <Select
                                                closeMenuOnSelect={false}
                                                isMulti
                                                options={cateringPolicyOption}
                                                selected
                                                onChange={cateringHandler}
                                            />
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='form-group'>
                                            <label>Decor Policy <span className='text-danger'>*</span></label>
                                            <Select
                                                closeMenuOnSelect={false}
                                                isMulti
                                                options={decorPolicyOption}
                                                selected
                                                onChange={decorHandler}
                                            />
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='form-group'>
                                            <label>Alcohol Policy <span className='text-danger'>*</span></label>
                                            <Select
                                                closeMenuOnSelect={false}
                                                isMulti
                                                options={alcoholPolicyOption}
                                                selected
                                                onChange={alcoholPolicyHandler}
                                            />

                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='form-group'>
                                            <label>DJ Policy <span className='text-danger'>*</span></label>
                                            <Select
                                                closeMenuOnSelect={true}
                                                isMulti
                                                options={djPolicyOption}
                                                selected
                                                onChange={djPolicyHandler}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='form-group text-center'>
                                    <button className='btn btn-primary' >{ttkEditMode ? 'Save Changes' : 'Submit'}</button>
                                </div>
                            </form>
                        )
                    }

                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default VenueTTK