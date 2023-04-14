import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select'
import { checkboxData } from './checkboxData';
import './style.css'
const DecoratorsTTK = () => {
    const [workingSince, setWorkingSince] = useState([])
    const [experienceZone, setExperienceZone] = useState([])
    const [serviceType, setServiceType] = useState([])
    const [onThePannal, setOnThePannal] = useState([])
    const [planningType, setPlanningType] = useState([])
    const [areaOfWork, setAreaOfWork] = useState([])
    const [paymentPolicy, setPaymentPolicy] = useState([])

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
    const submitHandler = (e) => {
        alert(data)
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
    const btnHandler = async (e) => {
        e.preventDefault();
        const { indoorBudget, outdoorBudget, homeFunctions } = data;
        if (indoorBudget !== '' && outdoorBudget !== '' && homeFunctions !== '') {


        } else {
            toast.error('Please fill all the mandetary field')
        }

    }
    return (
        <div className='col-md-12'>
            <div className='card'>
                <div className='card-header bg-primary text-white'>
                    Things to Know (Decorator)
                </div>
                <div className='card-body'>
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
                </div>
            </div>
        </div>
    )
}
export default DecoratorsTTK