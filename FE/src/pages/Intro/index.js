import "./css/Intro.scss";
import plane from "../../assets/imgs/plane.png"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import avt from "../../assets/imgs/avatar.png"
// import place1 from "../../assets/imgs/place1.png"
// import place2 from "../../assets/imgs/place2.jpg"
import Slider from 'react-slick';
import { Avatar } from "@mui/material";
import Container from "@mui/material/Container";
const Review = () => {
    return (
        <div className="review-wrapper">
            <div className="review-content">Đây là chuyến đi vô cùng thú vị ở An Giang, nếu có cơ hội tôi sẽ đến đây một lần nữa</div>
            <div className="review-avatar">
                <Avatar sx={{ width: 56, height: 56 }} src={avt}></Avatar>
            </div>
            <div className="review-name">Lâm Điền Chinh</div>
            <div className="review-place">Rừng Tràm Trà Sư</div>
            <div className="review-time">12:00 28/4/2023</div>
        </div >
    );
}
const Intro = () => {
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
    return (
        <div className="intro-wrapper" >
            <section className="intro-first">
                <div className="bg-img">
                    <Container maxWidth="lg">
                        <div className="intro-content">
                            <div className="intro-plane"><img src={plane} alt="Máy bay"></img></div>
                            <h1 className="intro-name">TOURDC</h1>
                            <h6>Ứng dụng du lịch áp dụng công nghệ Blockchain</h6>
                            <button className="intro-tohome" onClick={() => window.location.replace('/home')}>Khám phá ngay</button>
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
                                <div className="intro-description-2">Years of experiences</div>
                            </div>
                            <div>
                                <div className="intro-description-1 intro-des">2K+</div>
                                <div className="intro-description-2">Best Destinations</div>
                            </div>
                            <div>
                                <div className="intro-description-1 intro-des">10K+</div>
                                <div className="intro-description-2">Happy Customers</div>
                            </div>
                            <div>
                                <div className="intro-description-1 intro-des">4.7</div>
                                <div className="intro-description-2">Overall Rating</div>
                            </div>
                        </div>
                    </Container>
                </div>
            </section >
            <section className="intro-two">
                <div className="intro-two-overlay">
                    <Container maxWidth="lg">
                        <div className="intro-two__title">
                            <h1>Những điểm đến phổ biến</h1>
                            <h4>Đây là những địa điểm được nhiều người yêu thích nhất trong tháng này</h4>
                        </div>
                        <div className="intro-two-places">
                            <div className="popular-place pp1">
                                <div className="pp-text-overlay">
                                    <h1>Địa điểm 1</h1>
                                    <span>Mô tả về địa điểm</span>
                                </div>
                            </div>
                            <div className="popular-place pp2">
                                <div className="pp-text-overlay">
                                    <h1>Địa điểm 2</h1>
                                    <span>Mô tả về địa điểm</span>
                                </div>
                            </div >
                            <div className="popular-place pp3">
                                <div className="pp-text-overlay">
                                    <h1>Địa điểm 3</h1>
                                    <span>Mô tả về địa điểm</span>
                                </div>
                            </div>
                            <div className="popular-place pp4">
                                <div className="pp-text-overlay">
                                    <h1>Địa điểm 4</h1>
                                    <span>Mô tả về địa điểm</span>
                                </div>
                            </div >
                        </div>
                    </Container>
                </div>
            </section >
            <section className="intro-three">
                <div className="intro-three-overlay">
                    <Container maxWidth="lg">
                        <div className="intro-three-content">
                            <h1>
                                Những trải nghiệm khó quên
                            </h1>
                            <p>
                                Phản hồi của khách hàng của chúng tôi là điều cần thiết trong việc xây dựng danh tiếng tốt và duy trì dịch vụ xuất sắc. Bằng cách lắng nghe nhu cầu của khách hàng, chúng tôi có thể cải thiện các dịch vụ của mình và mang lại trải nghiệm du lịch đặc biệt.
                            </p>
                        </div>
                        <div className="intro-three-slides">
                            <Slider {...settings}>
                                <div>
                                    <Review></Review>
                                </div>
                                <div>
                                    <Review></Review>
                                </div>
                                <div>
                                    <Review></Review>
                                </div>
                                <div>
                                    <Review></Review>
                                </div>
                            </Slider>
                        </div>
                    </Container>
                </div>
            </section>
        </div >
    );
}

export default Intro;