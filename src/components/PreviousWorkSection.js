import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { doc, setDoc, getDoc, getDocs, collection } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import init from './../firebase'
import { useUserAuth } from '../context/UserAuthContext';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import './Profile.css'
import { v4 as uuidv4 } from 'uuid';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import avatar from '../assets/avatar.png'
const PreviousWorkSection = () => {
    const [loading, setLoading] = useState(true);
    const { user } = useUserAuth();
    const merchant_id = user.uid;
    const [imgUrl, setImgUrl] = useState(null);
    const [merchant, setMerchant] = useState([]);
    const [previousImgUrl, setPreviousImgUrl] = useState(null);
    const [progresspercent, setProgresspercent] = useState(0);
    const [previousImgProgress, setPreviousImgProgress] = useState(0);
    const getSingleDocumentHandler = async () => {
        try {
            console.log(`fetching document data  for merchant Id ${merchant_id}`)
            const res = await getDoc(doc(init.db, "merchants", merchant_id));
            setMerchant(res.data());
            setLoading(false);
        } catch (error) {
            console.log(`Error ${error} `)
        }
    }
    const imgUploader = (e) => {
        console.log("Image process", e.target.files[0])
        const file = e.target.files[0];
        const fileExtension = file.name.split('.').pop();
        // console.log('File name ' + file + 'fileExtension ' + fileExtension)
        const storageRef = ref(init.storage, `${uuidv4()}.${fileExtension}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgresspercent(progress);
            },
            (err) => {
                console.log(err);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('Uploaded image', downloadURL)
                    setImgUrl(downloadURL);
                    updateSingleDocumentHandler(downloadURL);
                    toast.success('Profile Picture Updated Successfully');
                });
            }
        );
    }
    const updateSingleDocumentHandler = async (downloadURL) => {
        try {
            await setDoc(doc(init.db, "merchants", merchant_id), {
                ...merchant,
                profilePicture: {
                    image: downloadURL
                }
            });
            toast.success('Image Updated Successfully');
        } catch (err) {
            console.log(`Error ${err}`)
        }
    }
    const previousUploader = (e) => {
        console.log("Image process", e.target.files[0])
        const file = e.target.files[0];
        const fileExtension = file.name.split('.').pop();
        // console.log('File name ' + file + 'fileExtension ' + fileExtension)
        const storageRef = ref(init.storage, `${uuidv4()}.${fileExtension}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                //setProgresspercent(progress);
                setPreviousImgProgress(progress)
            },
            (err) => {
                console.log(err);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('Uploaded image', downloadURL)
                    setPreviousImgUrl(downloadURL);
                    uploadPreviousWork(downloadURL);
                });
            }
        );
    }
    const uploadPreviousWork = async (downloadURL) => {
        await setDoc(doc(init.db, "merchants", merchant_id), {
            ...merchant,
            PreviousWork: [...merchant.PreviousWork, downloadURL]
        });
    }
    useEffect(() => {
        getSingleDocumentHandler()
    }, [merchant_id, imgUrl, previousImgUrl])
    return (
        <div className="page-wrapper">
            <div className="container-fluid">
                <div className='row' >

                    <div className='card'>
                        <div className='card-header bg-primary text-white'>
                            <p><Link to="/dashboard/profile" className='text-white'><i className='fa fa-arrow-left'></i> Back </Link><b>Previous Work Image</b></p>
                        </div>
                        <div className='card-body'>
                            <div className='row'>
                                {loading && (
                                    <>
                                        <div className='col-md-2 col-4'>
                                            <Skeleton count={1} style={{ height: '100px', width: '100px', borderRadius: '10px', margin: '1px' }} />
                                        </div>
                                        <div className='col-md-2 col-4'>
                                            <Skeleton count={1} style={{ height: '100px', width: '100px', borderRadius: '10px', margin: '1px' }} />
                                        </div>
                                        <div className='col-md-2 col-4'>
                                            <Skeleton count={1} style={{ height: '100px', width: '100px', borderRadius: '10px', margin: '1px' }} />
                                        </div>
                                        <div className='col-md-2 col-4'>
                                            <Skeleton count={1} style={{ height: '100px', width: '100px', borderRadius: '10px', margin: '1px' }} />
                                        </div>

                                    </>

                                )
                                }
                                {
                                    merchant?.PreviousWork?.slice(0, 4).reverse(merchant.PreviousWork).map((item, i) => {
                                        return (
                                            <div className='col-md-2 col-6'>
                                                <img src={item} style={{ height: '100px', width: '100px', borderRadius: '10px', border: '2px solid rgba(0,0,0,0.3)', margin: '1px' }} className='img__style' key={i} />
                                            </div>
                                        )
                                    })
                                }
                                <div className='col-md-2 col-6'>

                                    <input type="file" id="previous_input" hidden onChange={previousUploader} />
                                    <label for="previous_input" className=''>
                                        <div style={{ height: '100px', width: '100px', borderRadius: '10px', border: '2px solid rgba(0,0,0,0.3)', margin: '1px', display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', color: '#000' }}>
                                            <i className='fa fa-plus' style={{ fontSize: '22px' }}></i>
                                            Add More
                                        </div>
                                    </label>
                                </div>
                                <div className='col-md-2 col-6'>
                                    <Link to="/dashboard/previous-work-list" style={{ textDecoration: 'none' }}>
                                        <div style={{ height: '100px', width: '100px', borderRadius: '10px', border: '2px solid rgba(0,0,0,0.3)', margin: '1px', display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', color: '#000' }}>
                                            <i className='fa fa-search' style={{ fontSize: '22px' }}></i>
                                            View All
                                        </div>
                                    </Link>
                                </div>



                            </div>

                            <div className='row'>
                                {
                                    !previousImgUrl && previousImgProgress ?
                                        <div className="progress bg-white">
                                            <div className="progress-bar progress-bar-striped bg-success" role="progressbar" style={{ width: `${previousImgProgress}%` }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{progresspercent} %</div>
                                        </div>
                                        : ''
                                }
                            </div>
                        </div>
                    </div>





                </div>
            </div>
        </div>
    )
}

export default PreviousWorkSection