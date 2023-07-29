import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
// import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
// import { connectWallet } from '../../state/userSlice';
import { useSelector } from 'react-redux';
import { getBalance, getInfor, getUserData } from '../../state/selectors';
import { useDispatch } from 'react-redux';
import { Avatar } from "@mui/material";
import Container from '@mui/material/Container';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./css/Header.scss";
// import logo from "../../assets/imgs/logo1.png"
import logo from "../../assets/imgs/logoNew2.png"
import avatar from "../../assets/imgs/avatar.png";
import { FaCamera } from 'react-icons/fa';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { logout } from "../../state/userSlice";
import Draggable from 'react-draggable';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper } from '@mui/material'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CollectionsIcon from '@mui/icons-material/Collections';
import LogoutIcon from '@mui/icons-material/Logout';
import BackpackIcon from '@mui/icons-material/Backpack';
import { createAxios } from '../../utils/createInstance';
import { setInfor } from '../../state/userSlice';
import DCToken from '../../assets/imgs/DCToken.svg'
function PaperComponent(props) {
    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} />
        </Draggable>
    );
}

const Header = () => {
    //Connect Wallet    
    const walletAddress = useSelector(getUserData);
    const userInfor = useSelector(getInfor);
    console.log(walletAddress)
    let image = avatar;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [clogout, setClogout] = useState(false);
    const user = useSelector(getInfor)
    const balance = useSelector(getBalance)
    console.log("balance: ", balance)
    let axiosJWT = createAxios(user, dispatch, setInfor);
    const login = async () => {
        // if (walletAddress === "" || walletAddress === undefined) {
        //     console.log(walletAddress)
        //     dispatch(connectWallet(dispatch));
        // }
        if (!walletAddress) {
            navigate("/login");
        }
    };
    const openCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            console.log(stream)
            // Truy cập camera thành công, có thể thực hiện các thao tác khác tại đây
            // console.log('Truy cập camera thành công');
            toast.success('Truy cập camera thành công !');
        } catch (error) {
            // Xử lý lỗi truy cập camera
            toast.error('Truy cập camera thất bại');
            console.error('Lỗi truy cập camera:', error);
        }
    };
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (event, selection) => {
        console.log(selection)
        if (selection === "profile") {
            navigate("/user")
        }
        else if (selection === "album") {
            navigate("/album")
        }
        else if (selection === "logout") {
            setClogout(true);
        }
        else if (selection === "vouchers") {
            navigate("/vouchers")
        }
        setAnchorEl(null);
    };

    const confirmlogout = (event, check) => {
        if (check) {
            let token = user?.accessToken;
            dispatch(logout({ token, axiosJWT }, dispatch));
            navigate('/')
        }
        setClogout(false);
    }
    const [scrolled, setScrolled] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 0) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <header className={`header ${scrolled ? 'scrolled' : ''}`}>
            <Container maxWidth="lg">
                {/* <ToastContainer position="bottom-right"
                    type="success"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light" /> */}
                <div className="header__col1">
                    <NavLink className="header__link" to='/'>
                        <img id='logo' src={logo} alt="App Logo" />
                        <div>TourDC</div>
                    </NavLink>
                </div>
                <div className="header__col2">

                    <div className="header__ele header__ele--aboutus">
                        <NavLink className={({ isActive, isPending }) => isPending ? "header__link" : isActive ? "header__link--selected" : "header__link"} to='/'>
                            HOME
                        </NavLink>
                    </div>
                    <div className="header__ele header__ele--home">
                        <NavLink className={({ isActive, isPending }) => isPending ? "header__link" : isActive ? "header__link--selected" : "header__link"} to='/travel'>
                            TRAVEL
                        </NavLink>
                    </div>
                    {
                        walletAddress && walletAddress.length > 0 ?
                            <>
                                <div className="header__ele header__ele--forum">
                                    <NavLink className={({ isActive, isPending }) => isPending ? "header__link" : isActive ? "header__link--selected" : "header__link"} to='/forum'>
                                        FORUM
                                    </NavLink>
                                </div>
                                <div className="header__ele header__ele--shop">
                                    <NavLink className={({ isActive, isPending }) => isPending ? "header__link" : isActive ? "header__link--selected" : "header__link"} to='/shop'>
                                        SHOP
                                    </NavLink>
                                </div>
                            </> : ""
                    }
                    {
                        walletAddress && walletAddress.length > 0 ?
                            <div className="header__login__eles">
                                <div className="user__camera">
                                    <button className="camera-button" onClick={openCamera}>
                                        <FaCamera className="camera-icon" />
                                        CAMERA
                                    </button>
                                </div>
                            </div>
                            : ""
                    }
                    <div className={walletAddress && walletAddress.length > 0 ? "header__ele header__ele--connected" : "header__ele header__ele--login"} onClick={login}>
                        {walletAddress && walletAddress.length > 0
                            ? <Avatar className="header__avatar" src={userInfor?.avatar ? userInfor.avatar : image} alt="Avatar" aria-controls={open ? 'fade-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick} /> : "LOGIN"}
                        <Menu
                            id="fade-menu"
                            MenuListProps={{
                                'aria-labelledby': 'fade-button',
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            TransitionComponent={Fade}
                            disableScrollLock={true}
                        >
                            <MenuItem onClick={(event) => handleClose(event, "profile")}>
                                <div className="menu-wrapper">
                                    <AccountBoxIcon />
                                    Profile
                                </div>
                            </MenuItem>
                            <MenuItem onClick={(event) => handleClose(event, "album")}>
                                <div className="menu-wrapper">
                                    <CollectionsIcon />
                                    Album
                                </div>
                            </MenuItem>
                            <MenuItem onClick={(event) => handleClose(event, "vouchers")}>
                                <div className="menu-wrapper">
                                    <BackpackIcon />
                                    Vouchers
                                </div>
                            </MenuItem>
                            <MenuItem onClick={(event) => handleClose(event, "logout")}>
                                <div className="menu-wrapper">
                                    <LogoutIcon />
                                    Logout
                                </div>
                            </MenuItem>
                        </Menu>
                        {walletAddress ? <div className='balance'>
                            <div >Balance:</div>
                            <div className='balance-active'> {balance} </div>
                            <img className='token' src={DCToken}></img>
                        </div> : null}

                    </div>
                </div>
                <Dialog
                    disableScrollLock={true}
                    open={clogout}
                    onClose={confirmlogout}
                    PaperComponent={PaperComponent}
                    aria-labelledby="draggable-dialog-title"
                >
                    <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                        Đăng xuất
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Bạn có muốn đăng xuất không, hãy xác nhận thật kỹ?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={(event) => confirmlogout(event, 0)}>
                            Huỷ
                        </Button>
                        <Button onClick={(event) => confirmlogout(event, 1)}>Xác nhận</Button>
                    </DialogActions>
                </Dialog>
            </Container>

        </header >
    );
}

export default Header;