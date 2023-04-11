import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AddNewBooking = () => {
    const [data, setData] = useState({
        name: '',
        contact: '',
        price: '',
        quantity: '',
        unit: '',
        product: '',
        service: ''
    })
    const formHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData({ ...data, [name]: value })

    }

    const btnHandler = () => {
        const { name, contact, price, service, product, quantity
            , unit
        } = data;
        if (name != '' && contact != "" && price != "" && service != "" && quantity != "" && product != '') {
            alert('Staff Added Successfully')
        }
        else {
            alert('please fill your all field')
        }
    }
    const [showForm, setShowForm] = useState(
        [{
            quantity: '',
            name: '',
            service: '',
            product: ''

        }]
    )
    const addInputField = () => {

        setShowForm([...showForm, {
            quantity: '',
            name: '',
            service: '',
            product: ''
        }])
    }
    const removeInputFields = (index) => {
        const rows = [...showForm];
        rows.splice(index, 1);
        setShowForm(rows);
    }
    const handleChange = (index, evnt) => {
        const { name, value } = evnt.target;
        const list = [...showForm];
        list[index][name] = value;
        setShowForm(list);
    }
    return (
        <div className="page-wrapper">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className='card-header bg-white'>
                                <h3>+ Add New Booking</h3>
                            </div>
                            <div className='card-body'>
                                <div className='row product_mgmt'>
                                    <div className='col-md-12'>
                                        <div className="form-floating mb-3">
                                            <input type="text" className="form-control" id="floatingInput" placeholder="Name" name="name" value={data.name} onChange={formHandler} />
                                            <label htmlFor="floatingInput" className=''>Name</label>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <div className="form-floating mb-3">
                                                <input type="text" className="form-control" id="floatingInput" placeholder="Contect Number" name="contect" value={data.contact} onChange={formHandler} />
                                                <label htmlFor="floatingInput" className=''>Contact Number<span className='text-danger'>*</span></label>
                                            </div>
                                        </div>
                                        <div className='col-md-6'>
                                            <div className="form-floating mb-3">
                                                <input type="text" className="form-control" id="floatingInput" placeholder=" fill your address" name="address" value={data.address} onChange={formHandler} />
                                                <label htmlFor="floatingInput" className=''>Address<span className='text-danger'>*</span></label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <div className="form-floating mb-3">
                                                <input type="text" className="form-control" id="floatingInput" placeholder="fill your City" name="city" value={data.city} onChange={formHandler} />
                                                <label htmlFor="floatingInput" className=''>City<span className='text-danger'>*</span></label>
                                            </div>
                                        </div>
                                        <div className='col-md-6'>
                                            <div className="form-floating mb-3">
                                                <input type="number" className="form-control" id="floatingInput" placeholder="fill your pincode" name="pincode" value={data.pincode} onChange={formHandler} />
                                                <label htmlFor="floatingInput" min={1} className=''>Pincode<span className='text-danger'>*</span></label>
                                            </div>
                                        </div>
                                    </div>



                                    {/* <div className='row'>
                                       <div className='col-md-3'>
                                       <div className="form-floating mb-3">
                                                <input type="text" className="form-control" id="floatingInput" name="service" value={data.service} onChange={formHandler} />
                                               
                                            </div>
                                       </div>
                                       <div className='col-md-3'>
                                       <div className="form-floating mb-3">
                                                <input type="text" className="form-control" id="floatingInput" name="service" value={data.service} onChange={formHandler} />
                                               
                                            </div>
                                       </div>
                                       <div className='col-md-3'>
                                       <div className="form-floating mb-3">
                                                <input type="text" className="form-control" id="floatingInput" name="service" value={data.service} onChange={formHandler} />
                                               
                                            </div>
                                       </div>
                                       <div className='col-md-3'>
                                       <div className="form-floating mb-3">
                                                <input type="text" className="form-control" id="floatingInput" name="service" value={data.service} onChange={formHandler} />
                                               
                                            </div>
                                       </div>
                                   </div> */}
                                    <table class="table table-bordered">
                                        <thead>
                                            <th style={{ fontWeight: '600' }} className='text-center'>Product</th>
                                            <th style={{ fontWeight: '600' }} className='text-center'>Services</th>
                                            <th style={{ fontWeight: '600' }} className='text-center'>Quantity</th>
                                            <th style={{ fontWeight: '600' }} className='text-center'>Unit Price</th>
                                            <th style={{ fontWeight: '600' }} className='text-center'>Add/Remove</th>
                                        </thead>

                                        <tbody>



                                            {
                                                showForm.map((data, index) => {
                                                    const { price, quantity, product, service } = data;
                                                    return (
                                                        <>
                                                            <tr class="table" key={index}>
                                                                <td>
                                                                    <input type="text"
                                                                        placeholder='Product'
                                                                        className="form-control" id="floatingInput" name="product" value={product} onChange={(evnt) => handleChange(index, evnt)} />
                                                                </td>
                                                                <td>
                                                                    <input type="text"
                                                                        placeholder='service' className="form-control" id="floatingInput" name="service" value={service} onChange={(evnt) => handleChange(index, evnt)} />
                                                                </td>
                                                                <td>
                                                                    <input type="text"
                                                                        placeholder='quantity'
                                                                        className="form-control" id="floatingInput" name="quantity" value={quantity} onChange={(evnt) => handleChange(index, evnt)} />
                                                                </td>
                                                                <td>
                                                                    <input type="text"
                                                                        placeholder='price'
                                                                        className="form-control" id="floatingInput" name="price" value={price} onChange={(evnt) => handleChange(index, evnt)} />
                                                                </td>

                                                                <td>

                                                                    {(showForm.length !== 1) ? <button className="btn btn-danger" onClick={removeInputFields}>Remove</button> : ''}
                                                                    {/* <button type="submit" class="btn btn-danger">Remove</button> */}
                                                                </td>
                                                            </tr>

                                                        </>


                                                        //             <div className="row my-3" key={index}>
                                                        //     <div className="col">
                                                        //     <div className="form-group">
                                                        //     <input type="text" onChange={(evnt)=>formHandler(index, evnt)} value={fullName} name="fullName" className="form-control"  placeholder="Full Name" />
                                                        //     </div>
                                                        //     </div>

                                                        //     <div className="col">



                                                        //  {(inputFields.length!==1)? <button className="btn btn-outline-danger" onClick={removeInputFields}>x</button>:''}


                                                        //     </div>
                                                        //   </div>

                                                    )
                                                })
                                            }
                                            <div className="row">
                                                <div className="col-sm-12">

                                                    <button className="btn btn-outline-success " onClick={addInputField}>Add New</button>
                                                </div>
                                            </div>
                                        </tbody>
                                    </table>
                                    <div className="row mb-3">
                                        <div className='form-group text-center'>
                                            <button className='btn btn-primary' onClick={btnHandler}>Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default AddNewBooking