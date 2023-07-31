import "./Register.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
import { register } from "../../service/api";
import { createAccountAddress } from "../../service/api";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Register() {
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [phonenumber, setPhonenumber] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [address, setAddress] = useState('')
    const [privateKey, setPrivateKey] = useState('')
    const [errors, setErrors] = useState({});
    const [valid, setValid] = useState("")
    const navigate = useNavigate()
    // const dispatch = useDispatch();
    const [show, setShow] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(address)
        const validationErrors = {};
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
        const addressPattern = /^0x[a-fA-F0-9]{40}$/;
        const phonePattern = /[0-9]+/;
        if (!firstname.trim()) {
            validationErrors.firstname = 'Vui lòng nhập tên.';
        }
        if (!lastname.trim()) {
            validationErrors.last = 'Vui lòng nhập tên.';
        }
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
        if (phonenumber) {
            if (!phonePattern.test(phonenumber)) {
                validationErrors.phone = 'Số điện thoại không hợp lệ';
            }
        }
        if (address) {
            console.log('hello')
            if (!addressPattern.test(address.trim())) {
                validationErrors.address = 'Địa chỉ ví sai định dạng';
            }
        }
        if (Object.keys(validationErrors).length > 0) {
            // Nếu có lỗi, setErrors để hiển thị thông báo lỗi
            setErrors(validationErrors);
            console.log(errors)
        } else {
            try {
                const NewUSer = {
                    firstName: firstname, 
                    lastName: lastname,
                    phonenumber: phonenumber,
                    password: password,
                    email: username,
                    walletAddress: address,
                    privateKey: privateKey
                }
                let user = await register(NewUSer);
                console.log(user.response)
                if (user.response) {
                    if (user.response.status === 409) {
                        setValid(user.response.data.message);
                        console.log(valid)
                    }
                } else {
                    setShow(true)
                    // navigate('/login');
                }
            } catch (error) {
                console.log("error: ", error)
                alert('Đăng ký tài khoản thất bại');
                navigate('/register')    
            }
        }
        
    };
    const createNewAccount = async () => {
        let account = await createAccountAddress();
        setAddress(account.address)
        setPrivateKey(account.privateKey)
        console.log('account: ', account)
        console.log('address: ', address)
    }
    useEffect(()=>{
        if(address === undefined || address === '') {
            createNewAccount();
        }
    }, [address]); // eslint-disable-line react-hooks/exhaustive-deps
   
    const handleClose = () => setShow(false);
    
    return (
        <>
        <div className='register'>
            <section>
                <div className="form-box">
                    <div className="form-value">
                        <form onSubmit={handleSubmit}>
                            <h2>Đăng ký</h2>
                            <div className="box-name">
                                <div className="inputbox">
                                    <input type="text" onChange={(event) => setFirstname(event.target.value)} />
                                    <label >Tên</label>
                                    
                                </div>
                                
                                <div className="inputbox">
                                    <input type="text" onChange={(event) => setLastname(event.target.value)} />
                                    <label >Họ và tên lót</label>
                                </div>
                            </div>
                            {errors.firstname ? <div className='error'>{errors.firstname}</div> : null}
                            {errors.lastname ? <div className='error'>{errors.lastname}</div> : null}   
                            <div className="inputbox">
                                <input type="text" placeholder="Optional" onChange={(event) => setPhonenumber(event.target.value)} />
                                <label>Số điện thoại</label>
                            </div>
                            {errors.phone ? <div className='error'>{errors.phone}</div> : null}
                            <div className="inputbox">
                                <input type="text" onChange={(event) => setUsername(event.target.value)} />
                                <label>Email</label>
                            </div>
                            {errors.email ? <div className='error'>{errors.email}</div> : null}
                            <div className="inputbox">
                                <input type="password" onChange={(event) => setPassword(event.target.value)} />
                                <label >Mật khẩu</label>
                            </div>
                            {errors.password ? <div className='error'>{errors.password}</div> : null}
                            <div className="inputbox">
                                <input type="" placeholder="Optional" onChange={(event) => setAddress(event.target.value)} />
                                <label > địa chỉ Metamask </label>
                            </div>
                            {valid ? <div className='error'>{valid}</div> : null}
                            {errors.address ? <div className='error'>{errors.address}</div> : null}
                            <div className="register-btn-wrap">
                                <button className="sign-up">Đăng ký</button>
                                <div>
                                    <Link className ="register-link" to="/login">Đã có tài khoản</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
        
        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
        > 
            <Modal.Header closeButton>
            <Modal.Title>Tài khoản được cấp thành công ! </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div style={{fontWeight: "bold",margin:"10px"}}>
                Hãy lưu lại những thông tin quan trọng sau !!!
                <div style={{fontWeight: "bold",margin:"10px"}}>
                    - Sử dụng Public key cho các giao dịch trên ứng dụng. 
                </div>
                <div style={{fontWeight: "bold",margin:"10px"}}>
                    - Không chia sẻ Private Key cho bất kì ai.
                </div>
            </div>
            
            <div style={{textDecoration: "underline", fontWeight: "bold", display: "flex", justifyContent: "center"}}>Public Key: </div>
            <div style={{color: "red",margin:"10px", border: "0.1px solid black", padding: "10px"}}>{address}</div>
            <div style={{textDecoration: "underline", fontWeight: "bold", display: "flex", justifyContent: "center"}}>Private Key: </div>
            <div style={{color: "red",margin:"10px", border: "0.1px solid black", padding: "10px"}}>{privateKey} </div>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Link to="/login"><Button variant="primary">Đã hiểu</Button></Link>
            </Modal.Footer>
        </Modal>
        
    </>
    )
}
export default Register;