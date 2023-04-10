import React, { useState, useRef, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import JoditEditor from 'jodit-react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import init from './../firebase'
import { useUserAuth } from '../context/UserAuthContext';

const DescribeBusiness = () => {
    const { user } = useUserAuth();
    const merchant_id = user.uid;

    const editor = useRef(null);
    const [content, setContent] = useState();
    console.log(content)
    const [merchant, setMerchant] = useState({});

    const getSingleDocumentHandler = async () => {
        try {
            const res = await getDoc(doc(init.db, "merchants", merchant_id));
            setMerchant(res.data());
            setContent(res.data().describeBusiness);
        } catch (error) {
            console.log(`Error ${error}`)
        }
    }
    useEffect(() => {
        getSingleDocumentHandler()
    }, [merchant_id])

    const btnHandler = async () => {
        const regex = /(<([^>]+)>)/ig;
        let result = content?.replace(regex, '');
        if (result === '') {
            toast.error(`Please Describe Your business in few words`);
        } else {
            try {
                await setDoc(doc(init.db, "merchants", merchant_id), {
                    ...merchant,
                    describeBusiness: content

                }, { merge: true });
                toast.success('Data Updated Successfully');
            } catch (err) {
                console.log(err);
            }
        }
    }
    return (
        <div className="page-wrapper">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className='card-header bg-white'>
                                <p><b>Describe Your Business and Services</b></p>
                            </div>
                            <div className='card-body'>
                                <JoditEditor
                                    ref={editor}
                                    value={content}
                                    tabIndex={1} // tabIndex of textarea
                                    onBlur={newContent => setContent(newContent)}
                                    onChange={newContent => { }}
                                />
                                <div className="form-group mb-3 mt-3">
                                    <center><button className="btn btn-primary" onClick={btnHandler}>Submit</button></center>
                                </div>


                                <ToastContainer />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default DescribeBusiness