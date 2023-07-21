import img from "../../assets/imgs/angiang.webp"
import "./css/PlaceInfor.scss"
import 'react-alice-carousel/lib/alice-carousel.css';
import AliceCarousel from 'react-alice-carousel';
import { useLocation, useNavigate } from 'react-router-dom';
import { Rating, NativeSelect, FormControl, InputLabel, Button } from '@mui/material';
import ReviewChart from "../../components/review_chart";
// import { useState } from "react";
import Review from "../../components/review";
import Container from '@mui/material/Container';
import { getDestinationRates } from "../../components/dapp/getDestinationRates";
import { useEffect, useState } from "react";

const PlaceInfor = () => {

    const information = useLocation();
    const { place1, average1, rates1, reviewCount1 } = information.state;
    const [place, setPlace] = useState(place1);
    const [average, setAverage] = useState(average1);
    const [rates, setRates] = useState(rates1);
    const [reviewCount, setReviewCount] = useState(reviewCount1);
    // const [placeinformation, setPlaceInformation] = useState(information.state);
    console.log("rates:", rates1);
    console.log("review:", reviewCount1);
    console.log("place:", place1);
    const navigate = useNavigate();
    // Xử lý Slideshow
    const handleDragStart = (e) => e.preventDefault();
    const items = [
        <img src={place?.list_imgs[0]} onDragStart={handleDragStart} role="presentation" alt="temp" />,
        <img src={place?.list_imgs[1]} onDragStart={handleDragStart} role="presentation" alt="temp" />,
        <img src={place?.list_imgs[2]} onDragStart={handleDragStart} role="presentation" alt="temp" />,
    ];

    const handleClick = (place) => {
        // navigate('/placeinfor', {state: { place, average, rates, reviewCount}} );
        // setAverage(average);
        // setRates(rates);
        // setReviewCount(reviewCount);
        setPlace(place)
    };
    //Xử lý filter
    // const [selectedValue, setSelectedValue] = useState('');
    // console.log(selectedValue)
    // const handleChange = (event) => {
    //     setSelectedValue(event.target.value);
    // };
    return (
        <div className="placeinfor">
            <div className="placeinfor__slide">
                <img src={place?.thumbnail} alt="Ảnh nền"></img>
                <div className="placeinfor__content">
                    <div className="placeinfor__title">
                        {place?.name}
                    </div>
                </div>
                <div className="placeinfor__suggest">
                    <div className="placeinfor__suggest--1">
                        <div>
                            <img src={img} alt="Ảnh đề xuất" onClick={handleClick(place.referPlaces[0])}></img>
                        </div>
                        <div className="placeinfor__suggest--infor">
                            <div>
                                ĐI ĐẾN ĐỊA ĐIỂM
                            </div>
                            <div >
                                {place.referPlaces[0].name}
                            </div>
                        </div>
                    </div>
                    <div className="placeinfor__suggest--2">
                        <div>
                            <img src={img} alt="Ảnh đề xuất" onClick={handleClick()}></img>
                        </div>
                        <div className="placeinfor__suggest--infor">
                            <div>
                                ĐI ĐẾN ĐỊA ĐIỂM
                            </div>
                            <div >
                            {place.referPlaces[1].name}
                            </div>
                        </div>
                    </div>
                    <div className="placeinfor__suggest--3">
                        <div>
                            <img src={img} alt="Ảnh đề xuất" onClick={handleClick()}></img>
                        </div>
                        <div className="placeinfor__suggest--infor">
                            <div>
                                ĐI ĐẾN ĐỊA ĐIỂM
                            </div>
                            <div >
                            {place.referPlaces[2].name}
                            </div>
                        </div>
                    </div>
                    <div className="placeinfor__suggest--4">
                        <div>
                            <img src={img} alt="Ảnh đề xuất" onClick={handleClick()}></img>
                        </div>
                        <div className="placeinfor__suggest--infor">
                            <div>
                                ĐI ĐẾN ĐỊA ĐIỂM
                            </div>
                            <div >
                            {place.referPlaces[3].name}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Container maxWidth="lg">
                <div className="placeinfor__intro">
                    <div className="placeinfor__imgs">
                        <AliceCarousel
                            mouseTracking
                            disableDotsControls
                            // disableButtonsControls  // ---> also remove this
                            // activeIndex={activeIndex}  // ---> no need to this anymore
                            items={items}
                            controlsStrategy="responsive"
                            autoPlay={true}
                            autoPlayInterval={5000}
                            infinite={true}
                            keyboardNavigation={true}
                            renderPrevButton={() => {
                                return <Button className="place-pre-btn">Trước</Button>
                            }}
                            renderNextButton={() => {
                                return <Button className="place-next-btn">Sau</Button>
                            }} />
                    </div>
                    <div className="placeinfor__rate">
                        <div>
                            <div className="placeinfor__rate--title">
                                Đánh giá
                            </div>
                            <div className="placeinfor__rate--star">
                                <Rating name="size-large" defaultValue={average} precision={0.5} size="large" readOnly />
                            </div>
                            <div className="placeinfor__rate--address">
                                Địa chỉ: {place.address}
                            </div>
                        </div>
                        <div className="placeinfor__rate--content">
                            <div style={{ fontSize: '40px', fontWeight: '500' }}>
                                {place.intro}
                            </div>
                            <div>
                                {/* Địa chỉ rừng tràm Trà Sư ở đâu? <br></br>
                                Rừng tràm Trà Sư là một địa điểm du lịch đẹp ở miền Tây rất nổi tiếng thuộc tỉnh An Giang, cách trung tâm TP.Châu Đốc ước chừng khoảng 30km.<br></br>
                                Với một khoảng cách khá gần như thế, du khách có thể dễ dàng lựa chọn phương tiện di chuyển đến rừng tràm Trà Sư.<br></br>
                                Trong số các phương tiện đường bộ hiện nay thì khách du lịch thích chọn đi bằng xe máy để trải nghiệm trọn vẹn một chuyến phượt rừng tràm Trà Sư. */}
                                {place.description}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="placeinfor__review">
                    <div className="placeinfor__rv--1">
                        Ratings & Reviews ({reviewCount})
                    </div>
                    <div className="placeinfor__rv--2">
                        Summary
                    </div>
                    <div className="placeinfor__chart">
                        <ReviewChart reviews={rates} average={average} />
                    </div>
                    <div className="placeinfor__filter">
                        <FormControl fullWidth>
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                Sắp xếp theo
                            </InputLabel>
                            <NativeSelect
                                defaultValue={30}
                                inputProps={{
                                    name: 'age',
                                    id: 'uncontrolled-native',
                                }}
                            >
                                <option value={1}>Số sao tăng dần</option>
                                <option value={2}>Số sao giảm dần</option>
                                <option value={3}>Thời gian gần nhất</option>
                                <option value={4}>Thời gian xa nhất</option>
                            </NativeSelect>
                        </FormControl>
                    </div>
                    <div className="placeinfor__reviewlist">
                        <div className="placeinfor__review">
                            <Review></Review>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default PlaceInfor;