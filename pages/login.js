import React, { useState } from 'react';
import Image from "next/image";
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { setToken } from '../redux/reducers/authSlice';
import { useForm } from "react-hook-form";

const Login = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const [showPass, setShowPass] = useState(false);
    
    const { register: login, handleSubmit: handleSubmitForm, formState: { errors: errorsLogin } } = useForm({
        shouldFocusError: false,
    });

    const onLoginSubmit = async (dataForm) => {
        console.log('success !', dataForm);
        try {
            const response = await fetch('https://api.2290onlineform.com/api/manageUser/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataForm),
            });
            const data = await response.json();
            if (response.ok && data.token) {
                dispatch(setToken(data.token));
                localStorage.setItem('token', data.token);
                router.push('/dashboard');
            } else {
                alert('Invalid username or password');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };
 
    const handleShowPass = (e) => {
        e.preventDefault();
        setShowPass(!showPass);
    }

    return (
        <div className="login_page">
            <div className="login_container">
                <div className="login_inner">
                    <Image
                        priority="true"
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
                        <form onSubmit={handleSubmitForm(onLoginSubmit)}>
                            <div className={errorsLogin?.email?.type === "required" || errorsLogin?.email?.type === "pattern" ? "form_block has_error" : "form_block"}  >
                                <div className="login_label">Email address</div>
                                <input placeholder="Email" className="form_input" name="email" {...login("email", { required: true, pattern: /^\S+@\S+$/i })} />
                                {errorsLogin?.email?.type === "pattern" ? <p className="form_error email-info" >invalid Email</p> :
                                    <p className="form_error" >This field is required</p>}
                            </div>
                            <div className={errorsLogin?.password?.type === "required" ? "form_block has_error" : "form_block"}  >
                                <div className="login_label">Password</div>
                                <input   type={showPass ? 'text' : 'password'} placeholder="Password" autoComplete="on" className="form-control" name="password" {...login("password", { required: true })} />
                                <a href="/#"
                                    className="icon-showPass switch_pass"
                                    onClick={(e) => handleShowPass(e)}
                                > </a>
                                <p className="form_error" >This field is required</p>
                            </div>

                            <div className='remember_line'>
                                <input type="checkbox" id="remember_me" />
                                <label htmlFor="remember_me">Remember me</label>
                                <a href="/#" className="forgot_pass">Forgot Password?</a>
                            </div>
                            <button
                                type="submit"
                                className='submit_btn'
                            >
                                Log In
                            </button>
                        </form>
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
