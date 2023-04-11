import React, { useState } from 'react'

const AddStaf = () => {
    const [data, setData] = useState({
        name: '',
        contact: '',
        date: '',
        amount: '',
        salarytype: '',
        role: ''
    })
    const formHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData({ ...data, [name]: value })
    }

    const [staflist, setStafList] = useState([])
    console.log(staflist)

    const btnHandler = () => {
        const { name, contact, date, amount, salarytype } = data;
        if (name != '' && contact != "" && date != "" && amount != "" && salarytype != "") {
            alert('Staff Added Successfully')

            setStafList((predata) => [...predata, data])
        }
        else {
            alert('please fill your all field')
        }
    }
    return (
        <>
            <div className="page-wrapper">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className='card-header row d-flex justify-content-between align-items-center'>
                                    <div className='col-md-4'>
                                        <input type="text" placeholder='Search Product...' className='form-control' />
                                    </div>
                                    <div className='col-md-4'>
                                        <button type="button" class="btn btn-primary w-25" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                            Add Staf
                                        </button>
                                    </div>
                                </div>
                                <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                    <div class="modal-dialog modal-dialog-centered">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <center> <h1 class="modal-title fs-5" id="staticBackdropLabel">Staf Management</h1></center>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                <form class="form-horizontal">
                                                    <div class="card-body">
                                                        <div class="form-group row">
                                                            <label
                                                                for="fname"
                                                                class=" text-start control-label col-form-label"
                                                            >Full Name <span className='text-danger'>*</span></label>
                                                            <div class="col-sm-12">
                                                                <input
                                                                    onChange={formHandler} value={data.name}
                                                                    name='name'
                                                                    type="text"
                                                                    class="form-control"
                                                                    id="fname"
                                                                    placeholder="Enter your name"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label
                                                                for="fname"
                                                                class=" text-start control-label col-form-label"
                                                            >Contect Nu.<span className='text-danger'>*</span></label
                                                            >

                                                            <div class="col-sm-12">
                                                                <input
                                                                    onChange={formHandler} value={data.contact}
                                                                    type="text"
                                                                    class="form-control"
                                                                    id="fname"
                                                                    name='contact'
                                                                    placeholder="Contact Nu.."
                                                                />
                                                            </div>
                                                        </div>
                                                        <div class="col-md-12">
                                                            <div class="form-group">
                                                                <label
                                                                    for="fname"
                                                                    class=" text-start control-label col-form-label"
                                                                >Role <span className='text-danger'>*</span></label
                                                                >
                                                                <select class="form-select" id="floatingSelectGrid"
                                                                    name='role'
                                                                    onChange={formHandler} value={data.role}>
                                                                    <option selected>Role</option>
                                                                    <option value="employee">Staf</option>
                                                                    <option value="manger">Contractor</option>
                                                                    <option value="laber">Freelancer</option>
                                                                </select>

                                                            </div>
                                                        </div>
                                                        <div class=" row">
                                                            <label

                                                                for="fname"
                                                                class=" text-start control-label col-form-label"
                                                            >Salary Colculation Date<span className='text-danger'>*</span></label
                                                            >
                                                            <div class="col-sm-12">
                                                                <input
                                                                    onChange={formHandler}
                                                                    value={data.date}
                                                                    type="date"
                                                                    class="form-control"
                                                                    id="fname"
                                                                    placeholder="Salary Colculation Data"
                                                                    name='date'
                                                                />
                                                            </div>
                                                        </div>

                                                        <label
                                                            for="fname"
                                                            class=" text-start control-label col-form-label d-flex"
                                                        >Salary Type<span className='text-danger'>*</span></label
                                                        >

                                                        <div class="form-check form-check-inline">
                                                            <input
                                                                onChange={formHandler}
                                                                class="form-check-input" type="radio" name="salarytype"
                                                                id="inlineRadio1" value="monthly"
                                                                checked={data.salarytype === 'monthly'}
                                                            />
                                                            <label class="form-check-label" for="inlineRadio1">Monthly</label>
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input
                                                                onChange={formHandler}
                                                                checked={data.salarytype === 'daily'}
                                                                class="form-check-input" type="radio" name="salarytype" id="inlineRadio2" value="daily" />
                                                            <label class="form-check-label" for="inlineRadio2">Daily</label>
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input
                                                                onChange={formHandler}
                                                                checked={data.salarytype === 'hourly'}
                                                                class="form-check-input" type="radio" name="salarytype" id="inlineRadio3" value="hourly"

                                                            />
                                                            <label class="form-check-label" for="inlineRadio3">Hourly</label>
                                                        </div>



                                                        <div class="form-group row">
                                                            <label
                                                                for="fname"
                                                                class=" text-start control-label col-form-label"
                                                            >Amount<span className='text-danger'>*</span></label
                                                            >
                                                            <div class="col-sm-12">
                                                                <input
                                                                    onChange={formHandler}
                                                                    value={data.amount}
                                                                    type="number"
                                                                    class="form-control"
                                                                    id="fname"
                                                                    placeholder="Enter Amount.."
                                                                    name='amount'
                                                                />
                                                            </div>
                                                        </div>


                                                    </div>
                                                </form>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" onClick={btnHandler} class="btn btn-primary" data-bs-dismiss="modal">
                                                    Submit
                                                </button>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='card-body'>
                                    <div className='table-responsive'>
                                        <table className='table  table-bordered  shadow-sm mt-3' cellPadding={5}>
                                            <tr >
                                                <th>Name</th>
                                                <th>Contact Number</th>
                                                <th>Salary Colculation date</th>
                                                <th>Salary Type</th>
                                                <th>Amount</th>
                                                <th>Role</th>
                                            </tr>
                                            {
                                                staflist.map((cur, index) => {
                                                    return (
                                                        <tr>
                                                            <td>{cur.name}</td>
                                                            <td>{cur.contact}</td>
                                                            <td>{cur.date}</td>
                                                            <td>{cur.salarytype}</td>
                                                            <td>{cur.amount}</td>
                                                            <td>{cur.role}</td>
                                                        </tr>
                                                    )
                                                })
                                            }

                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default AddStaf