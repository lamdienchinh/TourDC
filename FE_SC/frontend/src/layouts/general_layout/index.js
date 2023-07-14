import { useEffect } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";
import Header from "../header";
import Footer from "../footer";
import { Outlet } from "react-router-dom";
import Fireflies from "../../components/fireflies";
import "./css/General_layout.scss";

const GeneralLayout = () => {



    useEffect(() => {
        const backToTopBtn = document.getElementById('back-to-top-btn');

        const handleScroll = () => {
            if (window.scrollY > 100) {
                backToTopBtn.style.display = 'block';
            } else {
                backToTopBtn.style.display = 'none';
            }
        };

        const scrollToTop = () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        };

        if (backToTopBtn) {
            window.addEventListener('scroll', handleScroll);
            backToTopBtn.addEventListener('click', scrollToTop);
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
            backToTopBtn.removeEventListener('click', scrollToTop);
        };
    }, []);

    return (
        <div className="wrapper">
            <Header />
            <Outlet />
            <Fireflies />
            <button id="back-to-top-btn"><AiOutlineArrowUp /></button>
            <Footer />
        </div>
    );
};

export default GeneralLayout;
