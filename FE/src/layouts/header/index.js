import { NavLink } from 'react-router-dom';
import { useState } from 'react';
// import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { connectWallet } from '../../state/userSlice';
import { useSelector } from 'react-redux';
import { getUserData } from '../../state/selectors';
import { useDispatch } from 'react-redux';
import { Avatar } from "@mui/material";
import Container from '@mui/material/Container';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./css/Header.scss";
import logo from "../../assets/imgs/logo1.png"
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
    let walletAddress = useSelector(getUserData);
    let image = avatar;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [clogout, setClogout] = useState(false);

    const login = async () => {
        if (walletAddress === "") {
            console.log(walletAddress)
            dispatch(connectWallet(dispatch));
            // toast.success('Kết nối ví Metamask thành công !');
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
        setAnchorEl(null);
    };

    const confirmlogout = (event, check) => {
        if (check) {
            dispatch(logout(dispatch));
            navigate('/')
        }
        setClogout(false);
    }

    return (
        <header className="header">
            <ToastContainer position="top-right"
                type="success"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light" />
            <Container maxWidth="lg">
                <div className="header__col1">
                    <NavLink className="header__link" to='/'>
                        <img src={logo} alt="App Logo" />
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
                            <div>
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
                            ? <Avatar className="header__avatar" src={image} alt="Avatar" aria-controls={open ? 'fade-menu' : undefined}
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
                            <MenuItem onClick={(event) => handleClose(event, "logout")}>
                                <div className="menu-wrapper">
                                    <LogoutIcon />
                                    Logout
                                </div>
                            </MenuItem>
                        </Menu>
                    </div>
                </div>
            </Container>
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
        </header >
    );
}

export default Header;