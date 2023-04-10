import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';
import Header from '../Header';
import Footer from '../Footer';
import 'react-toastify/dist/ReactToastify.css';
import init from './../firebase'
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const Category = () => {
    const [show, setShow] = useState(false);
    const [curCat, setCurCat] = useState()
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    let navigate = useNavigate();
    const [data, setData] = useState([]);
    const [subCategory, setSubCategory] = useState([])
    const [loading, setLoading] = useState(true)
    console.log(data)
    const choiceHandler = (id) => {
        setCurCat(id)
        handleShow()
        //navigate(`/create-profile/${id}`);
    }
    const getCategories = async () => {
        const mycollection = collection(init.db, 'categories');
        const data = await getDocs(mycollection);
        setData(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        setLoading(false)
    }
    const subCategories = async () => {
        const mycollection = collection(init.db, 'sub_categories');
        const data = await getDocs(mycollection);
        setSubCategory(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    }
    useEffect(() => {
        getCategories();
        subCategories();
    }, [])

    useEffect(() => {
        console.log('im working bro')
    }, [data])

    const subCatHandler = (sub_cat_id) => {
        navigate(`/create-profile/${curCat}/${sub_cat_id}`);
    }
    return (
        <>
            <Header />
            <section className='main_container'>
                <div className="container">
                    <div className="row py-5">
                        {
                            loading && (
                                <>
                                    <div className="col-md-2 col-lg-3">
                                        <Skeleton height={100} />
                                    </div>
                                    <div className="col-md-2 col-lg-3">
                                        <Skeleton height={100} />
                                    </div>
                                    <div className="col-md-2 col-lg-3">
                                        <Skeleton height={100} />
                                    </div>
                                    <div className="col-md-2 col-lg-3">
                                        <Skeleton height={100} />
                                    </div>
                                    <div className="col-md-2 col-lg-3">
                                        <Skeleton height={100} />
                                    </div>
                                    <div className="col-md-2 col-lg-3">
                                        <Skeleton height={100} />
                                    </div>
                                    <div className="col-md-2 col-lg-3">
                                        <Skeleton height={100} />
                                    </div>
                                    <div className="col-md-2 col-lg-3">
                                        <Skeleton height={100} />
                                    </div>
                                </>
                            )
                        }
                        {
                            data.reverse(data).map((data, i) => {
                                return (
                                    <div className="col-md-2 col-lg-3" onClick={() => choiceHandler(data.id)} key={i}>
                                        <div className="card m-2 p-2 text-center shadow-sm choice_section" style={{
                                            height: '100px', display
                                                : 'flex', justifyContent: 'center', alignItems: 'center'
                                        }}>
                                            {data.cat_name}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </section>
            <Footer />
            <ToastContainer />
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Body>
                    <ul className='sub__cat__style'>
                        {
                            subCategory.filter((pre) => pre.cat_id === curCat).map((item, index) => {
                                return (
                                    <li key={index} onClick={() => subCatHandler(item.id)}>{item.sub_cat_name}</li>
                                )
                            })
                        }
                    </ul>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default Category