import { useState } from 'react'
import Welcome from './Welcome';
import './SignUp.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import EmailIcon from '../assets/emailIcon.svg'
import LockIcon from '../assets/lockIcon.svg'
import ViewIcon from '../assets/viewIcon.svg'
import FacebookIcon from '../assets/facebookIcon.svg'
import GoogleIcon from '../assets/googleIcon.svg'
import UserIcon from '../assets/userIcon.svg'
import LogoBlue from '../assets/logoBlue.png'

const SignUp = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [inputType, setInputType] = useState('password');

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const toggleInputType = () => {
    if (inputType === 'password') {
      setInputType('text');
    } else {
      setInputType('password');
    }
  }

  const handleNodeApi = async () => {
    let config = {
      method: 'post',
      url: `${import.meta.env.VITE_NODE_BASE_URL}/get-message`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: {}
    };

    axios.request(config)
      .then((response) => {
        toast.success(response.data.msg, { position: "bottom-right" });
      })
      .catch((error) => {
        toast.error(`${error.response.data.error}`, { position: "bottom-right" });
      });
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    let errors = { username: '', email: '', password: '', confirmPassword: '' };
    if (!formData.username) {
      errors.username = 'Username is required!'
    } else if (formData.username.trim().length < 3) {
      errors.username = 'Username must be at least 3 characters long!'
    }
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
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Confirm password is required';
    } else if (formData.confirmPassword.trim().length < 8) {
      errors.confirmPassword = 'Password must be at least 8 characters long!';
    } else if (formData.confirmPassword != formData.password) {
      errors.confirmPassword = 'Password did not match';
    }
    if (errors.username != '' || errors.email != '' || errors.password != '' || errors.confirmPassword != '') {
      setErrors(errors);
      return;
    }

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_PY_BASE_URL}/api/auth/signup`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: formData
    };

    axios.request(config)
      .then(async (response) => {
        console.log(response)
        toast.success('Registration successful!');
        await handleNodeApi();
        setFormData({ username: '', email: '', password: '', confirmPassword: '' });
        setErrors({ username: '', email: '', password: '', confirmPassword: '' });
      })
      .catch((error) => {
        toast.error(`${error.response.data.error}`);
      });
  }
  return (
    <div className='main-container'>
      <div className="login-container">
        <Welcome />
        <div className="signup-form">
          <div className='comm-wrapper'>
            <div className='resp-welcome-header'>
              <img src={LogoBlue} alt='Logo' />
            </div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <img src={UserIcon} alt='User' />
                <input type="text" placeholder="Enter username" name="username" onChange={handleChange} value={formData.username} />
                {errors.username && <p className="error">{errors.username}</p>}
              </div>
              <div className="input-group">
                <img src={EmailIcon} alt='Email' />
                <input type="text" placeholder="Enter email" name='email' onChange={handleChange} value={formData.email} />
                {errors.email && <p className="error">{errors.email}</p>}
              </div>
              <div className="input-group">
                <img src={LockIcon} alt='Lock' />
                <input type={inputType} placeholder="Enter password" name="password" onChange={handleChange} value={formData.password} />
                {errors.password && <p className="error">{errors.password}</p>}
                <img src={ViewIcon} alt='View' className='view-icon' onClick={toggleInputType}/>
              </div>
              <div className="input-group">
                <img src={LockIcon} alt='Lock' />
                <input type="password" placeholder="Enter confirm password" name="confirmPassword" onChange={handleChange} value={formData.confirmPassword} />
                {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
              </div>
              <div className="forgot-password">
                <a href="#">Forgot password?</a>
              </div>
              <button type="submit" className="signup-button" >Sign Up</button>
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
              <p>Already have an account?</p>
              <div>
                <Link to='/login'>Login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
