import React, { useState, useEffect } from 'react'
import { doc, setDoc, getDoc, collection, getDocs } from 'firebase/firestore';
import init from './../firebase';
import { useUserAuth } from '../context/UserAuthContext';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom'

const ProductList = () => {
    const { user } = useUserAuth();
    const merchant_id = user.uid;
    console.log('Merchant ID', merchant_id)
    const [merchant, setMerchant] = useState({});
    console.log(merchant.serviceId)
    const [data, setData] = useState([]);
    const [query, setQuery] = useState('');
    console.log(data)
    const [loading, setLoading] = useState(true)
    const [check, setCheck] = useState(null)
    console.log('Data', data)
    const [category, setCategory] = useState()
    console.log('Category', category)
    const getCategory = async () => {
        try {
            const mycollection = collection(init.db, 'serviceCategories');
            const data = await getDocs(mycollection);
            setCategory(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
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
    const catObj = category?.find(cat => cat.id === merchant.serviceId)
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
                                                                        <img src={item.productImages[0]} style={{ height: '60px', width: '60px', borderRadius: '10px' }} />
                                                                        <p>{item.name}
                                                                            <br />
                                                                            {` (${catObj?.cat_name})`}</p>
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
                                                                        <span className={item.stock ? 'text-success' : 'text-danger'} style={{ fontSize: '14px' }}> {item.stock ? '  in Stock' : 'Out Of Stock'}</span>
                                                                    </div>

                                                                </td>
                                                                <td>
                                                                    <i className='far fa-eye'></i>
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
        </div>
    )
}

export default ProductList