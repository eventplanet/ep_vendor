import React, { useState, useEffect } from 'react'
import { doc, setDoc, getDoc, collection, getDocs } from 'firebase/firestore';
import init from './../firebase';
import { useUserAuth } from '../context/UserAuthContext';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Modal from 'react-bootstrap/Modal';
const ProductList = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { user } = useUserAuth();
    const merchant_id = user.uid;

    const [merchant, setMerchant] = useState({});
    console.log(merchant.serviceId)
    const [data, setData] = useState([]);
    const [query, setQuery] = useState('');

    const [loading, setLoading] = useState(true)
    const [check, setCheck] = useState(null)

    const [category, setCategory] = useState()

    const getCategory = async () => {
        try {
            const mycollection = collection(init.db, 'serviceCategories');
            const data = await getDocs(mycollection);
            setCategory(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        } catch (error) {
            console.log(`Error ${error} `)
        }
    }
    const [subCategory, setSubCategory] = useState()
    const getSubCategory = async () => {
        try {
            const mycollection = collection(init.db, 'sub_categories');
            const data = await getDocs(mycollection);
            setSubCategory(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        } catch (error) {
            console.log(`Error ${error} `)
        }
    }
    const getSingleDocumentHandler = async () => {
        try {
            console.log(`fetching document data  for merchant Id ${merchant_id}`)
            const res = await getDoc(doc(init.db, "merchants", merchant_id));
            setMerchant(res.data());
            setData(res.data().products);
            setLoading(false);
        } catch (error) {
            console.log(`Error ${error} `)
        }
    }
    useEffect(() => {
        getSingleDocumentHandler();
        getCategory();
        getSubCategory();
    }, [merchant_id])
    const switchHandler = async (e, index) => {
        const newDataArray = [...data];
        newDataArray[index] = { ...newDataArray[index], stock: e.target.checked };
        const updatedArray = newDataArray;
        setData(updatedArray);
        updateStockStatus(updatedArray)
    }
    const updateStockStatus = async (updatedArray) => {
        try {
            await setDoc(doc(init.db, "merchants", merchant_id), {
                ...merchant,
                products: updatedArray
            });
            toast.success('Product stock status successfully.')
        }
        catch (err) {
            console.log(`Error ${err}`)
        }
    }

    const SubCategoryNameFinder = (sub_cat_id) => {
        const catObj = subCategory?.find(sub_cat => sub_cat.id === sub_cat_id)
        return catObj?.sub_cat_name
    }
    const [curProduct, setCurProduct] = useState([]);
    console.log('Wah ', curProduct)
    const setCurrentProduct = (index) => {
        handleShow()
        setCurProduct(data[index])
    }
    return (
        <div className="page-wrapper">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className='card-header row d-flex justify-content-between align-items-center'>
                                <div className='col-md-4'>
                                    <input type="text" placeholder='Search Product...' className='form-control' value={query} onChange={(e) => { setQuery(e.target.value) }} />
                                </div>
                                <div className='col-md-4'>
                                    <Link to="/dashboard/add-product" className='btn btn-primary btn-sm'> + Add Product </Link>
                                </div>
                            </div>
                            <div className='card-body'>
                                <div className='table-responsive'>
                                    <table className='table  table-bordered  shadow-sm mt-3' cellPadding={5}>
                                        <tr >
                                            <th>Product</th>
                                            <th>Price</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                        {loading && (
                                            <tr>
                                                <td><Skeleton count="2" style={{ width: "100%" }} /></td>
                                                <td><Skeleton count="2" style={{ width: "100%" }} /></td>
                                                <td><Skeleton count="2" style={{ width: "100%" }} /></td>
                                                <td><Skeleton count="2" style={{ width: "100%" }} /></td>
                                            </tr>
                                        )}
                                        {
                                            data ?
                                                (
                                                    data.filter((product) => product.name.toLowerCase().includes(query)).map((item, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>
                                                                    <div className='d-flex align-items-center'>
                                                                        <img src={item.productImages[0]} style={{ height: '60px', width: '60px', borderRadius: '10px', marginRight: '5px' }} />
                                                                        <p>{item.name}
                                                                            <br />
                                                                            {SubCategoryNameFinder(item.sub_cat_id)}
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                                <td>&#8377;{item.discountPrice}<strike style={{ color: '#bfbfbf' }}>&#8377;{item.price}</strike></td>
                                                                <td>
                                                                    <div className='d-flex align-items-center'>
                                                                        <div className="form-check form-switch ">
                                                                            <input className="form-check-input stock_checkbox" type="checkbox" id="flexSwitchCheckDefault"
                                                                                value={item.stock}
                                                                                onChange={(e) => switchHandler(e, index)}
                                                                                checked={item.stock} />
                                                                        </div>
                                                                        <span className={item.stock ? 'text-success' : 'text-danger'} style={{ fontSize: '14px' }}> {item.stock ? 'Available' : 'Not Available'}</span>
                                                                    </div>

                                                                </td>
                                                                <td>
                                                                    <i className='far fa-eye' onClick={() => setCurrentProduct(index)} style={{ cursor: 'pointer' }}></i>
                                                                    <i className='far fa-copy'></i>
                                                                    <i className='fas fa-share'></i>
                                                                </td>
                                                            </tr>
                                                        )
                                                    }))
                                                : (
                                                    <tr className='text-center text-danger'>
                                                        <td colSpan={4}>Product not found</td>
                                                    </tr>
                                                )
                                        }
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <ToastContainer />
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Product/Service Info</Modal.Title>
                </Modal.Header>
                <Modal.Body className='p-0'>
                    {
                        curProduct && (
                            <>
                                <table className='table table-bordered' width="100%">
                                    <tr>
                                        <tbody>
                                            <tr>
                                                <td>Product/Service Name</td>
                                                <td>{curProduct.name}</td>
                                            </tr>
                                            <tr>
                                                <td>Price</td>
                                                <td>&#8377;{curProduct.price} &#8377;<strike>{curProduct.discountPrice}</strike></td>
                                            </tr>
                                            <tr>
                                                <td>Quantity</td>
                                                <td>{curProduct.quantity} / {curProduct.unit}</td>
                                            </tr>
                                            <tr>
                                                <td>Description</td>
                                                <td> <div dangerouslySetInnerHTML={{ __html: curProduct.productDescription }} /></td>
                                            </tr>
                                            <tr>
                                                <td>Product Images</td>
                                                <td>
                                                    {
                                                        curProduct.productImages?.map((item, index) => {
                                                            return (
                                                                <img src={item} alt={curProduct.name} key={index} style={{ height: '100px', width: '100px', borderRadius: '10px', margin: '5px' }} />
                                                            )
                                                        })
                                                    }
                                                </td>
                                            </tr>
                                        </tbody>
                                    </tr>
                                </table>
                            </>
                        )
                    }
                </Modal.Body>
            </Modal >
        </div >
    )
}

export default ProductList