import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import init from './../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { MdCloudUpload, MdDelete } from 'react-icons/md';
import { AiFillFileImage } from 'react-icons/ai';
import { useUserAuth } from '../context/UserAuthContext';
import './PreviousWork.css'
const PreviousWork = () => {
    const { user } = useUserAuth();
    const merchant_id = user.uid;
    //custom
    const [img, setImg] = useState();
    const [image, setImage] = useState(null);
    const [fileName, setFileName] = useState('No selected file');
    const [merchant, setMerchant] = useState({});
    const [imgList, setImgList] = useState([]);
    const [imgUrl, setImgUrl] = useState(null);
    const [progresspercent, setProgresspercent] = useState(0);

    const getSingleDocumentHandler = async () => {
        try {
            const res = await getDoc(doc(init.db, "merchants", merchant_id));
            setMerchant(res.data());
            setImgList(res.data().PreviousWork);
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
    const btnHandler = (e) => {
        // const file = fileName;
        // const fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length);
        const file = img[0];
        const fileExtension = file.name.split('.').pop();
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
                    setImgUrl(downloadURL);
                    updateSingleDocumentHandler(downloadURL);
                    setFileName("No selected File")
                    setImage(null)
                });
            }
        );
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
    return (
        <div className="page-wrapper">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className='card-header bg-white'>
                                <p><b>My Previous Work</b></p>
                            </div>
                            <div className='card-body'>
                                <main className="previousWork">
                                    <form action="" onClick={() => document.querySelector('.input-field').click()} >
                                        <input type="file" accept='image/*' className='input-field' hidden
                                            onChange={({ target: { files } }) => {
                                                files[0] && setFileName(files[0].name)
                                                if (files) {
                                                    setImage(URL.createObjectURL(files[0]))
                                                    setImg(files);
                                                }
                                            }}
                                        />
                                        {
                                            image ?
                                                <img src={image} width={180} height={180} alt={fileName} style={{ objectFit: 'contain' }} />
                                                :
                                                <>
                                                    <MdCloudUpload color="#1475cf" size={60} />
                                                    <p>Browse File to Upload</p>
                                                </>
                                        }
                                    </form>
                                    <section className='uploaded-row'>
                                        <AiFillFileImage color='#1475cf' />
                                        <span>
                                            {/* {fileName} */}
                                            {fileName.length > 30 ? fileName.slice(0, 30).toLowerCase() + '...' : fileName.toLowerCase()}
                                            <MdDelete onClick={() => {
                                                setFileName("No selected File")
                                                setImage(null)
                                            }} />
                                        </span>
                                    </section>
                                    <section className='upload-btn'>
                                        <input type="submit" value="Upload" onClick={btnHandler} disabled={!image} />
                                    </section>
                                </main>
                                {
                                    !imgUrl && progresspercent ?
                                        <div className="progress bg-white">
                                            <div className="progress-bar progress-bar-striped bg-success" role="progressbar" style={{ width: `${progresspercent}%` }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{progresspercent} %</div>
                                        </div>
                                        : ''
                                }

                                <div className='row'>
                                    {imgList?.map((res, index) => {
                                        return (
                                            <div className="col-md-3 col-sm-6 col-6" key={index}>
                                                <div className="img_box">
                                                    <img src={res} alt="" style={{ border: '1px solid red', }} />
                                                    <div className='close_btn' onClick={() => deleteBtnHandler(index)}>
                                                        x
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default PreviousWork