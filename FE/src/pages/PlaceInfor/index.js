import img from "../../assets/imgs/angiang.webp"
import "./css/PlaceInfor.scss"
import 'react-alice-carousel/lib/alice-carousel.css';
import AliceCarousel from 'react-alice-carousel';
import { useLocation, useNavigate } from 'react-router-dom';
import { Rating, NativeSelect, FormControl, InputLabel } from '@mui/material';
import ReviewChart from "../../components/review_chart";
// import { useState } from "react";
import Review from "../../components/review";
import Container from '@mui/material/Container';

const PlaceInfor = () => {

    const { placeinformation } = useLocation();
    console.log(placeinformation);
    const navigate = useNavigate();
    // Xử lý Slideshow
    const handleDragStart = (e) => e.preventDefault();

    const items = [
        <img src={img} onDragStart={handleDragStart} role="presentation" alt="temp" />,
        <img src={img} onDragStart={handleDragStart} role="presentation" alt="temp" />,
        <img src={img} onDragStart={handleDragStart} role="presentation" alt="temp" />,
    ];

    const handleClick = () => {
        navigate('/placeinfor');
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
                <img src={img} alt="Ảnh nền"></img>
                <div className="placeinfor__content">
                    <div className="placeinfor__title">
                        Rừng Tràm Trà Sư
                    </div>
                </div>
                <div className="placeinfor__suggest">
                    <div className="placeinfor__suggest--1">
                        <div>
                            <img src={img} alt="Ảnh đề xuất" onClick={handleClick}></img>
                        </div>
                        <div className="placeinfor__suggest--infor">
                            <div>
                                ĐI ĐẾN ĐỊA ĐIỂM
                            </div>
                            <div>
                                Chùa Hang
                            </div>
                        </div>
                    </div>
                    <div className="placeinfor__suggest--2">
                        <div>
                            <img src={img} alt="Ảnh đề xuất" onClick={handleClick}></img>
                        </div>
                        <div className="placeinfor__suggest--infor">
                            <div>
                                ĐI ĐẾN ĐỊA ĐIỂM
                            </div>
                            <div>
                                Chùa Hang
                            </div>
                        </div>
                    </div>
                    <div className="placeinfor__suggest--3">
                        <div>
                            <img src={img} alt="Ảnh đề xuất" onClick={handleClick}></img>
                        </div>
                        <div className="placeinfor__suggest--infor">
                            <div>
                                ĐI ĐẾN ĐỊA ĐIỂM
                            </div>
                            <div>
                                Chùa Hang
                            </div>
                        </div>
                    </div>
                    <div className="placeinfor__suggest--4">
                        <div>
                            <img src={img} alt="Ảnh đề xuất" onClick={handleClick}></img>
                        </div>
                        <div className="placeinfor__suggest--infor">
                            <div>
                                ĐI ĐẾN ĐỊA ĐIỂM
                            </div>
                            <div>
                                Chùa Hang
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Container maxWidth="lg">
                <div className="placeinfor__intro">
                    <div className="placeinfor__imgs">
                        <AliceCarousel mouseTracking autoWidth={true} autoHeight={true} animationDuration={1000} items={items} autoPlayInterval={1000} autoPlay={true} infinite={true} />
                    </div>
                    <div className="placeinfor__rate">
                        <div>
                            <div className="placeinfor__rate--title">
                                Đánh giá
                            </div>
                            <div className="placeinfor__rate--star">
                                <Rating name="size-large" defaultValue={4.5} precision={0.5} size="large" readOnly />
                            </div>
                            <div className="placeinfor__rate--address">
                                Địa chỉ: Ấp Văn Trà, Tịnh Biên, An Giang 884000
                            </div>
                        </div>
                        <div className="placeinfor__rate--content">
                            <div style={{ fontSize: '40px', fontWeight: '500' }}>
                                NHỮNG ĐIỀU VỀ RỪNG TRÀM TRÀ SƯ
                            </div>
                            <div>
                                Địa chỉ rừng tràm Trà Sư ở đâu? <br></br>
                                Rừng tràm Trà Sư là một địa điểm du lịch đẹp ở miền Tây rất nổi tiếng thuộc tỉnh An Giang, cách trung tâm TP.Châu Đốc ước chừng khoảng 30km.<br></br>
                                Với một khoảng cách khá gần như thế, du khách có thể dễ dàng lựa chọn phương tiện di chuyển đến rừng tràm Trà Sư.<br></br>
                                Trong số các phương tiện đường bộ hiện nay thì khách du lịch thích chọn đi bằng xe máy để trải nghiệm trọn vẹn một chuyến phượt rừng tràm Trà Sư.
                            </div>
                        </div>
                    </div>
                </div>
                <div className="placeinfor__review">
                    <div className="placeinfor__rv--1">
                        Ratings & Reviews ({273})
                    </div>
                    <div className="placeinfor__rv--2">
                        Summary
                    </div>
                    <div className="placeinfor__chart">
                        <ReviewChart />
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