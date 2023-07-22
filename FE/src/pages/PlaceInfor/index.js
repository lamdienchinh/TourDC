import "./css/PlaceInfor.scss"
import 'react-alice-carousel/lib/alice-carousel.css';
import AliceCarousel from 'react-alice-carousel';
import { useLocation } from 'react-router-dom';
import { Rating, NativeSelect, FormControl, InputLabel, Button } from '@mui/material';
import ReviewChart from "../../components/review_chart";
// import { useState } from "react";
import Review from "../../components/review";
import Container from '@mui/material/Container';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPlace } from "../../service/api";
import { useSelector } from "react-redux";
import { getInfor } from "../../state/selectors";
const PlaceInfor = () => {
    const user = useSelector(getInfor);

    const [place, setPlace] = useState();
    const [average, setAverage] = useState(0);
    const [rates, setRates] = useState([]);
    const [reviewCount, setReviewCount] = useState(0);
    const [items, setItems] = useState([]);
    const handleDragStart = (e) => e.preventDefault();

    // const { place1, average1, rates1, reviewCount1 } = information.state;
    // setAverage(average1);
    // setRates(rates1);
    // setReviewCount(reviewCount1);
    const calculateAverageRate = (list) => {
        if (!Array.isArray(list) || list.length === 0) {
            return 0; // Trả về 0 nếu danh sách trống hoặc không hợp lệ
        }
        // Tính tổng tất cả các giá trị rate
        const totalRate = list.reduce((sum, item) => sum + Number(item.rate), 0);
        // Tính trung bình
        const average = totalRate / list.length;
        // Làm tròn kết quả đến 0.5 gần nhất
        const roundedAverage = Math.round(average * 2) / 2;
        return roundedAverage;
    };
    useEffect(() => {
        const fetchPlaceInfor = async () => {
            const currentUrl = new URL(window.location.href);
            const placeid = currentUrl.searchParams.get('placeid');
            let fetch = await getPlace(placeid);
            const placeinfor = fetch.placeinfor;
            console.log(placeinfor);
            setPlace(placeinfor);
            const reviews = fetch.reviews;
            console.log(reviews)
            const average = calculateAverageRate(reviews);
            console.log(average);
            setAverage(average);
            setRates(reviews);
            setReviewCount(reviews.length)
            setItems([
                <img src={placeinfor?.list_imgs[0]} onDragStart={handleDragStart} role="presentation" alt="temp" />,
                <img src={placeinfor?.list_imgs[1]} onDragStart={handleDragStart} role="presentation" alt="temp" />,
                <img src={placeinfor?.list_imgs[2]} onDragStart={handleDragStart} role="presentation" alt="temp" />,
            ]);
        }
        fetchPlaceInfor()
    }, [window.location.href])
    const navigate = useNavigate();

    const handleClicks = async (newplace) => {
        console.log("NEW", newplace);
        navigate(`/placeinfor?placeid=${newplace.placeid}`)
        // let referP = await axios.post(`${process.env.REACT_APP_ENDPOINT}/v1/place/get`, { name: newplace?.name });
        // newplace?.referPlaces = referP.data.referPlaces;
        // console.log("R", referP.data)
        // navigate('.', { replace: true, state: { newplace, average, rates, reviewCount } });
        // setAverage(average);
        // setRates(rates);
        // setReviewCount(reviewCount);
        // setItems([
        //     <img src={newplace?.list_imgs[0]} onDragStart={handleDragStart} role="presentation" alt="temp" />,
        //     <img src={newplace?.list_imgs[1]} onDragStart={handleDragStart} role="presentation" alt="temp" />,
        //     <img src={newplace?.list_imgs[2]} onDragStart={handleDragStart} role="presentation" alt="temp" />,
        // ]);
        // setPlace(newplace);
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
                            <img src={place?.referPlaces[0].thumbnail} alt="Ảnh đề xuất" onClick={() => handleClicks(place?.referPlaces[0])}></img>
                        </div>
                        <div className="placeinfor__suggest--infor">
                            <div className="placeinfor__suggest--row1">
                                ĐI ĐẾN ĐỊA ĐIỂM
                            </div>
                            <div className="placeinfor__suggest--row2">
                                {place?.referPlaces[0].name}
                            </div>
                        </div>
                    </div>
                    <div className="placeinfor__suggest--2">
                        <div>
                            <img src={place?.referPlaces[1]?.thumbnail} alt="Ảnh đề xuất" onClick={() => handleClicks(place?.referPlaces[1])}></img>
                        </div>
                        <div className="placeinfor__suggest--infor">
                            <div>
                                ĐI ĐẾN ĐỊA ĐIỂM
                            </div>
                            <div >
                                {place?.referPlaces[1].name}
                            </div>
                        </div>
                    </div>
                    <div className="placeinfor__suggest--3">
                        <div>
                            <img src={place?.referPlaces[2]?.thumbnail} alt="Ảnh đề xuất" onClick={() => handleClicks(place?.referPlaces[2])}></img>
                        </div>
                        <div className="placeinfor__suggest--infor">
                            <div>
                                ĐI ĐẾN ĐỊA ĐIỂM
                            </div>
                            <div >
                                {place?.referPlaces[2].name}
                            </div>
                        </div>
                    </div>
                    <div className="placeinfor__suggest--4">
                        <div>
                            <img src={place?.referPlaces[3]?.thumbnail} alt="Ảnh đề xuất" onClick={() => handleClicks(place?.referPlaces[3])}></img>
                        </div>
                        <div className="placeinfor__suggest--infor">
                            <div>
                                ĐI ĐẾN ĐỊA ĐIỂM
                            </div>
                            <div >
                                {place?.referPlaces[3].name}
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
                        {/* <div>
                            <div className="placeinfor__rate--title">
                                Đánh giá
                            </div>
                            <div className="placeinfor__rate--star">
                                <Rating name="size-large" defaultValue={average} precision={0.5} size="large" readOnly />
                            </div>
                            <div className="placeinfor__rate--address">
                                Địa chỉ: {place?.address}
                            </div>
                        </div> */}
                        <div className="placeinfor__rate--content">
                            <div style={{ fontSize: '40px', fontWeight: '500' }}>
                                {place?.intro}
                            </div>
                            <div>
                                {place?.description}
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
                            {rates && rates.map(review => (
                                <Review review={review}></Review>
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default PlaceInfor;