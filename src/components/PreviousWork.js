import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import init from './../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { MdCloudUpload, MdDelete } from 'react-icons/md';
import { AiFillFileImage } from 'react-icons/ai';
import { useUserAuth } from '../context/UserAuthContext';
import './PreviousWork.css'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
const PreviousWork = () => {
    const { user } = useUserAuth();
    const merchant_id = user.uid;
    const [merchant, setMerchant] = useState({});
    const [loading, setLoading] = useState(true);
    const [imgList, setImgList] = useState([]);
    const [imgUrl, setImgUrl] = useState(null);
    const getSingleDocumentHandler = async () => {
        try {
            const res = await getDoc(doc(init.db, "merchants", merchant_id));
            setMerchant(res.data());
            setImgList(res.data().PreviousWork);
            setLoading(false)
        } catch (error) {
            console.log(`Error : ${error}`)
        }
    }

    useEffect(() => {
        getSingleDocumentHandler();
    }, [merchant_id, imgUrl])

    const updateSingleDocumentHandler = async (downloadURL) => {
        console.log(`processing update document for merchant Id ${merchant_id} URL is ${downloadURL}`)
        await setDoc(doc(init.db, "merchants", merchant_id), {
            ...merchant,
            PreviousWork: [...merchant.PreviousWork, downloadURL]
        });
    }
    const deleteBtnHandler = async (index) => {
        const newList = imgList.filter((img, i) => i !== index);
        setImgList(newList);
        try {
            await setDoc(doc(init.db, "merchants", merchant_id), {
                ...merchant,
                PreviousWork: newList
            });
            console.log(`Image Deleted`)
        }
        catch (err) {
            console.log(err);
        }
    }
    const imgHandler = (res) => {
        setShow(true)
        setImgUrl(res)
    }
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body className='p-0'>
                    <img src={imgUrl} style={{ width: '100%' }} />
                </Modal.Body>
            </Modal>
            <div className="page-wrapper">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className='card-header bg-white'>
                                    <p><Link to="/dashboard/previous-work"><i className='fa fa-arrow-left'></i> Back </Link><b>Previous Work Image</b></p>
                                </div>
                                <div className='card-body'>
                                    <div className='row'>
                                        {loading ? (
                                            <>
                                                <div className='col-md-3 col-sm-6 col-6'>
                                                    <Skeleton count={1} style={{ height: '130px', width: '100%', borderRadius: '10px' }} />
                                                </div>
                                                <div className='col-md-3 col-sm-6 col-6'>
                                                    <Skeleton count={1} style={{ height: '130px', width: '100%', borderRadius: '10px' }} />
                                                </div>
                                                <div className='col-md-3 col-sm-6 col-6'>
                                                    <Skeleton count={1} style={{ height: '130px', width: '100%', borderRadius: '10px' }} />
                                                </div>
                                                <div className='col-md-3 col-sm-6 col-6'>
                                                    <Skeleton count={1} style={{ height: '130px', width: '100%', borderRadius: '10px' }} />
                                                </div>
                                                <div className='col-md-3 col-sm-6 col-6'>
                                                    <Skeleton count={1} style={{ height: '130px', width: '100%', borderRadius: '10px' }} />
                                                </div>
                                                <div className='col-md-3 col-sm-6 col-6'>
                                                    <Skeleton count={1} style={{ height: '130px', width: '100%', borderRadius: '10px' }} />
                                                </div>
                                                <div className='col-md-3 col-sm-6 col-6'>
                                                    <Skeleton count={1} style={{ height: '130px', width: '100%', borderRadius: '10px' }} />
                                                </div>
                                                <div className='col-md-3 col-sm-6 col-6'>
                                                    <Skeleton count={1} style={{ height: '130px', width: '100%', borderRadius: '10px' }} />
                                                </div>
                                            </>

                                        ) : (
                                            <>
                                                {imgList?.map((res, index) => {
                                                    return (
                                                        <div className="col-md-3 col-sm-6 col-6" key={index}>
                                                            <div className="img_box">
                                                                <img src={res} alt="" style={{ border: '1px solid skyblue', }} onClick={() => imgHandler(res)} />
                                                                <div className='close_btn bg-primary' onClick={() => deleteBtnHandler(index)}>
                                                                    x
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                                }
                                            </>
                                        )
                                        }

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
export default PreviousWork