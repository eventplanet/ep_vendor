import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import init from './../firebase'
import { useUserAuth } from '../context/UserAuthContext';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const AddStaf = () => {
    const { user } = useUserAuth();
    const merchant_id = user.uid;
    const [merchant, setMerchant] = useState({});
    const [staff, setStaff] = useState([])
    const [loading, setLoading] = useState(true)
    const getSingleDocumentHandler = async () => {
        try {
            const res = await getDoc(doc(init.db, "merchants", merchant_id));
            setMerchant(res.data());
            setStaff(res.data().staff);
            setLoading(false)
        } catch (error) {
            console.log(`Error ${error}`)
        }
    }
    useEffect(() => {
        getSingleDocumentHandler()
    }, [merchant_id, staff])

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
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

    const btnHandler = async () => {
        const { name, contact, date, amount, salarytype } = data;
        if (name != '' && contact != "" && date != "" && amount != "" && salarytype != "") {
            try {
                await setDoc(doc(init.db, "merchants", merchant_id), {
                    ...merchant,
                    staff: [...merchant.staff, data]
                }, { merge: true });
                setData({
                    name: '',
                    contact: '',
                    date: '',
                    amount: '',
                    salarytype: '',
                    role: ''
                })
                toast.success('Data Updated Successfully');
            } catch (err) {
                console.log(err);
            }

        }
        else {
            alert('please fill your all field')
        }
        handleClose()
    }
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title> Add Staff</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-0">
                    <form className="form-horizontal">
                        <div className="card-body">
                            <div className="form-group">
                                <label
                                    for="fname"
                                    className=" text-start control-label col-form-label"
                                >Full Name <span className='text-danger'>*</span></label>

                                <input
                                    onChange={formHandler} value={data.name}
                                    name='name'
                                    type="text"
                                    className="form-control"
                                    id="fname"
                                    placeholder="Enter your name"
                                />
                            </div>
                            <div className="form-group">
                                <label
                                    for="fname"
                                    className=" text-start control-label col-form-label"
                                >Contact Number<span className='text-danger'>*</span></label>
                                <input
                                    onChange={formHandler} value={data.contact}
                                    type="text"
                                    className="form-control"
                                    name='contact'
                                    placeholder="Contact Number"
                                />

                            </div>
                            <div className="form-group">
                                <label
                                    for="fname"
                                    className=" text-start control-label col-form-label"
                                >Role <span className='text-danger'>*</span></label
                                >
                                <select className="form-select" id="floatingSelectGrid"
                                    name='role'
                                    onChange={formHandler} value={data.role}>
                                    <option selected>Role</option>
                                    <option value="employee">Staf</option>
                                    <option value="manger">Contractor</option>
                                    <option value="laber">Freelancer</option>
                                </select>
                            </div>


                            <label
                                for="fname"
                                className=" text-start control-label col-form-label"
                            >Salary Colculation Date<span className='text-danger'>*</span></label
                            >
                            <input
                                onChange={formHandler}
                                value={data.date}
                                type="date"
                                className="form-control"
                                id="fname"
                                placeholder="Salary Colculation Data"
                                name='date'
                            />
                            <label
                                for="fname"
                                className=" text-start control-label col-form-label d-flex"
                            >Salary Type<span className='text-danger'>*</span></label
                            >

                            <div className="form-check form-check-inline">
                                <input
                                    onChange={formHandler}
                                    className="form-check-input" type="radio" name="salarytype"
                                    id="inlineRadio1" value="monthly"
                                    checked={data.salarytype === 'monthly'}
                                />
                                <label className="form-check-label" for="inlineRadio1">Monthly</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    onChange={formHandler}
                                    checked={data.salarytype === 'daily'}
                                    className="form-check-input" type="radio" name="salarytype" id="inlineRadio2" value="daily" />
                                <label className="form-check-label" for="inlineRadio2">Daily</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    onChange={formHandler}
                                    checked={data.salarytype === 'hourly'}
                                    className="form-check-input" type="radio" name="salarytype" id="inlineRadio3" value="hourly"

                                />
                                <label className="form-check-label" for="inlineRadio3">Hourly</label>
                            </div>



                            <div className="form-group ">
                                <label
                                    for="fname"
                                    className=" text-start control-label col-form-label"
                                >Amount<span className='text-danger'>*</span></label>
                                <input
                                    onChange={formHandler}
                                    value={data.amount}
                                    type="number"
                                    className="form-control"
                                    id="fname"
                                    placeholder="Enter Amount.."
                                    name='amount'
                                />
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={btnHandler}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
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
                                        <button type="button" className="btn btn-primary" onClick={handleShow}>
                                            Add Staff
                                        </button>
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
                                            {loading && (
                                                <>
                                                    <tr>
                                                        <td><Skeleton count="1" style={{ width: "100%" }} /></td>
                                                        <td><Skeleton count="1" style={{ width: "100%" }} /></td>
                                                        <td><Skeleton count="1" style={{ width: "100%" }} /></td>
                                                        <td><Skeleton count="1" style={{ width: "100%" }} /></td>
                                                        <td><Skeleton count="1" style={{ width: "100%" }} /></td>
                                                        <td><Skeleton count="1" style={{ width: "100%" }} /></td>
                                                    </tr>
                                                    <tr>
                                                        <td><Skeleton count="1" style={{ width: "100%" }} /></td>
                                                        <td><Skeleton count="1" style={{ width: "100%" }} /></td>
                                                        <td><Skeleton count="1" style={{ width: "100%" }} /></td>
                                                        <td><Skeleton count="1" style={{ width: "100%" }} /></td>
                                                        <td><Skeleton count="1" style={{ width: "100%" }} /></td>
                                                        <td><Skeleton count="1" style={{ width: "100%" }} /></td>
                                                    </tr>
                                                    <tr>
                                                        <td><Skeleton count="1" style={{ width: "100%" }} /></td>
                                                        <td><Skeleton count="1" style={{ width: "100%" }} /></td>
                                                        <td><Skeleton count="1" style={{ width: "100%" }} /></td>
                                                        <td><Skeleton count="1" style={{ width: "100%" }} /></td>
                                                        <td><Skeleton count="1" style={{ width: "100%" }} /></td>
                                                        <td><Skeleton count="1" style={{ width: "100%" }} /></td>
                                                    </tr>
                                                    <tr>
                                                        <td><Skeleton count="1" style={{ width: "100%" }} /></td>
                                                        <td><Skeleton count="1" style={{ width: "100%" }} /></td>
                                                        <td><Skeleton count="1" style={{ width: "100%" }} /></td>
                                                        <td><Skeleton count="1" style={{ width: "100%" }} /></td>
                                                        <td><Skeleton count="1" style={{ width: "100%" }} /></td>
                                                        <td><Skeleton count="1" style={{ width: "100%" }} /></td>
                                                    </tr>
                                                    <tr>
                                                        <td><Skeleton count="1" style={{ width: "100%" }} /></td>
                                                        <td><Skeleton count="1" style={{ width: "100%" }} /></td>
                                                        <td><Skeleton count="1" style={{ width: "100%" }} /></td>
                                                        <td><Skeleton count="1" style={{ width: "100%" }} /></td>
                                                        <td><Skeleton count="1" style={{ width: "100%" }} /></td>
                                                        <td><Skeleton count="1" style={{ width: "100%" }} /></td>
                                                    </tr>
                                                </>
                                            )}
                                            {
                                                staff?.map((cur, index) => {
                                                    return (
                                                        <tr key={index}>
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
            <ToastContainer />
        </>
    )
}

export default AddStaf