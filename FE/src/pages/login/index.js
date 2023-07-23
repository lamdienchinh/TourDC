import './Login.css'
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { getUserData } from '../../state/selectors';
import { connectWallet } from '../../state/userSlice';
import metamask from '../../assets/imgs/MetaMask_Fox.svg.png'
// import { login } from '../../redux/apiRequest';
function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const walletAddress = useSelector(getUserData);
    console.log("walletAddress: ", walletAddress);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const buttonValue = event.nativeEvent.submitter?.getAttribute('value');
        if(buttonValue == 'normal') {
            const newUser = {
                username: username,
                password: password
            }
            // login(newUser, dispatch, navigate)
        }
        else if (buttonValue == 'metamask') {
            if (walletAddress === "" || walletAddress === undefined) {
                console.log(walletAddress)
                dispatch(connectWallet(dispatch));
                navigate('/')
            }
            else {
                navigate('/')
            }
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
                                    <input type="text" onChange={(event) => setUsername(event.target.value)} />
                                    <label>Email</label>
                                </div>
                                <div className="inputbox">
                                    <input type="password" onChange={(event) => setPassword(event.target.value)} />
                                    <label>Password</label>
                                </div>
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