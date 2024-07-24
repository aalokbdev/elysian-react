import { useState } from 'react';
import './Login.css';
import Welcome from './Welcome.tsx';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import EmailIcon from '../assets/emailIcon.svg'
import LockIcon from '../assets/lockIcon.svg'
import ViewIcon from '../assets/viewIcon.svg'
import FacebookIcon from '../assets/facebookIcon.svg'
import GoogleIcon from '../assets/googleIcon.svg'
import LogoBlue from '../assets/logoBlue.png'
const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({ email: '', password: '' });
    const [inputType, setInputType] = useState('password');

    // console.log("env PY : ", process.env);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const toggleInputType=()=>{
        if(inputType==='password'){
            setInputType('text');
        }else{
            setInputType('password');
        }
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        let errors = { email: '', password: '' };
        if (!formData.email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email is invalid';
        }
        if (!formData.password) {
            errors.password = 'Password is required';
        } else if (formData.password.trim().length < 8) {
            errors.password = 'Password must be at least 8 characters long!';
        }
        if (errors.email != '' || errors.password != '') {
            setErrors(errors);
            return;
        }

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${import.meta.env.VITE_PY_BASE_URL}/api/auth/login/`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: { username: formData.email, password: formData.password }
        };

        axios.request(config)
            .then((response: any) => {
                toast.success('Login successful!');
                setFormData({ email: '', password: '' });
                setErrors({ email: '', password: '' });
                const expInTime = new Date(new Date().getTime() + 2 * 60 * 1000); // will expire in 2 min
                Cookies.set('token', response.data.data.token, { expires: expInTime });
            })
            .catch((error: any) => {
                toast.error(`${error.response.data.error}`);
            });
    }
    return (
        <div className='main-container'>
            <div className="login-container">
                <Welcome />
                <div className="login-form">
                    <div className='comm-wrapper'>
                        <div className='resp-welcome-header'>
                            <img src={LogoBlue} alt='Logo' />
                        </div>
                        <h2>Log In</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="input-group">
                                <img src={EmailIcon} alt='Email' />
                                <input className='input' type='text' placeholder="Email" name="email" onChange={handleChange} value={formData.email} required />
                                {errors.email && <p className="error">{errors.email}</p>}
                            </div>
                            <div className="input-group">
                                <img src={LockIcon} alt='Lock' />
                                <input className='input' type={inputType} placeholder="Password" name='password' onChange={handleChange} value={formData.password} required />
                                {errors.password && <p className="error">{errors.password}</p>}
                                <img src={ViewIcon} alt='View' className='view-icon' onClick={toggleInputType} />
                            </div>
                            <div className="forgot-password">
                                <a href="#">Forgot password?</a>
                            </div>
                            <button type="submit" className="login-button">Log In</button>
                        </form>
                        <div className="or-text">
                            <p>Or</p>
                        </div>
                        <div className="social-login">
                            <button className="google-login">
                                <img src={GoogleIcon} alt='Google' />
                                Google
                            </button>
                            <button className="facebook-login">
                                <img src={FacebookIcon} alt='Facebook' />
                                Facebook
                            </button>
                        </div>
                        <div className="register">
                            <p>Have no account yet?</p>
                            <div>
                                <Link to='/signup'>Register</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
