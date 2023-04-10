import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import init from './firebase'
import { signInWithEmailAndPassword } from 'firebase/auth';
import './Home.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUser, FaLock, FaEyeSlash, FaEye } from "react-icons/fa";
import Header from './Header';
import Footer from './Footer';
const Home = () => {
    let navigate = useNavigate();
    const [hide, setHide] = useState(false);
    const [data, setData] = useState({
        email: '',
        password: '',
    });
    const formHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData({ ...data, [name]: value })
    }
    const Icon = () => {
        if (hide) {
            return <FaEyeSlash />
        } else {
            return <FaEye />
        }
    }
    const loginHandler = async (e) => {
        e.preventDefault()
        const { email, password } = data;
        if (email === '') {
            toast.error('Email field is required');

        } else if (password === '') {
            toast.error('Password field is required');
        } else {
            const auth = init.auth;
            try {
                const user = await signInWithEmailAndPassword(
                    auth, email, password
                );
                //console.log(user.user.uid);
                toast.success('successfully logged in');
                navigate('dashboard/profile');
            }
            catch (error) {
                toast.error(error.message)
                setData({
                    password: '',
                })
            }
        }

    }
    const signInBtnHandler = () => {
        navigate('/category');
    }
    return (
        <>
            <Header />
            <div className="section login__screen">
                <div className="container">
                    <div className="row py-5 d-flex align-items-center">
                        <div className="col-md-6">
                            <h1>Expand your business !</h1>
                            <p>Display your services on our industy website.</p>
                            <a className="btn sign_up" onClick={signInBtnHandler}>Sign Up</a>
                        </div>
                        <div className="col-md-6">
                            <div className="login_form">
                                <h3 className="heading">Vendor Login</h3>
                                <form onSubmit={loginHandler}>
                                    <div className="input">
                                        <FaUser className="icon" />
                                        <input type="text" placeholder="email" onChange={formHandler} name="email" value={data.email} />
                                    </div>
                                    <div className="input">
                                        <FaLock className="icon" />
                                        <input type={hide ? "text" : "password"} placeholder="password" onChange={formHandler} name="password" value={data.password} autoComplete="off" />
                                        <div onClick={() => setHide(!hide)}>
                                            <Icon />
                                        </div>

                                    </div>
                                    <center><button type="submit" className="btn" >Login</button></center>
                                    <a href="/" className="forget">forget username/password</a>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <Footer />
            <ToastContainer />
        </>
    )
}

export default Home