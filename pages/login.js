
import Image from "next/image";
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

const Login = () => {
    const router = useRouter();
    const [showPass, setShowPass] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        validateForm();
    }, [email, password]);

    const validateForm = () => {
        let errors = {};
        if (!email) {
            errors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Email is invalid.';
        }
        if (!password) {
            errors.password = 'Password is required.';
        } else if (password.length < 6) {
            errors.password = 'Password must be at least 6 characters.';
        }
        setErrors(errors);
        if (errors.email || errors.password) {
            setIsFormValid(false);
        } else {
            setIsFormValid(true);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isFormValid) {
            console.log('Form submitted successfully!');
            try {
                const response = await fetch('https://api.2290onlineform.com/api/manageUser/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });
                if (response.ok) {
                    console.log(response)
                    router.push('/dashboard');
                } else {
                    alert('Invalid username or password');
                }
            } catch (error) {
                console.error('An error occurred:', error);
            }

        } else {
            console.log('Form has errors. Please correct them.');
        }
    };

    const handleShowPass = (e) => {
        e.preventDefault();
        setShowPass(!showPass)
    }

    return (
        <div className="login_page">
            <div className="login_container">
                <div className="login_inner">
                    <Image
                        className="login_img"
                        src="/images/logo.png"
                        alt="Example Image"
                        width={264}
                        height={90}
                    />
                    <h1 className="login_title"><span>Sign In</span>To Your Account</h1>
                    <div className="login_description">
                        You’re about to e-file your <span>Form 2290 </span>with the most
                        knowledgeable tax experts in the industry.
                    </div>
                    <div className="login_form">
                        <div className={!errors.email ? 'form_block' : 'form_block has_error'}>
                            <div className="login_label">Email address</div>
                            <input
                                className='form_input'
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <p className='form_error'>{errors.email}</p>
                        </div>
                        <div className={!errors.password ? 'form_block' : 'form_block has_error'}>
                            <div className="login_label">Password</div>
                            <input
                                className='form_input'
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type={showPass ? 'text' : 'password'}
                            />
                            <a href="/#"
                                className="icon-showPass switch_pass"
                                onClick={(e) => handleShowPass(e)}
                            > </a>
                            <p className='form_error'>{errors.password}</p>
                        </div>
                        <div className='remember_line'>
                            <input type="checkbox" id="remember_me" />
                            <label htmlFor="remember_me">Remember me</label>
                            <a href="/#" className="forgot_pass">Forgot Password?</a>
                        </div>
                        <button
                            className='submit_btn'
                            style={{ opacity: isFormValid ? 1 : 0.5 }}
                            disabled={!isFormValid}
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                        <div className="login_links">
                            By logging in, you agree to our <a href="/#">Privacy Policy</a> and  <a href="/#">Terms of Use</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
