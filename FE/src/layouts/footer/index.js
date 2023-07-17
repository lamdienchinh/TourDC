import logo from "../../assets/imgs/logo.png";
import "./css/Footer.scss";
import Container from '@mui/material/Container';

const Footer = () => {
    return (
        <footer className="footer">
            <Container maxWidth="lg">
                <div className="footer-content">
                    <div className="footer-logo">
                        <img src={logo} alt="Logo" />
                    </div>
                    <nav className="footer-links">

                    </nav>
                    <div className="footer-social">

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