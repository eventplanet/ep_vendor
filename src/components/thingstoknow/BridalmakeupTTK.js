import React, { useState } from 'react'
import Select from 'react-select'
import { checkboxData } from './checkboxData'
const BridalmakeupTTK = () => {

    const workingSinceOption = checkboxData.workSinceOption;
    const bridalMakeupPriceOption = checkboxData.bridalMakeupPrice;
    const AirBrushOption = checkboxData.airbrush;
    const makeupfamilyoption = checkboxData.makeupfamily;
    const outstationmakeupoption = checkboxData.outstationmakeup;
    const engagementOption = checkboxData.engagementmakeup;
    const traveltovenueOption = checkboxData.travelPreference;
    const trialpolicyoption = checkboxData.trailpolicy;
    const productusedOption = checkboxData.Productused;
    const Noofemployeesoption = checkboxData.Noofemployees;

    const pricesinclusiveofoption = checkboxData.pricesinclusiveof;
    const paymentpolicyoption = checkboxData.paymentpolicy;
    const Serviceprovidedcityoption = checkboxData.areaOfWorking;





    const [bridalMakeupPrice, setBridalMakeupPrice] = useState([])
    const [workingSince, setWorkingSince] = useState([])
    const [airBrush, setAirbrush] = useState([])
    const [makeupfamily, setMakeupfamily] = useState([])
    const [outstationmakeup, setOutstationmakeup] = useState([])
    const [engagementmakeup, setEngagementmakeup] = useState([])
    const [traveltovanue, setTraveltovenue] = useState([])
    const [trailpolicy, setTrialpolicy] = useState([])
    const [Productused, setProductused] = useState([])
    const [Noofemployees, setNoofemployees] = useState([])
    const [pricesinclusiveof, setPriceinclusiveof] = useState([])
    const [paymentpolicy, setPaymentpolicy] = useState([])
    const [serviceprovided, setServiceprovided] = useState([])
    const workingSinceHandler = (e) => {
        setWorkingSince(e)
    }
    const bridalMakeupPricesHandler = (e) => {
        setBridalMakeupPrice(e)
    }
    const airbrushHandler = (e) => {

        setAirbrush(e)
    }
    const makeupfamilyHandler = (e) => {

        setMakeupfamily(e)
    }

    const outstationmakeupHandler = (e) => {

        setOutstationmakeup(e)
    }
    const engagementHandler = (e) => {

        setEngagementmakeup(e)
    }
    const travelHandler = (e) => {
        setTraveltovenue(e)
    }
    const trialpolicyHandler = (e) => {
        setTrialpolicy(e)

    }
    const productusedHandler = (e) => {

        setProductused(e)
    }
    const NoofemployeesHandler = (e) => {

        setNoofemployees(e)
    }
    const pricesHandler = (e) => {

        setPriceinclusiveof(e)
    }
    const paymentHandler = (e) => {

        setPaymentpolicy(e)
    }
    const serviceHandler = (e) => {
        setServiceprovided(e)
    }
    const btnHandler = () => {

        alert('hellow')
    }



    return (
        <div className='col-md-12'>
            <div className='card'>
                <div className='card-header bg-primary text-white'>
                    Things to Know
                </div>
                <div className='card-body'>
                    <form  >
                        <div className='row'>
                            <div className='col-md-6'>
                                <div className='form-group'>
                                    <label>Work Since</label>
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
                                    <label>Bridal Makeup Price</label>
                                    <Select
                                        closeMenuOnSelect={false}
                                        isMulti
                                        options={bridalMakeupPriceOption}
                                        selected
                                        onChange={bridalMakeupPricesHandler}
                                    />
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className='form-group'>
                                    <label>AirBrush Bridal Makeup</label>
                                    <Select
                                        closeMenuOnSelect={false}
                                        isMulti
                                        options={AirBrushOption}
                                        selected
                                        onChange={airbrushHandler}
                                    />
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className='form-group'>
                                    <label>Party Makeup for Familly</label>
                                    <Select
                                        closeMenuOnSelect={false}
                                        isMulti
                                        options={makeupfamilyoption}
                                        selected
                                        onChange={makeupfamilyHandler}
                                    />
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className='form-group'>
                                    <label>OutStation Makeup Charges</label>
                                    <Select
                                        closeMenuOnSelect={false}
                                        isMulti
                                        options={outstationmakeupoption}
                                        selected
                                        onChange={outstationmakeupHandler}
                                    />
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className='form-group'>
                                    <label>Engagement Makeup</label>
                                    <Select
                                        closeMenuOnSelect={false}
                                        isMulti
                                        options={engagementOption}
                                        selected
                                        onChange={engagementHandler}
                                    />
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className='form-group'>
                                    <label>Travel to vanue </label>
                                    <Select
                                        closeMenuOnSelect={false}
                                        isMulti
                                        options={traveltovenueOption}
                                        selected
                                        onChange={travelHandler}
                                    />
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className='form-group'>
                                    <label>Trial Policy</label>
                                    <Select
                                        closeMenuOnSelect={false}
                                        isMulti
                                        options={trialpolicyoption}
                                        selected
                                        onChange={trialpolicyHandler}
                                    />
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className='form-group'>
                                    <label>Product used</label>
                                    <Select
                                        closeMenuOnSelect={false}
                                        isMulti
                                        options={productusedOption}
                                        selected
                                        onChange={productusedHandler}
                                    />
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className='form-group'>
                                    <label>Number of Employees</label>
                                    <Select
                                        closeMenuOnSelect={false}
                                        isMulti
                                        options={Noofemployeesoption}
                                        selected
                                        onChange={NoofemployeesHandler}
                                    />
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className='form-group'>
                                    <label>Cancellation Policy </label>
                                    <input type='text' placeholder='Delivery Time' className='form-control' />
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className='form-group'>
                                    <label>Prices Inclusius of</label>
                                    <Select
                                        closeMenuOnSelect={false}
                                        isMulti
                                        options={pricesinclusiveofoption}
                                        selected
                                        onChange={pricesHandler}
                                    />
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className='form-group'>
                                    <label>Payment Policy </label>
                                    <Select
                                        closeMenuOnSelect={false}
                                        isMulti
                                        options={paymentpolicyoption}
                                        selected
                                        onChange={paymentHandler}
                                    />
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className='form-group'>
                                    <label>Service Provided Cityes</label>
                                    <Select
                                        closeMenuOnSelect={false}
                                        isMulti
                                        options={Serviceprovidedcityoption}
                                        selected
                                        onChange={serviceHandler}
                                    />
                                </div>
                            </div>

                        </div>
                        <div className='form-group'>
                            <button onClick={btnHandler} className='btn btn-primary'>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default BridalmakeupTTK