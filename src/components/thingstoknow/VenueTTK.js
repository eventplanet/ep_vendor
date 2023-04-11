import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { doc, setDoc, getDoc, collection, getDocs } from 'firebase/firestore';
import init from '../../firebase'
import { useUserAuth } from '../../context/UserAuthContext';
const VenueTTK = () => {
    const { user } = useUserAuth();
    const merchant_id = user.uid;
    const [merchant, setMerchant] = useState({});
    const [data, setData] = useState({
        startOfVenue: '',
        parking: '',
        parkingSize: '',
        vegPrice: '',
        nonVegPrice: '',
        space: '',
        roomCount: '',
        smartPartyVenue: '',
        avgRoomPrice: '',
        cateringPolicy: '',
        decorPolicy: '',
        alcoholPolicy: '',
        djPolicy: ''
    })
    const getSingleDocumentHandler = async () => {
        try {
            const res = await getDoc(doc(init.db, "merchants", merchant_id));
            setMerchant(res.data());
            setData(res.data().thingsToKnow)
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
        const {
            startOfVenue,
            parking,
            parkingSize,
            vegPrice,
            nonVegPrice,
            space,
            roomCount,
            smartPartyVenue,
            avgRoomPrice,
            cateringPolicy,
            decorPolicy,
            alcoholPolicy,
            djPolicy } = data;
        if (startOfVenue != '' && parking != '' && parkingSize != '' && vegPrice != '' && nonVegPrice != '' && space != '' && roomCount != '' && smartPartyVenue != '' && avgRoomPrice != '' && cateringPolicy != '' && decorPolicy != '' && alcoholPolicy != '' && djPolicy != '') {
            try {
                await setDoc(doc(init.db, "merchants", merchant_id), {
                    ...merchant,
                    thingsToKnow: data
                }, { merge: true });
                toast.success('Data updated successfully.')
                getSingleDocumentHandler()
                setData({
                    startOfVenue: '',
                    parking: '',
                    parkingSize: '',
                    vegPrice: '',
                    nonVegPrice: '',
                    space: '',
                    roomCount: '',
                    smartPartyVenue: '',
                    avgRoomPrice: '',
                    cateringPolicy: '',
                    decorPolicy: '',
                    alcoholPolicy: '',
                    djPolicy: ''
                });
            } catch (err) {
                console.log(`Error ${err}`)
            }
        } else {
            toast.error('Please fill all the mandetary field')
        }
    }
    return (
        <div className='col-md-12'>
            <div className='card'>
                <div className='card-header bg-primary text-white'>
                    Things to Know
                </div>
                <div className='card-body'>
                    <form onSubmit={btnHandler}>
                        <div className='row'>
                            <div className='col-md-6'>
                                <div className='form-group'>
                                    <label>Start of Venue</label>
                                    <input type='text' placeholder='Start of Venue' name="startOfVenue" value={data.startOfVenue} onChange={formHandler} className='form-control' />
                                </div>

                            </div>
                            <div className='col-md-6'>
                                <div className='form-group'>
                                    <label>Parking</label>
                                    <input type='text' placeholder='Parking' name="parking" value={data.parking} onChange={formHandler} className='form-control' />
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className='form-group'>
                                    <label>How many cars can be parked at your venue?</label>
                                    <input type='text' placeholder='How many cars can be parked at your venue?' name="parkingSize" value={data.parkingSize} onChange={formHandler} className='form-control' />
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className='form-group'>
                                    <label>Veg Price</label>
                                    <input type='text' placeholder='Veg Price' name="vegPrice" value={data.vegPrice} onChange={formHandler} className='form-control' />
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className='form-group'>
                                    <label>Non Veg Price</label>
                                    <input type='text' placeholder='Non Veg Price' name="nonVegPrice" value={data.nonVegPrice} onChange={formHandler} className='form-control' />
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className='form-group'>
                                    <label>Smart Party Venue</label>
                                    <input type='text' placeholder='Smart Party Venue' name="smartPartyVenue" value={data.smartPartyVenue} onChange={formHandler} className='form-control' />
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className='form-group'>
                                    <label>Space</label>
                                    <input type='text' placeholder='Space' name="space" value={data.space} onChange={formHandler} className='form-control' />
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className='form-group'>
                                    <label>Room Count</label>
                                    <input type='text' placeholder='Room Count' name="roomCount" value={data.roomCount} onChange={formHandler} className='form-control' />
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className='form-group'>
                                    <label>Average Room Price</label>
                                    <input type='text' placeholder='Average Room Price' name="avgRoomPrice" value={data.avgRoomPrice} onChange={formHandler} className='form-control' />
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className='form-group'>
                                    <label>Catering Policy</label>
                                    <input type='text' placeholder='Catering Policy' name="cateringPolicy" value={data.cateringPolicy} onChange={formHandler} className='form-control' />
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className='form-group'>
                                    <label>Decor Policy</label>
                                    <input type='text' placeholder='Decor Policy' name="decorPolicy" value={data.decorPolicy} onChange={formHandler} className='form-control' />
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className='form-group'>
                                    <label>Alcohol Policy</label>
                                    <input type='text' placeholder='Alcohol Policy' name="alcoholPolicy" value={data.alcoholPolicy} onChange={formHandler} className='form-control' />
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className='form-group'>
                                    <label>DJ Policy</label>
                                    <input type='text' placeholder='DJ Policy' name="djPolicy" value={data.djPolicy} onChange={formHandler} className='form-control' />
                                </div>
                            </div>
                        </div>
                        <div className='form-group'>
                            <button className='btn btn-primary' >Submit</button>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default VenueTTK