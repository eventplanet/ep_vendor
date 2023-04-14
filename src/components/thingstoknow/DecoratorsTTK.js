import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select'
import { doc, setDoc, getDoc, collection, getDocs } from 'firebase/firestore';
import init from '../../firebase'
import { useUserAuth } from '../../context/UserAuthContext';
import { checkboxData } from './checkboxData';
import './style.css'
const DecoratorsTTK = () => {
    const [ttkEditMode, setTtkEditMode] = useState(false)
    const { user } = useUserAuth();
    const merchant_id = user.uid;
    const [merchant, setMerchant] = useState({});
    const [thingsToKnow, setThinksToKnow] = useState([])

    const [workingSince, setWorkingSince] = useState([])
    const [experienceZone, setExperienceZone] = useState([])
    const [serviceType, setServiceType] = useState([])
    const [onThePannal, setOnThePannal] = useState([])
    const [planningType, setPlanningType] = useState([])
    const [areaOfWork, setAreaOfWork] = useState([])
    const [paymentPolicy, setPaymentPolicy] = useState([])

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
    const [data, setData] = useState({
        indoorBudget: '',
        outdoorBudget: '',
        homeFunction: '',
    })
    const formHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData({ ...data, [name]: value })
        console.log(data)

    }

    const workingSinceHandler = (e) => {
        setWorkingSince(e)
    }
    const areaOffWorkingHandler = (e) => {
        setAreaOfWork(e)
    }
    const serviceTypeHandler = (e) => {
        setServiceType(e)
    }
    const experienceZoneHandler = (e) => {
        setExperienceZone(e)
    }
    const onThePannalHandler = (e) => {
        setOnThePannal(e)
    }
    const planningTypeHandler = (e) => {
        setPlanningType(e)
    }
    const paymentPolicyHandler = (e) => {
        setPaymentPolicy(e)
    }

    const workingSinceOption = checkboxData.workSinceOption;
    const serviceTypeOption = checkboxData.serviceTypeDecor
    const areaOfWorkingOption = checkboxData.areaOfWorking
    const experienceZoneOption = checkboxData.experienceZoneDecor
    const onThePannalOption = checkboxData.onThePannalOfDecor
    const paymentPolicyOption = checkboxData.paymentPolicyDecor
    const planningTypeOption = checkboxData.planningTypeDecor

    const submitHandler = async (e) => {
        e.preventDefault();
        const { indoorBudget, outdoorBudget, homeFunction } = data;
        if (indoorBudget !== '' && outdoorBudget !== '' && homeFunction !== '') {
            try {
                await setDoc(doc(init.db, "merchants", merchant_id), {
                    ...merchant,
                    thingsToKnow: {
                        indoorBudget,
                        outdoorBudget,
                        homeFunction,
                        workingSince,
                        experienceZone,
                        serviceType,
                        onThePannal,
                        planningType,
                        areaOfWork,
                        paymentPolicy
                    }
                }, { merge: true });
                toast.success('Data updated successfully.')
                getSingleDocumentHandler()
                setData({
                    indoorBudget: '',
                    outdoorBudget: '',
                    homeFunction: '',
                });
                getSingleDocumentHandler()
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
                    {
                        merchant.thingsToKnow && (
                            <>
                                <div className='table-responsive'>
                                    <table className='table text-center' cellPadding={0} cellSpacing={0} style={{ border: '1px solid #fff ' }}>
                                        <tbody className='ttk_preview'>
                                            <tr style={{ color: '#41B0FA' }}>
                                                <th style={{ width: '25%' }}>workingSince</th>
                                                <th style={{ width: '25%' }}>Indoor Budget</th>
                                                <th style={{ width: '25%' }}>Outdoor Budget</th>
                                                <th style={{ width: '25%' }}>Home Function</th>

                                            </tr>
                                            <tr>
                                                <td>{
                                                    merchant.thingsToKnow.workingSince?.map((item, index) => {
                                                        return <p key={index}>{item.value}</p>
                                                    })
                                                }</td>
                                                <td>&#8377; {merchant.thingsToKnow.indoorBudget}</td>
                                                <td>&#8377; {merchant.thingsToKnow.outdoorBudget}</td>
                                                <td>&#8377; {merchant.thingsToKnow.homeFunction}</td>
                                            </tr>
                                            <tr style={{ color: '#41B0FA' }}>
                                                <th>Experience Zone</th>
                                                <th>Service Type</th>
                                                <th>On The Pannal</th>
                                                <th>Planning Type</th>
                                            </tr>
                                            <tr>
                                                <td>{
                                                    merchant.thingsToKnow.experienceZone
                                                        ?.map((item, index) => {
                                                            return <>
                                                                <i className='fa fa-check text-success' />
                                                                <span key={index}>{item.value} </span>
                                                            </>
                                                        })
                                                }</td>
                                                <td>{
                                                    merchant.thingsToKnow.serviceType
                                                        ?.map((item, index) => {
                                                            return <>
                                                                <i className='fa fa-check text-success' />
                                                                <span key={index}>{item.value} </span>
                                                            </>
                                                        })
                                                }</td>
                                                <td>{
                                                    merchant.thingsToKnow.onThePannal
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
                                                    merchant.thingsToKnow.planningType
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
                                                <th>Paymemt Policy</th>
                                                <th>Area of working </th>
                                            </tr>
                                            <tr>
                                                <td>{
                                                    merchant.thingsToKnow.paymentPolicy
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
                            <form >
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
                                            <label>Service Type</label>
                                            <Select
                                                closeMenuOnSelect={false}
                                                isMulti
                                                options={serviceTypeOption}
                                                selected
                                                onChange={serviceTypeHandler}
                                            />
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='form-group'>
                                            <label>Indoor Budget</label>
                                            <input type='number' placeholder='Indoor Budget' className='form-control' name="indoorBudget" value={data.indoorBudget} onChange={formHandler} />
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='form-group'>
                                            <label>outdoor Budget</label>
                                            <input type='number' placeholder='outdoor Budget' className='form-control' name="outdoorBudget" value={data.outdoorBudget} onChange={formHandler} />
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='form-group'>
                                            <label>Experience Zone</label>
                                            <Select
                                                closeMenuOnSelect={false}
                                                isMulti
                                                options={experienceZoneOption}
                                                selected
                                                onChange={experienceZoneHandler}
                                            />
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='form-group'>
                                            <label>Home Function Decor Price</label>
                                            <input type='number' placeholder='Home Function Decor Price' className='form-control' name="homeFunction" value={data.homeFunction} onChange={formHandler} />
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='form-group'>
                                            <label>On The Pannal Of</label>
                                            <Select
                                                closeMenuOnSelect={false}
                                                isMulti
                                                options={onThePannalOption}
                                                selected
                                                onChange={onThePannalHandler}
                                            />
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='form-group'>
                                            <label>Planning Type </label>
                                            <Select
                                                closeMenuOnSelect={false}
                                                isMulti
                                                options={planningTypeOption}
                                                selected
                                                onChange={planningTypeHandler}
                                            />
                                        </div>
                                    </div>



                                    <div className='col-md-6'>
                                        <div className='form-group'>
                                            <label>Area of working </label>
                                            <Select
                                                closeMenuOnSelect={false}
                                                isMulti
                                                options={areaOfWorkingOption}
                                                selected
                                                onChange={areaOffWorkingHandler}
                                            />
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='form-group'>
                                            <label>Paymemt Policy  </label>
                                            <Select
                                                closeMenuOnSelect={false}
                                                isMulti
                                                options={paymentPolicyOption}
                                                selected
                                                onChange={paymentPolicyHandler}
                                            />
                                        </div>
                                    </div>

                                </div>
                                <div className='form-group'>
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
export default DecoratorsTTK