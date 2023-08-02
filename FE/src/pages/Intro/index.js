import "./css/Intro.scss";
// import plane from "../../assets/imgs/plane.png"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import avt from "../../assets/imgs/avatar.png"
// import place1 from "../../assets/imgs/place1.png"
// import place2 from "../../assets/imgs/place2.jpg"
import Slider from 'react-slick';
import { Avatar } from "@mui/material";
import Container from "@mui/material/Container";
// import DCToken from '../../assets/imgs/DCToken-home.svg'
import DCToken from '../../assets/imgs/logoNew3.png'
import axios from "axios"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import place from "../../constants"
import TravelAnimation from "../../components/travel_animation";
import Backdrop from '@mui/material/Backdrop';
import Loading from "../../components/loading"
const Review = ({ review }) => {
    return (
        <div className="review-wrapper">
            <div className="review-content">{review.description}</div>
            <div className="review-avatar">
                <Avatar sx={{ width: 56, height: 56 }} src={review.user.avatar}></Avatar>
            </div>
            <div className="review-name">{`${review.user.firstName} ${review.user.lastName}`} </div>
            <div className="review-place">{place.placenames[review.placeid - 1]}</div>
            <div className="review-time">{review.reviewtime}</div>
        </div >
    );
}
const Intro = () => {
    const [isLoading, setIsLoading] = useState(true)
    const handleClose = () => {
        setIsLoading(false);
    };
    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        cssEase: "linear"
    };
    const navigate = useNavigate()
    const [places, setPlaces] = useState([])
    const [reviews, setReviews] = useState([])
    const handleClick = (placeid) => {
        console.log(placeid)
        navigate(`./placeinfor?placeid=${placeid}`)
    }
    useEffect(() => {
        const fetchPlaces = async () => {
            let places = await axios.get(`${process.env.REACT_APP_ENDPOINT}/v1/place/getfour`)
            console.log(places)
            setPlaces(places.data)
            let reviews = await axios.get(`${process.env.REACT_APP_ENDPOINT}/v1/trip/getfour`)
            console.log(reviews)
            setReviews(reviews.data)
            handleClose()
        }
        fetchPlaces()

    }, [])
    return (
        <div className="intro-wrapper" >
            <Backdrop
                sx={{ color: '#fffff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
                onClick={handleClose}
            >
                <Loading></Loading>
                {/* <CircularProgress color="inherit" /> */}
            </Backdrop>
            <section className="intro-section intro-first">
                <div className="bg-img">
                    <Container maxWidth="lg">
                        <div className="intro-flex">
                            <div className="intro-content">
                                {/* <div className="intro-plane"><img src={plane} alt="Máy bay"></img></div> */}
                                {/* <div className="name-home"> */}
                                <h1 className="intro-name">TOURDC</h1>
                                {/* </div> */}
                                <h6>Ứng dụng du lịch áp dụng công nghệ Blockchain</h6>
                                {/* <button className="intro-tohome btn-home" onClick={() => window.location.replace('/home')}>Khám phá ngay</button> */}
                                <a href="/travel" class="animated-button1 ">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <div className="button-text">Khám phá ngay</div>
                                </a>
                            </div>
                            <div ><img className='token-home' src={DCToken} alt="Ảnh"></img></div>
                        </div>

                        {/* <div className="intro-img1">
                            <img src={place1} alt="Ảnh"></img>
                        </div>
                        <div className="intro-img2">
                            <img src={place2} alt="Ảnh"></img>
                        </div> */}
                        <div className="intro-description">
                            <div>
                                <div className="intro-description-1">10</div>
                                <div className="intro-description-2">Năm thành lập</div>
                            </div>
                            <div>
                                <div className="intro-description-1 intro-des">2K+</div>
                                <div className="intro-description-2">Địa điểm tuyệt vời</div>
                            </div>
                            <div>
                                <div className="intro-description-1 intro-des">10K+</div>
                                <div className="intro-description-2">Khách hàng</div>
                            </div>
                            <div>
                                <div className="intro-description-1 intro-des">4.7</div>
                                <div className="intro-description-2">Đánh giá tổng quát</div>
                            </div>
                        </div>
                    </Container>
                </div>
            </section >
            <section className="intro-section intro-two">
                <div className="intro-two-overlay">
                    <Container maxWidth="lg">
                        <div className="intro-two__title">
                            <h1>Những điểm đến phổ biến</h1>
                            <h4>Đây là những địa điểm được nhiều người yêu thích nhất trong tháng này</h4>
                        </div>
                        {
                            places && places.length === 4 ? <div className="intro-two-places">
                                <div className="popular-place pp1" style={{ backgroundImage: `url(${places[0]?.thumbnail})` }}>
                                    <div className="pp-text-overlay">
                                        <h1>{places[0]?.name}</h1>
                                        <span>{places[0]?.intro}</span>
                                    </div>
                                    <div className="place__onhover">
                                        <button className="place__onhover__btn" onClick={() => handleClick(places[0].placeid)}>Khám phá ngay</button>
                                    </div>
                                </div>
                                <div className="popular-place pp1" style={{ backgroundImage: `url(${places[1]?.thumbnail})` }}>
                                    <div className="pp-text-overlay">
                                        <h1>{places[1]?.name}</h1>
                                        <span>{places[1]?.intro}</span>
                                    </div>
                                    <div className="place__onhover">
                                        <button className="place__onhover__btn" onClick={() => handleClick(places[1].placeid)}>Khám phá ngay</button>
                                    </div>
                                </div>
                                <div className="popular-place pp1" style={{ backgroundImage: `url(${places[2]?.thumbnail})` }}>
                                    <div className="pp-text-overlay">
                                        <h1>{places[2]?.name}</h1>
                                        <span>{places[2]?.intro}</span>
                                    </div>
                                    <div className="place__onhover">
                                        <button className="place__onhover__btn" onClick={() => handleClick(places[2].placeid)}>Khám phá ngay</button>
                                    </div>
                                </div>
                                <div className="popular-place pp1" style={{ backgroundImage: `url(${places[3]?.thumbnail})` }} >
                                    <div className="pp-text-overlay">
                                        <h1>{places[3]?.name}</h1>
                                        <span>{places[3]?.intro}</span>
                                    </div>
                                    <div className="place__onhover">
                                        <button className="place__onhover__btn" onClick={() => handleClick(places[3].placeid)}>Khám phá ngay</button>
                                    </div>
                                </div>
                            </div> : ""
                        }
                    </Container>
                </div>
            </section >
            <section className="intro">
                <div className="intro__animation">
                    <TravelAnimation></TravelAnimation>
                </div>
                <div className="intro__content">
                    <div className="intro__content--header">
                        <div>
                            Khám phá các địa điểm du lịch
                        </div>
                    </div>
                    <div className="intro__content--detail">
                        <div className="intro__content__p">
                            Chúng tôi đã biên soạn một danh sách các điểm đến hàng đầu, những địa điểm tuyệt đẹp và hấp dẫn nhất để ghé thăm.<br></br>
                            Từ những danh lam thắng cảnh đến những địa điểm ẩm thực, giải trí đầy thu hút, danh sách điểm đến của chúng tôi có điều gì đó dành cho tất cả mọi người.
                        </div>
                    </div>
                </div>
            </section>
            <section className="intro-section intro-three">
                <div className="intro-three-overlay">
                    <Container maxWidth="lg">
                        <div className="intro-three-content">
                            <h1>
                                Những trải nghiệm khó quên
                            </h1>
                            <p className="intro__content__p">
                                Phản hồi của khách hàng của chúng tôi là điều cần thiết trong việc xây dựng danh tiếng tốt và duy trì dịch vụ xuất sắc. Bằng cách lắng nghe nhu cầu của khách hàng, chúng tôi có thể cải thiện các dịch vụ của mình và mang lại trải nghiệm du lịch đặc biệt.
                            </p>
                        </div>
                        <div className="intro-three-slides">
                            {
                                reviews && < Slider {...settings}>
                                    {
                                        reviews.map((review, index) =>
                                            <div key={index}>
                                                <Review review={review}></Review>
                                            </div>
                                        )}
                                </Slider>
                            }
                        </div>
                    </Container>
                </div>
            </section >
        </div >
    );
}

export default Intro;