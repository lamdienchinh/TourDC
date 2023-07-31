import React from 'react';
import logo from "../../assets/imgs/logo.png";
import "./css/Footer.scss";
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { getInfor } from '../../state/selectors';
const Footer = () => {
    const walletAddress = useSelector(getInfor);
    return (
        <footer className="footer">
            <Container maxWidth="lg">
                <div className="footer-content">
                    <div className="footer-logo">
                        <img src={logo} alt="Logo" />
                    </div>
                    <div className="footer-columns">
                        <div className="footer-column">
                            <h3>Liên hệ</h3>
                            <ul>
                                <li><i className="fas fa-envelope"></i> Email: info@example.com</li>
                                <li><i className="fas fa-phone-alt"></i> Điện thoại: (123) 456-7890</li>
                            </ul>
                        </div>
                        <div className="footer-column">
                            <h3>Bản đồ trang</h3>
                            <ul>
                                <li><Link to="/">Trang chủ</Link></li>
                                <li><Link to="/travel">Du lịch</Link></li>
                                {/* <li><Link to="/placeinfor">Place Information</Link></li> */}
                                {/* Add more links here */}
                                {walletAddress && (
                                    <React.Fragment>
                                        <li><Link to="/user">Thông tin cá nhân</Link></li>
                                        <li><Link to="/album">Albums</Link></li>
                                        <li><Link to="/trips">Chuyến đi</Link></li>
                                        <li><Link to="/forum">Diễn đàn</Link></li>
                                        <li><Link to="/shop">Quà tặng</Link></li>
                                        <li><Link to="/vouchers">Quà đã đổi</Link></li>
                                    </React.Fragment>
                                )}
                            </ul>
                        </div>
                        <div className="footer-column">
                            <h3>Mạng xã hội</h3>
                            <ul className="footer-social-links">
                                <li><a href="https://www.facebook.com/your-facebook-page" target="_blank" rel="noopener noreferrer"><FaFacebook />{` Facebook`}</a></li>
                                <li><a href="https://twitter.com/your-twitter-page" target="_blank" rel="noopener noreferrer"><FaTwitter />{` Twitter`} </a></li>
                                <li><a href="https://www.instagram.com/your-instagram-page" target="_blank" rel="noopener noreferrer"><FaInstagram />{` Instagram`} </a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Vietnam Blockchain Corporation 2023. All rights reserved.</p>
                </div>
            </Container>
        </footer>
    );
}

export default Footer;
