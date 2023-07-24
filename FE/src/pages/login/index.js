import './Login.css'
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { getUserData } from '../../state/selectors';
import { connectWallet } from '../../state/userSlice';
import metamask from '../../assets/imgs/MetaMask_Fox.svg.png'
// import { login } from '../../redux/apiRequest';
import { login } from '../../service/api';
import { setUser } from '../../state/userSlice';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const walletAddress = useSelector(getUserData);
    console.log("walletAddress: ", walletAddress);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
    const handleSubmit = async (event) => {
        event.preventDefault();
        

        const buttonValue = event.nativeEvent.submitter?.getAttribute('value');
        if(buttonValue == 'normal') {
            const validationErrors = {};
            if (!username.trim()) {
                validationErrors.email = 'Vui lòng nhập email.';
            } else if (!emailPattern.test(username.trim())){
                validationErrors.email = 'Email không hợp lệ';
            }
            if (!password.trim()) {
                validationErrors.password = 'Vui lòng nhập mật khẩu.';
            } else if (password.trim().length < 6) {
                validationErrors.password = 'Mật khẩu phải từ 6 kí tự trở lên';
            } else if (!passwordPattern.test(password.trim())) {
                validationErrors.password = 'Mật khẩu phải chứa ít nhất một chữ cái và một số';
            }
            if (Object.keys(validationErrors).length > 0) {
                // Nếu có lỗi, setErrors để hiển thị thông báo lỗi
                setErrors(validationErrors);
                console.log(errors)
            } else {
                // check with db
                let user = await login(username, password);
                console.log("datauser:", user.data);
                if(user) {
                    dispatch(setUser({ address: user.data.walletAddress, infor: user.data }));
                    navigate('/');
                }
                else {
                    validationErrors.invalid = "Email or password incorrect, please check!"
                    setErrors(validationErrors);
                }
            }
        }
        else if (buttonValue == 'metamask') {
            if (walletAddress === "" || walletAddress === undefined) {
                console.log("walletAddress: ", walletAddress)
                dispatch(connectWallet(dispatch));
                navigate('/')
            }
            // else {
            //     navigate('/')
            // }
        }
        
    };

    
    return (
        <div className='login'>
            <section>
                <div className="form-loginbox">
                    <div className="form-value">
                            <form onSubmit={handleSubmit}>
                                <h2>Login</h2>
                                <div className="inputbox">
                                    <input id='email' type="text" onChange={(event) => setUsername(event.target.value)} />
                                    <label>Email</label>
                                    
                                </div>
                                {errors.email ? <div className='error'>{errors.email}</div> : null}
                                <div className="inputbox">
                                    <input id='password' type="password" onChange={(event) => setPassword(event.target.value)} />
                                    <label>Password</label>
                                </div>
                                {errors.password ? <div className='error'>{errors.password}</div> : null}
                                {errors.invalid ? <div className='error'>{errors.invalid}</div> : null}
                                <button type="submit" value='normal' className='login-btn'>Log in</button>
                                
                                <button type="submit" value='metamask' className='login-btn1'>
                                    Connect MetaMask Account
                                    <img src={metamask} className='metamask' ></img>
                                </button>
                            <div className="register-block">        
                                <p>Don't have an account <a href="/register">Register</a></p>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
        
    )
}
export default Login;