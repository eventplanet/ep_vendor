import React, { useEffect, useRef, useState } from 'react'
import JoditEditor from 'jodit-react';
import { v4 as uuidv4 } from 'uuid';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc, getDoc } from 'firebase/firestore';
import init from './../firebase'
import { MdCloudUpload, MdDelete, MdAddAPhoto } from 'react-icons/md';
import { useUserAuth } from '../context/UserAuthContext';
import { AiFillFileImage } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ProductMgmt.css'
const AddProduct = () => {
    const [unitList, setUnitList] = useState([
        'piece', 'kg', 'gm', 'ml', 'liter', 'mm', 'ft', 'meter', 'sq.ft.', 'sq.meter', 'km', 'set', 'hour', 'day', 'bunch', 'bundle', 'month', 'year', 'services', 'work', 'packet', 'box', 'pound', 'dozen', 'gunta', 'pair', 'minute', 'quntal', 'ton', 'capsule', 'tablet', 'plate', 'inch', 'ounce', 'bottle', 'night', 'tour', 'package', 'event', 'suit'
    ])
    const { user } = useUserAuth();
    const merchant_id = user.uid;
    const [merchant, setMerchant] = useState({});

    const editor = useRef(null);
    const [content, setContent] = useState();
    const [img, setImg] = useState();
    const [image, setImage] = useState(null);
    const [fileName, setFileName] = useState('No selected file');
    const [imgUrl, setImgUrl] = useState(null);
    const [productImages, setProductImages] = useState([])
    const [progresspercent, setProgresspercent] = useState(0);
    const [data, setData] = useState({
        name: '',
        price: '',
        quantity: '',
        unit: '',
        discountPrice: '',
        timeDuration: ''
    })
    const formHandler = (e) => {

        const name = e.target.name;

        const value = e.target.value;

        setData({ ...data, [name]: value })

    }
    const imgHandler = () => {
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
                    setProductImages([...productImages, downloadURL])
                    setFileName("No selected File")
                    setImage(null)
                });
            }
        );
    }
    const getSingleDocumentHandler = async () => {
        try {
            const res = await getDoc(doc(init.db, "merchants", merchant_id));
            setMerchant(res.data());
        } catch (error) {
            console.log(`Error : ${error}`)
        }
    }
    useEffect(() => {
        getSingleDocumentHandler()
    }, [])
    const btnHandler = async () => {
        const { name, price, discountPrice, timeDuration, quantity, unit } = data;
        if (name != '' && price != '' && discountPrice != '' && quantity != '' && unit != '') {
            try {
                await setDoc(doc(init.db, "merchants", merchant_id), {
                    ...merchant,
                    products: [...merchant.products, {
                        name,
                        price,
                        quantity,
                        unit,
                        discountPrice,
                        timeDuration,
                        productDescription: content,
                        productImages
                    }]
                }, { merge: true });
                toast.success('Product Added successfully.')
                setData({
                    name: '',
                    price: '',
                    quantity: '',
                    unit: '',
                    discountPrice: '',
                    timeDuration: ''
                });
                setProductImages([])
                setContent('')

            } catch (err) {
                console.log(`Error ${err}`)
            }
        } else {
            toast.error('Please fill all the mandetary field')
        }

    }
    let percent = ((data.price - data.discountPrice) / data.price) * 100;
    return (
        <div className="page-wrapper">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className='card-header bg-white'>
                                <h3>Product Information</h3>
                            </div>
                            <div className='card-body'>
                                <div className='row product_mgmt'>

                                    <div className='col-md-12'>
                                        <div className="form-floating mb-3">
                                            <input type="text" className="form-control" id="floatingInput" placeholder="Product Name" name="name" value={data.name} onChange={formHandler} />
                                            <label htmlFor="floatingInput" className=''>Product Name</label>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <div className="form-floating mb-3">
                                                <input type="number" className="form-control" id="floatingInput" placeholder="Price" name="price" value={data.price} onChange={formHandler} />
                                                <label htmlFor="floatingInput" className=''>Price<span className='text-danger'>*</span></label>
                                            </div>
                                        </div>
                                        <div className='col-md-6'>
                                            <div className="form-floating mb-3">
                                                <input type="number" className="form-control" id="floatingInput" placeholder="DiscountPrice" name="discountPrice" value={data.discountPrice} onChange={formHandler} />
                                                <label htmlFor="floatingInput" className=''>Discount Price<span className='text-danger'>*</span></label>
                                            </div>
                                        </div>
                                    </div>
                                    {percent && (
                                        <div className='row'>
                                            <div className='col-md-12 d-flex justify-content-between'>
                                                <div>
                                                    Rs {data.discountPrice} <strike> Rs {data.price}</strike>
                                                </div>
                                                <div>
                                                    <span className="badge bg-warning text-dark">
                                                        {
                                                            (percent === NaN || percent === null || percent === undefined) ? 'ss' : (percent.toFixed(1))
                                                        }

                                                        %</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <div className="form-floating mb-3">
                                                <input type="number" className="form-control" id="floatingInput" placeholder="Quantity" name="quantity" value={data.quantity} onChange={formHandler} />
                                                <label htmlFor="floatingInput" min={1} className=''>Quantity<span className='text-danger'>*</span></label>
                                            </div>
                                        </div>
                                        <div className='col-md-6'>
                                            <div class="form-floating mb-3">
                                                <select class="form-select" id="floatingSelect" aria-label="Floating label select example" name="unit" onChange={formHandler}>
                                                    <option selected>Unit</option>
                                                    {unitList.map((item, index) => {
                                                        return (
                                                            <option value={item} key={index}>{item}</option>
                                                        )
                                                    })}
                                                </select>
                                                <label for="floatingSelect">Unit</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='col-md-12'>
                                            <p>Product Description <span className='text-danger'>*</span></p>
                                            <JoditEditor
                                                ref={editor}
                                                value={content}
                                                tabIndex={1} // tabIndex of textarea
                                                onBlur={newContent => setContent(newContent)}
                                                onChange={newContent => { }}
                                            />
                                        </div>
                                    </div>
                                    <div className='row mt-3'>
                                        <div className='col-md-12'>
                                            <div className="form-floating mb-3">
                                                <input type="text" className="form-control" id="floatingInput" placeholder="Product/Services Working Duration" name="timeDuration" value={data.timeDuration} onChange={formHandler} />
                                                <label htmlFor="floatingInput" className=''>Product/Services Working Duration<span className='text-danger'>*</span></label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-12'>
                                            <p>Product Image</p>
                                        </div>
                                        <div className='row'>
                                            <main className="previousWork">
                                                <div className='col-md-12'>
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
                                                                    <MdAddAPhoto color="#1475cf" size={30} />
                                                                    <p>Add Product Image</p>
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
                                                </div>
                                                {
                                                    !imgUrl && progresspercent ?
                                                        <div className="progress bg-white">
                                                            <div className="progress-bar progress-bar-striped bg-success" role="progressbar" style={{ width: `${progresspercent}%` }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{progresspercent} %</div>
                                                        </div>
                                                        : ''
                                                }
                                                <section className=''>
                                                    <input type="submit" className="btn btn-primary btn-sm" value="Upload Image" onClick={imgHandler} disabled={!image} />
                                                </section>
                                                {
                                                    productImages?.map((item, index) => {
                                                        return (
                                                            <img src={item} style={{ height: '100px', width: '100px', borderRadius: '5px', border: '2px dashed skyblue', margin: '5px', boxShadow: '0 3px 5px rgba(0,0,0,0.2)' }} key={index} />
                                                        )
                                                    })
                                                }


                                            </main>
                                        </div>
                                    </div>

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

export default AddProduct