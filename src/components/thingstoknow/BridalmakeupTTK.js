<<<<<<< HEAD
import React,{useState} from 'react'
=======
import React, { useState } from 'react'
>>>>>>> bb0c0d390400c1278c463435f846faf023fa7187
import Select from 'react-select'
import { checkboxData } from './checkboxData'
const BridalmakeupTTK = () => {

<<<<<<< HEAD
    const workingSinceOption =  checkboxData.workSinceOption;
    const bridalMakeupPriceOption = checkboxData.bridalMakeupPrice;
    const AirBrushOption= checkboxData. airbrush;
    const makeupfamilyoption= checkboxData.makeupfamily;
    const outstationmakeupoption=checkboxData.outstationmakeup;
    const engagementOption=checkboxData. engagementmakeup;
    const traveltovenueOption= checkboxData. travelPreference;
    const trialpolicyoption=checkboxData. trailpolicy;
    const productusedOption=checkboxData.Productused;
    const Noofemployeesoption=checkboxData.Noofemployees;
   
    const pricesinclusiveofoption=checkboxData.pricesinclusiveof;
    const paymentpolicyoption=checkboxData.paymentpolicy;
    const Serviceprovidedcityoption=checkboxData. areaOfWorking;
   


    

    const[bridalMakeupPrice,setBridalMakeupPrice]=useState([])
    const[workingSince, setWorkingSince] =useState([])
    const[airBrush,setAirbrush]=useState([])
    const[makeupfamily,setMakeupfamily]=useState([])
    const[outstationmakeup,setOutstationmakeup]=useState([])
    const[engagementmakeup,setEngagementmakeup]=useState([])
    const[traveltovanue,setTraveltovenue]=useState([])
    const[trailpolicy,setTrialpolicy]=useState([])
    const[Productused,setProductused]=useState([])
    const[Noofemployees,setNoofemployees]=useState([])
    const[pricesinclusiveof,setPriceinclusiveof]=useState([])
    const[paymentpolicy,setPaymentpolicy]=useState([])
    const[serviceprovided,setServiceprovided]=useState([])
=======
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
>>>>>>> bb0c0d390400c1278c463435f846faf023fa7187
    const workingSinceHandler = (e) => {
        setWorkingSince(e)
    }
    const bridalMakeupPricesHandler = (e) => {
        setBridalMakeupPrice(e)
    }
<<<<<<< HEAD
    const airbrushHandler= (e) => {

         setAirbrush(e)
    }
    const makeupfamilyHandler=(e)=>{

        setMakeupfamily(e)
    }
   
    const outstationmakeupHandler=(e)=>{
         
        setOutstationmakeup(e)
    }
    const engagementHandler =(e)=>{

        setEngagementmakeup(e)
    }
    const travelHandler=(e)=>{
         setTraveltovenue(e)
    }
    const trialpolicyHandler=(e)=>{
        setTrialpolicy(e)

    }
    const productusedHandler=(e)=>{

        setProductused(e)
    }
    const NoofemployeesHandler=(e)=>{

        setNoofemployees(e)
    }
    const pricesHandler=(e)=>{

        setPriceinclusiveof(e)
    }
    const paymentHandler=(e)=>{

        setPaymentpolicy(e)
    }
    const serviceHandler=(e)=>{
        setServiceprovided(e)
    }
    const btnHandler=()=>{
       
           alert('hellow')
=======
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
>>>>>>> bb0c0d390400c1278c463435f846faf023fa7187
    }



<<<<<<< HEAD
  return (
    <div className='col-md-12'>
=======
    return (
        <div className='col-md-12'>
>>>>>>> bb0c0d390400c1278c463435f846faf023fa7187
            <div className='card'>
                <div className='card-header bg-primary text-white'>
                    Things to Know
                </div>
                <div className='card-body'>
<<<<<<< HEAD
                    <form  > 
=======
                    <form  >
>>>>>>> bb0c0d390400c1278c463435f846faf023fa7187
                        <div className='row'>
                            <div className='col-md-6'>
                                <div className='form-group'>
                                    <label>Work Since</label>
                                    <Select
<<<<<<< HEAD
                                    closeMenuOnSelect={false}
                                    isMulti
                                    options={workingSinceOption}
                                    selected
                                    onChange={workingSinceHandler}
                                />
=======
                                        closeMenuOnSelect={false}
                                        isMulti
                                        options={workingSinceOption}
                                        selected
                                        onChange={workingSinceHandler}
                                    />
>>>>>>> bb0c0d390400c1278c463435f846faf023fa7187
                                </div>

                            </div>

                            <div className='col-md-6'>
                                <div className='form-group'>
                                    <label>Bridal Makeup Price</label>
                                    <Select
<<<<<<< HEAD
                                    closeMenuOnSelect={false}
                                    isMulti
                                    options={bridalMakeupPriceOption}
                                    selected
                                    onChange={ bridalMakeupPricesHandler}
                                />
=======
                                        closeMenuOnSelect={false}
                                        isMulti
                                        options={bridalMakeupPriceOption}
                                        selected
                                        onChange={bridalMakeupPricesHandler}
                                    />
>>>>>>> bb0c0d390400c1278c463435f846faf023fa7187
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className='form-group'>
                                    <label>AirBrush Bridal Makeup</label>
                                    <Select
<<<<<<< HEAD
                                    closeMenuOnSelect={false}
                                    isMulti
                                    options={AirBrushOption}
                                    selected
                                    onChange={airbrushHandler}
                                />
=======
                                        closeMenuOnSelect={false}
                                        isMulti
                                        options={AirBrushOption}
                                        selected
                                        onChange={airbrushHandler}
                                    />
>>>>>>> bb0c0d390400c1278c463435f846faf023fa7187
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className='form-group'>
                                    <label>Party Makeup for Familly</label>
                                    <Select
<<<<<<< HEAD
                                    closeMenuOnSelect={false}
                                    isMulti
                                    options={makeupfamilyoption}
                                    selected
                                    onChange={makeupfamilyHandler}
                                />
=======
                                        closeMenuOnSelect={false}
                                        isMulti
                                        options={makeupfamilyoption}
                                        selected
                                        onChange={makeupfamilyHandler}
                                    />
>>>>>>> bb0c0d390400c1278c463435f846faf023fa7187
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className='form-group'>
                                    <label>OutStation Makeup Charges</label>
                                    <Select
<<<<<<< HEAD
                                    closeMenuOnSelect={false}
                                    isMulti
                                    options={outstationmakeupoption}
                                    selected
                                    onChange={outstationmakeupHandler}
                                />
=======
                                        closeMenuOnSelect={false}
                                        isMulti
                                        options={outstationmakeupoption}
                                        selected
                                        onChange={outstationmakeupHandler}
                                    />
>>>>>>> bb0c0d390400c1278c463435f846faf023fa7187
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className='form-group'>
                                    <label>Engagement Makeup</label>
                                    <Select
<<<<<<< HEAD
                                    closeMenuOnSelect={false}
                                    isMulti
                                    options={engagementOption}
                                    selected
                                    onChange={engagementHandler}
                                />
=======
                                        closeMenuOnSelect={false}
                                        isMulti
                                        options={engagementOption}
                                        selected
                                        onChange={engagementHandler}
                                    />
>>>>>>> bb0c0d390400c1278c463435f846faf023fa7187
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className='form-group'>
                                    <label>Travel to vanue </label>
                                    <Select
<<<<<<< HEAD
                                    closeMenuOnSelect={false}
                                    isMulti
                                    options={traveltovenueOption}
                                    selected
                                    onChange={travelHandler}
                                />
=======
                                        closeMenuOnSelect={false}
                                        isMulti
                                        options={traveltovenueOption}
                                        selected
                                        onChange={travelHandler}
                                    />
>>>>>>> bb0c0d390400c1278c463435f846faf023fa7187
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className='form-group'>
                                    <label>Trial Policy</label>
                                    <Select
<<<<<<< HEAD
                                    closeMenuOnSelect={false}
                                    isMulti
                                    options={trialpolicyoption}
                                    selected
                                    onChange={trialpolicyHandler}
                                />
=======
                                        closeMenuOnSelect={false}
                                        isMulti
                                        options={trialpolicyoption}
                                        selected
                                        onChange={trialpolicyHandler}
                                    />
>>>>>>> bb0c0d390400c1278c463435f846faf023fa7187
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className='form-group'>
                                    <label>Product used</label>
                                    <Select
<<<<<<< HEAD
                                    closeMenuOnSelect={false}
                                    isMulti
                                    options={productusedOption}
                                    selected
                                    onChange={productusedHandler}
                                />
=======
                                        closeMenuOnSelect={false}
                                        isMulti
                                        options={productusedOption}
                                        selected
                                        onChange={productusedHandler}
                                    />
>>>>>>> bb0c0d390400c1278c463435f846faf023fa7187
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className='form-group'>
                                    <label>Number of Employees</label>
                                    <Select
<<<<<<< HEAD
                                    closeMenuOnSelect={false}
                                    isMulti
                                    options={Noofemployeesoption}
                                    selected
                                    onChange={NoofemployeesHandler}
                                />
=======
                                        closeMenuOnSelect={false}
                                        isMulti
                                        options={Noofemployeesoption}
                                        selected
                                        onChange={NoofemployeesHandler}
                                    />
>>>>>>> bb0c0d390400c1278c463435f846faf023fa7187
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
<<<<<<< HEAD
                                    closeMenuOnSelect={false}
                                    isMulti
                                    options={pricesinclusiveofoption}
                                    selected
                                    onChange={pricesHandler}
                                />
=======
                                        closeMenuOnSelect={false}
                                        isMulti
                                        options={pricesinclusiveofoption}
                                        selected
                                        onChange={pricesHandler}
                                    />
>>>>>>> bb0c0d390400c1278c463435f846faf023fa7187
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className='form-group'>
                                    <label>Payment Policy </label>
                                    <Select
<<<<<<< HEAD
                                    closeMenuOnSelect={false}
                                    isMulti
                                    options={paymentpolicyoption}
                                    selected
                                    onChange={paymentHandler}
                                />
=======
                                        closeMenuOnSelect={false}
                                        isMulti
                                        options={paymentpolicyoption}
                                        selected
                                        onChange={paymentHandler}
                                    />
>>>>>>> bb0c0d390400c1278c463435f846faf023fa7187
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className='form-group'>
                                    <label>Service Provided Cityes</label>
                                    <Select
<<<<<<< HEAD
                                    closeMenuOnSelect={false}
                                    isMulti
                                    options={Serviceprovidedcityoption}
                                    selected
                                    onChange={serviceHandler}
                                />
                                </div>
                            </div>
                         
=======
                                        closeMenuOnSelect={false}
                                        isMulti
                                        options={Serviceprovidedcityoption}
                                        selected
                                        onChange={serviceHandler}
                                    />
                                </div>
                            </div>

>>>>>>> bb0c0d390400c1278c463435f846faf023fa7187
                        </div>
                        <div className='form-group'>
                            <button onClick={btnHandler} className='btn btn-primary'>Submit</button>
                        </div>
                    </form>
                </div>
<<<<<<< HEAD
               
                


            </div>
        </div>
  )
=======
            </div>
        </div>
    )
>>>>>>> bb0c0d390400c1278c463435f846faf023fa7187
}

export default BridalmakeupTTK