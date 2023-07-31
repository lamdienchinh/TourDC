import "./css/PlaceInfor.scss"
import 'react-alice-carousel/lib/alice-carousel.css';
import AliceCarousel from 'react-alice-carousel';
import { NativeSelect, FormControl, InputLabel, Button } from '@mui/material';
import ReviewChart from "../../components/review_chart";
// import { useState } from "react";
import Review from "../../components/review";
import Container from '@mui/material/Container';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPlace } from "../../service/api";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
const PlaceInfor = () => {
    const [open, setOpen] = useState(true);
    const handleClose = () => {
        setOpen(false);
    };
    const [selectedFilter, setSelectedFilter] = useState(1)
    const [place, setPlace] = useState();
    const [average, setAverage] = useState(0);
    const [rates, setRates] = useState([]);
    const [reviewCount, setReviewCount] = useState(0);
    const [items, setItems] = useState([]);
    const handleDragStart = (e) => e.preventDefault();
    const [filteredReviews, setFilteredReviews] = useState([]);

    const handleChangeFilter = (event) => {
        let filter = event.target.value;
        let newrates = filterReviews(rates, filter)
        setSelectedFilter(event.target.value)
        setRates(newrates)
    };
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
            const filteredReviews = filterReviews(reviews, "1");
            setFilteredReviews(filteredReviews);
            setOpen(false)
        }
        fetchPlaceInfor()
    }, [window.location.href]) // eslint-disable-line react-hooks/exhaustive-deps
    const navigate = useNavigate();

    const handleClicks = async (newplace) => {
        console.log("NEW", newplace);
        navigate(`/placeinfor?placeid=${newplace.placeid}`)
        window.location.reload();
    };
    const filterReviews = (reviews, filterValue) => {
        console.log("Reviews", reviews)
        switch (filterValue) {
            case "1":
                // Số sao tăng dần
                return reviews.sort((a, b) => Number(a.rate) - Number(b.rate));
            case "2":
                // Số sao giảm dần
                return reviews.sort((a, b) => Number(b.rate) - Number(a.rate));
            default:
                return reviews;
        }
    };

    // Hàm callback để xử lý khi điều kiện trong component con Review thỏa mãn
    const handleReviewConditionMet = async () => {
        // Thực hiện các hành động cần thiết khi điều kiện trong Review thỏa mãn
        const currentUrl = new URL(window.location.href);
        const placeid = currentUrl.searchParams.get('placeid');
        let fetch = await getPlace(placeid);
        const reviews = fetch.reviews;
        setRates(reviews);
        const filteredReviews = filterReviews(reviews, selectedFilter);
        setFilteredReviews(filteredReviews);
    };
    return (
        <div className="placeinfor">
            <Backdrop
                sx={{ color: '#fffff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            {
                open === false ?
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
                    : ""
            }
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
                        <div>
                            <div className="placeinfor__rate--address">
                                Địa chỉ: {place?.address}
                            </div>
                        </div>
                        <div className="placeinfor__rate--content">
                            <div style={{ fontSize: '40px', fontWeight: '500' }}>
                                {place?.intro}
                            </div>
                            <div>
                                {place?.description}
                            </div>
                        </div>
                        <div className="place__map">

                        </div>
                    </div>
                </div>
                <div className="placeinfor__review">
                    <div className="placeinfor__rv--1">
                        Đánh giá của người dùng({reviewCount})
                    </div>
                    <div className="placeinfor__rv--2">
                        Tóm tắt
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
                                value={selectedFilter}
                                onChange={handleChangeFilter}
                                inputProps={{
                                    name: 'filter',
                                    id: 'uncontrolled-native',
                                }}
                            >
                                <option value="1">Số sao tăng dần</option>
                                <option value="2">Số sao giảm dần</option>
                            </NativeSelect>
                        </FormControl>
                    </div>
                    <div className="placeinfor__reviewlist">
                        <div className="placeinfor__review">
                            {filteredReviews.map((review, index) => (
                                <Review key={index} review={review} place={rates} onReviewConditionMet={handleReviewConditionMet}></Review>
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default PlaceInfor;